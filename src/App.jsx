import React from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { points } from './points.js';
import { destinations } from './destination.js';

/**
 * This is the map component.
 */

mapboxgl.accessToken = 'pk.eyJ1IjoibGtyaXBhIiwiYSI6ImNrazVpZHQ5OTBxa3kyd3FuMnoyYmVlZHAifQ.wxeraMVYC8zmS4rXERn4ng';
// interface locationProps {
//   lng: any;
//   lat: any;
//   zoom: any;
// }



class App extends React.Component {
  // private myRef: React.RefObject<HTMLInputElement>;
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
      /* Add the data to your map as a layer */
      // map.addLayer({
      //   "id": "locations",
      //   "type": "symbol",
      //   /* Add a GeoJSON source containing place coordinates and information. */
      //   "source": {
      //     "type": "geojson",
      //     "data": points
      //   },
      //   "layout": {
      //     "icon-image": "restaurant-15" ,
      //     "icon-allow-overlap": true,
      //   }
      // });
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
      var el = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      el.id = "marker-" + marker.properties.id;
      /* Assign the `marker` class to each marker for styling. */
      el.className = 'destination_marker';
      
      /**
       * Create a marker using the div element
       * defined above and add it to the map.
      **/
      new mapboxgl.Marker(el, { offset: [0, -23] })
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
