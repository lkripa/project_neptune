import React from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * This is the map component.
 */

mapboxgl.accessToken = 'pk.eyJ1IjoibGtyaXBhIiwiYSI6ImNrazVpZHQ5OTBxa3kyd3FuMnoyYmVlZHAifQ.wxeraMVYC8zmS4rXERn4ng';
interface locationProps {
  lng: any;
  lat: any;
  zoom: any;
}

class App extends React.Component<{}, locationProps> {
  private myRef: React.RefObject<HTMLInputElement>;
  constructor(props: locationProps) {
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
      container: this.myRef.current, // this.mapContainer,
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
  }
  
  render() {
    return (
      <div>
        {/* <div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div> */}
        <div ref={this.myRef}  // ref={el => this.mapContainer = el} 
        className='mapContainer' />
      </div>
    )
  }
}
 
export default App;
