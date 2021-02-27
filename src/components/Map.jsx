import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../style/Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { destinationCityFormat, originCityFormat } from '../data/cityGeoJsonFormat.js';
import { greatCircle, point } from '@turf/turf';
import { accessToken } from '../data/config.js';
import { cityCodes } from '../data/cityCodes.js';


/**
 * This is the Map component.
 */

// ? Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
// ? Map@http://localhost:3000/static/js/main.chunk.js:1259:5

mapboxgl.accessToken = accessToken

class Map extends React.Component {
  _isMounted = false;

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

    // Initial end point and will rotate through other destination points when clicked (for Map Lines)
    this.end = point(this.state.pointDestination)
    this.destinationGeojson = destinationCityFormat
    this.originGeojson = originCityFormat

    // Start City List for FormBox Menu
    this.demoCityList = [];
   
    // Initial positions for drawing line (all at [0,0])
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
    this.cityCoordinates = null;
  }
  
  // Removes the layers and source coordinates for lines
  removeStartLines = () => {
    this.map.removeLayer('flight_lines');
    this.map.removeSource('flight_lines');
    this.hasLines = false;
  }

  // Removes the layers and source coordinates for all markers on map
  removeMarkers = () => {
    this.markerArray.forEach((marker) => {
      marker.remove();
    })
    this.map.removeSource('startLocations');
    this.map.removeSource('destinations');
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
    // Add line layer to map
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
    this.originGeojson.features[0].geometry.coordinates = this.state.points1
    this.originGeojson.features[0].properties.city = this.props.inputValue1
    this.originGeojson.features[1].geometry.coordinates = this.state.points2
    this.originGeojson.features[1].properties.city = this.props.inputValue2
    // Add coordinates to map
    this.map.addSource('startLocations', {
      type: 'geojson',
      data: this.originGeojson
    });
    //Add markers on map and store in markerArray for deletion
    this.originGeojson.features.forEach(marker => {
      // Create a div element for the marker.
      var el = document.createElement('div');
      el.className = 'marker';
      // el.addEventListener('click', e => 
      // { 
      //   // Reload the newly clicked destination to show flight lines
      //   this.props.handleShow()
      // });
      var popup = new mapboxgl.Popup({ offset: 25, className: 'scroll' }).setHTML(
        `<div className="scroll">
            <p>
              ${marker.properties.city}
            </p>
        </div>`
      );
      this.startMarker = new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .setPopup(popup)
        .addTo(this.map);
      this.markerArray.push(this.startMarker);
    });
  }

  // Adds the markers for destinations
  addDestinationMarkers = () => {
    this.destinationGeojson.features[0].geometry.coordinates = this.state.pointDestination
    this.destinationGeojson.features[0].properties.city = this.props.destinationCity
    // update line coordinates
    this.end = this.state.pointDestination
    this.map.addSource('destinations', {
      type: 'geojson',
      data: this.destinationGeojson
    });
    // Destination marker load
    this.destinationGeojson.features.forEach(marker => {
      var ed = document.createElement('div');
      ed.id = "marker-" + marker.properties.id;
      ed.className = 'destination_marker';
      ed.addEventListener('click', e => 
      { 
        // Reload the newly clicked destination to show flight lines
        this.end = marker.geometry.coordinates;
        this.removeStartLines();
        this.drawLines();
        this.props.handleShow();
      });
      // var popup = new mapboxgl.Popup({ offset: 25, className: 'scroll', closeOnClick: 'false' }).setHTML(
      //   `<div className="scroll">
      //       <p>
      //         From ${this.props.inputValue1} & ${this.props.inputValue2} <br />To ${marker.properties.city}
      //         ${this.showListOfDates()}
      //       </p>
      //   </div>`
      // )
      this.destinationMarker = new mapboxgl.Marker(ed, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        // .setPopup(popup)
        .addTo(this.map);
      this.markerArray.push(this.destinationMarker);
    });
  }
  // Get full list of viable city names
  getCityNames = () => {
    // const numberCities = cityCodes.features.length;
    const newCityList = cityCodes.features;
    newCityList.forEach(newCity => {
      if (!(this.demoCityList).find(elem => elem.text === newCity.properties.city_user )) {
        this.demoCityList.push({
          "text": newCity.properties.city_user , 
          "key": newCity.properties.city_user , 
          "value": newCity.properties.city_user 
        });
      }
    })
    this.props.updateCityList(this.demoCityList);
  };

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
      console.log("cityCoords", cityName, coords);
    } catch (error) {
      console.log("cityCoods: does not exist")
    }
    return coords
  }

  // Mounting map 
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
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
    }
  }

  // checking if map will unmount
  componentWillUnmount() {
    this._isMounted = false;
  }

  // Update Coordinates from FormBox onto Map
  componentDidUpdate(prevProps, prevState) {
    // Check to see if there was an update for the city name to get coordinates
    if (this.props.inputValue1 !== prevProps.inputValue1){
      
      let coords = this.getCityCoordinates(this.props.inputValue1);
      coords != null && this.setState({points1: coords}, () => 
        console.log("points1", coords));
    }
    if (this.props.inputValue2 !== prevProps.inputValue2){
      
      let coords = this.getCityCoordinates(this.props.inputValue2);
      coords != null && this.setState({points2: coords}, () => 
        console.log("points2", coords));
    }
    if (this.props.destinationCity !== prevProps.destinationCity){
      let coords = this.getCityCoordinates(this.props.destinationCity);
      coords != null && this.setState({pointDestination: coords}, () => 
        console.log("pointDestination", coords));
    }
    // Check to see if there was an update and that both start locations have been selected
    if (((prevState.points1 !== this.state.points1) || 
         (prevState.points2 !== this.state.points2) || 
         (prevState.pointDestination !== this.state.pointDestination) || 
         (prevProps.listOfDates !== this.props.listOfDates)) 
         &&
          (
          (this.state.points1[0] !== 0) && 
          (this.state.points1[1] !== 0) && 
          (this.state.points2[0] !== 0) && 
          (this.state.points2[1] !== 0) &&
          (this.state.pointDestination[0] !== 0) && 
          (this.state.pointDestination[1] !== 0)
          )){
              console.log("Locations selected: ", this.state.points1, this.state.points2, this.state.pointDestination);
              // Checks if map has lines 
              if (this.hasLines) {
                this.removeStartLines();
              }
              // Checks if map has markers 
              if (this.hasMarkers) {
                this.removeMarkers();
              }
              // this.showListOfDates();
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
