/*global kakao*/
import './App.css';
import React, { useEffect } from 'react'
const { MapApiKey } = require('./config/key');

const App = () => {
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
    };
    script.addEventListener("load", onLoadKakaoMap);

  }, [])
  return (
    <div>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  )
}

export default App;
