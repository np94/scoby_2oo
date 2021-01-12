import React from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import apiHandler from "../api/apiHandler";
import CardItem from "../components/Cards/CardItem";

class Home extends React.Component {
  state = {
    items: [],
  };
  componentDidMount() {
    apiHandler
      .getItems()
      .then((apiResponse) => {
        console.log(apiResponse);
        this.setState({
          items: apiResponse.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render () {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiYW5uZS12aWN0b3JpYSIsImEiOiJja2pzcHZ0a3kwM2ZpMnlyZXFwa3Zxd2lwIn0.FXa9g51oLbBWDx61UUbEIg"   
    });
  return (
    <div>
      <h1></h1>
      <Map
  style="mapbox://styles/mapbox/streets-v9"
  containerStyle={{
    height: '100vh',
    width: '100vw'
  }}
>

 { this.state.items && this.state.items.map((item) => {
          return ( 
  <Marker
  coordinates={item.coordinates[0], item.coordinates[1]}
  anchor="bottom">
  <img src="/media/marker.svg" alt="marker"/>
  </Marker>
          )})}
          <CardItem item="item"/>
</Map>;
      <p>On home /</p>
    </div>
  );
}
};
export default Home;

