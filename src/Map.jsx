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
// TODO  set max zoom out

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.58,
         // Start Locatiions
      start1 : point([-3.7025600, 40.4165000]), // Madrid
      start2 : point([8.5500000, 47.3666700]), // Zurich
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

    // Destination Point
    var end = point([9.283447, 40.078072]) // Sardinia

    // Set loading map view
    map.on('move', () => {
      this.setState({
      lng: map.getCenter().lng.toFixed(4),
      lat: map.getCenter().lat.toFixed(4),
      zoom: map.getZoom().toFixed(2)
      });
    });
  
    
    let drawLines = (end) => {
      var greatCircle1 = greatCircle(this.state.start1, end, {'name': 'Madrid to Sardinia'});
      var greatCircle2 = greatCircle(this.state.start2, end, {'name': 'Zurich to Sardinia'});
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
    }

    let addMarkers = () => {
      // Start location marker load
      /* For each feature in the GeoJSON object above: */
      startLocations.features.forEach(function(marker) {
        /* Create a div element for the marker. */
        var el = document.createElement('div');
        /* Assign a unique `id` to the marker. */
        el.id = "marker-" + marker.properties.id;
        /* Assign the `marker` class to each marker for styling. */
        el.className = 'marker';
        el.addEventListener('click', () => { 
          console.log("Start Location Clicked.");
        }); 

        new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      });
      // Destination marker Load
      destinations.features.forEach(function(marker) {
        /* Create a div element for the marker. */
        var ed = document.createElement('div');
        /* Assign a unique `id` to the marker. */
        ed.id = "marker-" + marker.properties.id;
        /* Assign the `marker` class to each marker for styling. */
        ed.className = 'destination_marker';
        ed.addEventListener('click', e => 
        { 
          // Reload the newly clicked destination to show flight lines
          end = marker.geometry.coordinates;
          map.removeLayer('flight_lines')
          map.removeSource('flight_lines')
          drawLines(end);
        });
        var popup = new mapboxgl.Popup({ offset: 25 }).setText(
          'Flight Information Goes Here'
        );
        new mapboxgl.Marker(ed, { offset: [0, -23] })
          .setLngLat(marker.geometry.coordinates)
          .setPopup(popup)
          .addTo(map);
      });
    }
    map.on('load', () => {
      map.addSource('places', {
        type: 'geojson',
        data: startLocations & destinations
      });
      addMarkers();
      drawLines(end);
    });
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
