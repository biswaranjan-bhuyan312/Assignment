import React, { useEffect, useRef, useState } from 'react'
import Styles from './Weather.module.css'
import search from '../assets/search.png'
import cloud from '../assets/cloud.jpeg'
import humidity from '../assets/humidity.png'
import wind from '../assets/windspeed.jpeg'
import clear from '../assets/clear.jpeg'
import rain from '../assets/rain.png'
import snow from '../assets/snow.jpeg'
import drizzle from '../assets/images.jpeg'

const Weather = () => {
    const inputRef = useRef();

    const [WeatherData,setWeatherData]=useState(false);

    const allicons={
        "01d" : clear,
        "01n" : clear,
        "02d" : cloud,
        "02n" : cloud,
        "03d" : cloud,
        "03n" : cloud,
        "04d" : drizzle,
        "04n" : drizzle,
        "09d" : rain,
        "09n" : rain,
        "10d" : rain,
        "10n" : rain,
        "13d" : snow,
        "13n" : snow
    }

    const Search = async (city) =>{
        try {
            const API_KEY = "99143cbc446ea2464258627751f7e315"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            const icon = allicons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity:data.main.humidity,
                windspeed:data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        Search("London");
    },[])
  return (
    <>
        <div className={Styles.Weather}>
            <div className={Styles.searchBar}>
                <input  ref={ inputRef} type='text' placeholder='search'/>
                <img src={search}  alt='' onClick={()=>Search(inputRef.current.value)}/>
            </div>
            <img src={WeatherData.icon} alt=''/>
            <p className={Styles.temperature}>{WeatherData.temperature}&deg;c</p>
            <p className={Styles.location}>{WeatherData.location}</p>
            <div className={Styles.WeatherData}>
                <div className={Styles.col}>
                    <img src={humidity} alt=''/>
                    <div>
                        <p>{WeatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className={Styles.col}>
                    <img src={wind} alt=''/>
                    <div>
                        <p>{WeatherData.windspeed}km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Weather