import React from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { startLocations } from './startLocations.js';
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
    this.end = point([9.283447, 40.078072]); // Sardinia
    this.greatCircle1 = greatCircle(point(this.props.points1), this.end, {'name': 'Madrid to Sardinia'});
    this.greatCircle2 = greatCircle(point(this.props.points2), this.end, {'name': 'Zurich to Sardinia'});
    this.isLines = false;
    this.map = null;
    this.startMarker = null;
    this.start = null;
  }
  
  //TODO: FIX BUG WITH MARKERS TO APPEAR CORRECTLY ON MAP
  removeStartLines = () => {
    this.map.removeLayer('flight_lines');
    this.map.removeSource('flight_lines');
    this.startMarker.remove();
    this.map.removeSource('startLocations');
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
        'line-color': '#282c34',
        'line-dasharray': [1, 1]
      }
    });
  }

  addStartMarkers = () => {
    this.start = { 
      // Person 1
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": this.props.points1
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
            "coordinates": this.props.points2
          },
          "properties": {
            "city": "",
            "country": "",
          }
        }
      ]
    };

    this.map.addSource('startLocations', {
      type: 'geojson',
      data: this.start
    });
    console.log(this.start);

    /* Start location marker load */
    /* For each feature in the GeoJSON object: */
    this.start.features.forEach(marker => {
      /* Create a div element for the marker. */
      var el = document.createElement('div');
      el.className = 'marker';
 
      this.startMarker = new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
    });
  }

  addDestinationMarkers = () => {
    // Destination marker Load
    destinations.features.forEach(marker => {
      var ed = document.createElement('div');
      ed.id = "marker-" + marker.properties.id;
      ed.className = 'destination_marker';
      ed.addEventListener('click', e => 
      { 
        // Reload the newly clicked destination to show flight lines
        this.end = marker.geometry.coordinates;
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
          console.log("Both locations selected: ", this.props.points1, this.props.points2);
          
          if (this.isLines) {
            this.removeStartLines();
          }
          this.addStartMarkers();
          this.addDestinationMarkers();
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
