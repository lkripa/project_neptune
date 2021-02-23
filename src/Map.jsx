import React from 'react';
import mapboxgl from 'mapbox-gl';
import './style/Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { startLocations } from './startLocations.js';
import { destinations } from './data/destination.js';
import { greatCircle, point } from '@turf/turf';
import { cityCodes } from './data/cityCodes.js';
import { accessToken } from './data/config.js';

/**
 * This is the Map component.
 */
// ! Connect Destination changes to screen

mapboxgl.accessToken = accessToken

class Map extends React.Component {
  constructor(props) {
    super(props);
    // Props for map mount location
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.58,
      points1: [0,0],
      points2: [0,0],
      pointDestination: [0,0],
    };

    this.myRef = React.createRef();
    // Initial end point and will rotate through other destination points when clicked
    this.end = point([9.283447, 40.078072]); // Sardinia

    // Start City List for FormBox Menu
    this.demoCityList = [];
   
    // Initial positions for drawing line
    this.greatCircle1 = greatCircle(point(this.state.points1), this.end, {'name': 'Person1 Line'});
    this.greatCircle2 = greatCircle(point(this.state.points2), this.end, {'name': 'Person2 Line'});
    
    // Checks for lines and markers on the map
    this.hasLines = false;
    this.hasMarkers = false;
    
    // Store marker locations
    this.markerArray = [];
    
    // Map Initial Variables
    this.map = null;
    this.startMarker = null;
    this.start = null;

