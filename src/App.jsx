import React from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { points } from './points.js';
import { destinations } from './destination.js';
import { greatCircle, point } from '@turf/turf';

/**
 * This is the map component.
 */

mapboxgl.accessToken = 'pk.eyJ1IjoibGtyaXBhIiwiYSI6ImNrazVpZHQ5OTBxa3kyd3FuMnoyYmVlZHAifQ.wxeraMVYC8zmS4rXERn4ng';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
    this.myRef = React.createRef();
  }
  
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.myRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
  
    map.on('move', () => {
      this.setState({
      lng: map.getCenter().lng.toFixed(4),
      lat: map.getCenter().lat.toFixed(4),
      zoom: map.getZoom().toFixed(2)
      });
    });
  
    map.on('load', () => {
      var start1 = point([-3.7025600, 40.4165000]); // Madrid
      var start2 = point([8.5500000, 47.3666700]); // Zurich
      var end = point([9.283447, 40.078072]); // Sardinia
      var greatCircle1 = greatCircle(start1, end, {'name': 'Zurich to Sardinia'});
      var greatCircle2 = greatCircle(start2, end, {'name': 'Zurich to Sardinia'});

      map.addSource('flight_lines', {
        'type': 'geojson',
        'data': 
        {
          'type': 'FeatureCollection',
          'features': [ greatCircle1, greatCircle2 ]
        }
      });

      map.addLayer({
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

      map.addSource('places', {
        type: 'geojson',
        data: points & destinations
      });
      
      addMarkers();
    });

  function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    points.features.forEach(function(marker) {
      /* Create a div element for the marker. */
      var el = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      el.id = "marker-" + marker.properties.id;
      /* Assign the `marker` class to each marker for styling. */
      el.className = 'marker';
      
      /**
       * Create a marker using the div element
       * defined above and add it to the map.
      **/
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });
    destinations.features.forEach(function(marker) {
      /* Create a div element for the marker. */
      var ed = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      ed.id = "marker-" + marker.properties.id;
      /* Assign the `marker` class to each marker for styling. */
      ed.className = 'destination_marker';
      
      /**
       * Create a marker using the div element
       * defined above and add it to the map.
      **/
      new mapboxgl.Marker(ed, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });
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
 
export default App;
