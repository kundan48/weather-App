import React, { useState } from 'react'
import './weatherapp.css'
import search_icon from '../Assetss/search.png';
import cloud_icon from '../Assetss/cloud.png';
import humidity_icon from '../Assetss/humidity.png';
import wind_icon from '../Assetss/wind.png'

const Weatherapp = () => {
  let api_key="4dde029941fd2b65f746ea92fa16cd19";
   const[wicon, setWicon]=useState(cloud_icon);
   const humidity=document.getElementsByClassName("humdity-precent");
   const wind=document.getElementsByClassName("wind-rate");
   const temp=document.getElementsByClassName("weather-temp");
   const location=document.getElementsByClassName("weather-location");
   
  

  const search=async()=>{
    const element=document.getElementsByClassName("cityinput");
    if(element[0].value===""){
      return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response= await fetch(url);
    let data= await response.json();
    humidity[0].innerHTML=data.main.humidity+"%";
    wind[0].innerHTML=data.wind.speed+"km/h";
    temp[0].innerHTML = Math.round(data.main.temp) + "&deg;C";
    location[0].innerHTML=data.name;
    const iconValue=data.weather[0].icon

    setWicon(`https://openweathermap.org/img/wn/${iconValue}@4x.png`);
    
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  return (

    <div className="container">
      <div className="top-bar">
        <input type='text' className='cityinput' placeholder='search'onKeyDown={handleKeyDown} />
        <div className="search-icon"  onClick={()=>{search()}}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
      <img src={wicon} alt="" />
    </div>
        <div className="weather-temp">24&deg;C</div>
        <div className="weather-location">delhi</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className='icon' />
            <div className="data">
              <div className="humdity-precent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className='icon' />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Wind speed</div>
            </div>
          </div>
        </div>
    </div>

  )
}

export default Weatherapp