    this.cityCoordinates = null;
  }
  
  // Removes the layers and source coordinates for lines
  removeStartLines = () => {
    this.map.removeLayer('flight_lines');
    this.map.removeSource('flight_lines');
    this.hasLines = false;
  }

  // Removes the layers and source coordinates for markers
  removeStartMarkers = () => {
    this.markerArray.forEach((marker) => {
      marker.remove();
    })
    this.map.removeSource('startLocations');
    this.hasMarkers = false;
  }

  // Draws the lines from start location to destination
  drawLines = () => {
    this.hasLines = true;
    // Point coordinates from FormBox
    this.greatCircle1 = greatCircle(point(this.state.points1), this.end, {'name': 'Person1 Line'});
    this.greatCircle2 = greatCircle(point(this.state.points2), this.end, {'name': 'Person2 Line'});
    // Add coordinates to map
    this.map.addSource('flight_lines', {
      'type': 'geojson',
      'data': 
      {
        'type': 'FeatureCollection',
        'features': [ this.greatCircle1, this.greatCircle2 ]
      }
    });
    // Add layer to map
    this.map.addLayer({
      'id': 'flight_lines',
      'type': 'line',
      'source': 'flight_lines',
      'paint': {
        'line-width': 1.5,
        'line-color': '#282c34',
        'line-dasharray': [1, 1]
      }
    });
  }

  // Adds the markers for start location
  addStartMarkers = () => {
    this.hasMarkers = true
    // Point coordinates from FormBox
    this.start = { 
      // Person 1
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": this.state.points1
          },
          "properties": {
            "city": "",
            "country": "",
          }
        },
        { 
          // Person 2
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": this.state.points2
          },
          "properties": {
            "city": "",
            "country": "",
          }
        }
      ]
    };
    // Add coordinates to map
    this.map.addSource('startLocations', {
      type: 'geojson',
      data: this.start
    });

    //Add markers on map and store for deletion
    this.start.features.forEach(marker => {
      // Create a div element for the marker.
      var el = document.createElement('div');
      el.className = 'marker';
 
      this.startMarker = new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
      this.markerArray.push(this.startMarker);
    });
  }

  // Adds the markers for destinations
  addDestinationMarkers = () => {
    // Destination marker load
    destinations.features.forEach(marker => {
      var ed = document.createElement('div');
      ed.id = "marker-" + marker.properties.id;
      ed.className = 'destination_marker';
      ed.addEventListener('click', e => 
      { 
        // Reload the newly clicked destination to show flight lines
        this.end = marker.geometry.coordinates;
        // this.setPopupmap.removeSource('flight_lines')
        this.removeStartLines();
        this.drawLines();
      });
      // var popup = new mapboxgl.Popup({ offset: 25 }).setText(
      //   'Flight Information Goes Here'
      // );
       new mapboxgl.Marker(ed, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        // .setPopup(popup)
        .addTo(this.map);
    });
  }

  // Mounting map 
  componentDidMount() {
    // create list of city names
    this.getCityNames();
    this.map = new mapboxgl.Map({
      container: this.myRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      minZoom: 1.40
    });

    // Set loading map view
    this.map.on('move', () => {
      this.setState({
      lng: this.map.getCenter().lng.toFixed(4),
      lat: this.map.getCenter().lat.toFixed(4),
      zoom: this.map.getZoom().toFixed(2)
      });
    });
    // Add destination coordinates on map
    this.map.on('load', ()=> {
      this.map.addSource('destinations', {
        type: 'geojson',
        data: destinations
      });
    })
  }

  // Get city coodinates from geojson file
  getCityCoordinates = (cityName) => {
    cityCodes.getFeaturesByProperty = function(key, value) {
      return this.features.filter(function(feature){
        if (feature.properties[key] === value) {
          return true;
        } else {
          return false;
        }
      });
    };
    
    try {
      var feats = cityCodes.getFeaturesByProperty('city_user', cityName);
      var coords = feats[0].geometry.coordinates;
      // this.props.updateCityCoords(coords);
      // this.cityCoordinates = coords;
      console.log("cityCoords", cityName, coords);
    } catch (error) {
      console.log("cityCoods: does not exist")
    }
    return coords
  }

  getCityNames = () => {
    var numberCities = cityCodes.features.length;
    for (var i = 0; i < numberCities; i++) {
      var newCity = cityCodes.features[i].properties['city_user'];
      if (!this.demoCityList.includes(newCity)) {
        this.demoCityList.push(newCity);
      }
    }
    this.props.updateCityList(this.demoCityList);
  };

  // Update Coordinates from FormBox
  componentDidUpdate(prevProps, prevState) {
    // let didChange = false;
    // Check to see if there was an update for the city name to get coordinates
    if (this.props.inputValue1 !== prevProps.inputValue1){
      // didChange = true;
      let coords = this.getCityCoordinates(this.props.inputValue1);
      coords != null && this.setState({points1: coords}, () => 
        console.log("points1", coords));
    }
    if (this.props.inputValue2 !== prevProps.inputValue2){
      // didChange = true;
      let coords = this.getCityCoordinates(this.props.inputValue2);
      coords != null && this.setState({points2: coords}, () => 
        console.log("points2", coords));
    }
    if (this.props.destinationCity !== prevProps.destinationCity){
      // didChange = true;
      let coords = this.getCityCoordinates(this.props.destinationCity);
      coords != null && this.setState({pointDestination: coords}, () => 
        console.log("pointDestination", coords));
    }
    // Check to see if there was an update and that both start locations have been selected
    if (((prevState.points1 !== this.state.points1) || (prevState.points2 !== this.state.points2)) && (
      (this.state.points1[0] !== 0) && 
      (this.state.points1[1] !== 0) && 
      (this.state.points2[0] !== 0) && 
      (this.state.points2[1] !== 0))) {
        console.log("Both locations selected: ", this.state.points1, this.state.points2);
        
        // Checks if map has lines 
        if (this.hasLines) {
          this.removeStartLines();
        }
        // Checks if map has markers 
        if (this.hasMarkers) {
          this.removeStartMarkers();
        }
        // Add new markers and lines to map
        this.addStartMarkers();
        this.addDestinationMarkers();
        this.drawLines();
        }
  }

  render() {
    return (
      <div>
        <div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div ref={this.myRef} 
        className='mapContainer' />
      </div>
    )
  }
}
 
export default Map;
