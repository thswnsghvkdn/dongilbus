/*global kakao*/
import './App.css';
import Axios from 'axios'
import React, { useEffect } from 'react'
const apiUrl = "https://dongilbus.herokuapp.com/api/gps"
const { MapApiKey } = require('./config/key');

const App = () => {
  function delayPost() {
    Axios.get(apiUrl).then(response => {
      kakao.maps.load(() => {
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(response.data.lat, response.data.lng),
          level: 3
        };
        var map = new kakao.maps.Map(container, options);
        var markerPosition = new kakao.maps.LatLng(response.data.lat, response.data.lng);
        var marker = new kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);
        console.log(response.data)
        setTimeout(() => delayPost(), 5000);
      })
    })
  }
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${MapApiKey.key}&autoload=false`;
    document.head.appendChild(script);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        new window.kakao.maps.Map(mapContainer, mapOption);
      });
      delayPost();
    };
    script.addEventListener("load", onLoadKakaoMap);

  }, [])
  return (
    <div>
      <div style={{ width: '100%', height: "70px", borderBottom: "3px", borderColor: "black" }}>
        <img src="http://jesuscountry.net/images/common/logo.jpg" />
      </div>
      <div style={{ transform: "translate(5% , 5%)" }}>
        <div id="map" ></div>
      </div>
    </div>
  )
}

export default App;
