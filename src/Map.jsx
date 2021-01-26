import React from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { startLocations } from './startLocations.js';
import { destinations } from './destination.js';
import { greatCircle, point } from '@turf/turf';

/**
 * This is the map component.
 */

mapboxgl.accessToken = 'pk.eyJ1IjoibGtyaXBhIiwiYSI6ImNrazVpZHQ5OTBxa3kyd3FuMnoyYmVlZHAifQ.wxeraMVYC8zmS4rXERn4ng';
// TODO:  set max zoom out

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.58,
    };

    this.myRef = React.createRef();
    this.map = null;
    this.end = point([9.283447, 40.078072]); // Sardinia
    this.greatCircle1 = greatCircle(point(this.props.points1), this.end, {'name': 'Madrid to Sardinia'});
    this.greatCircle2 = greatCircle(point(this.props.points2), this.end, {'name': 'Zurich to Sardinia'});
    this.isLines = false;
    this.start = { 
      // MADRID
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": this.props.points1
          },
          "properties": {
            "city": "Madrid",
            "country": "Spain",
          }
        },
        { 
          // ZURICH
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": this.props.points2
          },
          "properties": {
            "city": "Zurich",
            "country": "Switzerland",
          }
        }
      ]
    };
  }
  

  removeStart = () => {
    this.map.removeLayer('flight_lines');
    this.map.removeSource('flight_lines');
    
    // this.map.removeSource('startLocations');
  }

  drawLines = () => {
    this.isLines = true;
    this.greatCircle1 = greatCircle(point(this.props.points1), this.end, {'name': 'Madrid to Sardinia'});
    this.greatCircle2 = greatCircle(point(this.props.points2), this.end, {'name': 'Zurich to Sardinia'});
    
    this.map.addSource('flight_lines', {
      'type': 'geojson',
      'data': 
      {
        'type': 'FeatureCollection',
        'features': [ this.greatCircle1, this.greatCircle2 ]
      }
    });

    this.map.addLayer({
      'id': 'flight_lines',
      'type': 'line',
      'source': 'flight_lines',
      'paint': {
        'line-width': 1.5,
        // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
        // to set the line-color to a feature property value.
        'line-color': '#282c34', //['get', 'color'],
        'line-dasharray': [1, 1]
      }
    });
  }

  addMarkers = () => {
    this.map.addSource('startLocations', {
      type: 'geojson',
      data: this.start
    })
    // Start location marker load
    /* For each feature in the GeoJSON object above: */
    this.start.features.forEach(marker => {
      /* Create a div element for the marker. */
      var el = document.createElement('div');
      // /* Assign a unique `id` to the marker. */
      // el.id = "marker-" + marker.properties.id;
      /* Assign the `marker` class to each marker for styling. */
      el.className = 'marker';
      el.addEventListener('click', () => { 
        console.log("Start Location Clicked.");
      }); 

      
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
    });
    // Destination marker Load
    destinations.features.forEach(marker => {
      /* Create a div element for the marker. */
      var ed = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      ed.id = "marker-" + marker.properties.id;
      /* Assign the `marker` class to each marker for styling. */
      ed.className = 'destination_marker';
      ed.addEventListener('click', e => 
      { 
        // Reload the newly clicked destination to show flight lines
        this.end = marker.geometry.coordinates;
        // this.map.removeLayer('flight_lines')
        // this.setPopupmap.removeSource('flight_lines')
        this.removeStart();
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

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.myRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    // Set loading map view
    this.map.on('move', () => {
      this.setState({
      lng: this.map.getCenter().lng.toFixed(4),
      lat: this.map.getCenter().lat.toFixed(4),
      zoom: this.map.getZoom().toFixed(2)
      });
    });
    this.map.on('load', ()=> {
      this.map.addSource('destinations', {
        type: 'geojson',
        data: destinations
      });
    })
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.points1 !== this.props.points1) || (prevProps.points2 !== this.props.points2)) {
        if (
          (this.props.points1[0] !== 0) && 
          (this.props.points1[1] !== 0) && 
          (this.props.points2[0] !== 0) && 
          (this.props.points2[1] !== 0)) 
          {
          console.log("after both start locations: ", this.props.points1, this.props.points2);
          
          if (this.isLines) {
            this.removeStart();
          }
          this.addMarkers();
          this.drawLines();
        }
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
