import React, { useEffect, useState } from 'react'
import { useOnKeyPress } from '../hooks/useOnKeyPress'

import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const WeatherApp = () => {

    let api_key = "4d9491ba35d7c665479c4179cfbf1b18"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Manila&units=metric&appid=${api_key}`;

    const [wicon, setWicon] = useState(clear_icon);
    const [temp, setTemp] = useState(0);
    const [location, setLocation] = useState("");
    const [humidity, setHumidity] = useState("");
    const [windSpeed, setWindSpeed] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(url);
            result.json().then(json => {
                setTemp(Math.floor(json.main.temp))
                setLocation(json.name)
                setHumidity(json.main.humidity)
                setWindSpeed(Math.round(json.wind.speed))
                switch(json.weather[0].icon){
                    case "01d" || "01n":
                        setWicon(clear_icon);
                    break;
                    case "02d" || "02n":
                        setWicon(cloud_icon);
                    break;
                    case "03d" || "03n":
                        setWicon(drizzle_icon);
                    break;
                    case "04d" || "04n":
                        setWicon(drizzle_icon);
                    break;
                    case "09d" || "09n":
                        setWicon(rain_icon);
                    break;
                    case "10d" || "10n":
                        setWicon(snow_icon);
                    break;
                    default:
                        setWicon(clear_icon);
                }
            })
        }                
        fetchData();
    }, [url]);

const search = async () => {
    const element = document.getElementById("searchInput")                            
    if(element.value === ""){
        return 0;
    }        
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`
    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementById("humidityPercent");
    const wind = document.getElementById("windRate");
    const temp = document.getElementById("weatherTemp");
    const location = document.getElementById("weatherLocation");

    
    humidity.innerHTML = data.main.humidity + "%";        
    wind.innerHTML = Math.round(data.wind.speed) + " km/h";
    temp.innerHTML = Math.round(data.main.temp) + "°c";
    location.innerHTML = data.name;

    switch(data.weather[0].icon){
        case "01d" || "01n":
            setWicon(clear_icon);
        break;
        case "02d" || "02n":
            setWicon(cloud_icon);
        break;
        case "03d" || "03n":
            setWicon(drizzle_icon);
        break;
        case "04d" || "04n":
            setWicon(drizzle_icon);
        break;
        case "09d" || "09n":
            setWicon(rain_icon);
        break;
        case "10d" || "10n":
            setWicon(snow_icon);
        break;
        default:
            setWicon(clear_icon);
    }
}

    useOnKeyPress(search, 'Enter');

  return (     

    <div className=' max-w-lg h-auto m-auto mt-20 rounded-xl bg-gradient-to-r from-[#130754] to-[#3b2f80] '>
        {/* top bar */}
        <div className=" flex justify-center gap-4 pt-16">
            <input 
                type="text" 
                className=' flex w-80 h-12 bg-white border-none outline-none rounded-[40px] pl-10 text-gray-800 text-lg font-normal' 
                placeholder='Search' 
                id='searchInput'           
            />
            <div 
                className=" flex justify-center items-center w-12 h-12 bg-cyan-200 rounded-[40px] cursor-pointer"                 
                onClick={() => {search()}}
            >
                <img src={search_icon} alt="weather condition" />
            </div>
        </div>
        {/* weather info */}
        <div className='flex justify-center mt-5 h-48'>
            <img src={wicon} alt="cloud_icon" />
        </div>
        <div className='flex flex-col items-center gap-6 text-cyan-200 font-normal'>
            <div className='text-8xl' id='weatherTemp'>{temp}°c</div>
            <div className='text-6xl' id='weatherLocation'>{location}</div>
        </div>
        
        <div className='flex justify-evenly mt-10 py-10 text-cyan-300'>
            <div className=' flex items-center gap-5 '>
                <img 
                    src={humidity_icon} 
                    alt="" 
                    className=' w-10'
                />
                <div>
                    <div className="" id='humidityPercent'>{humidity}%</div>
                    <p>Humidity</p>
                </div>
            </div>
            <div className=' flex items-center gap-5 '>
                <img src={wind_icon} alt="" />
                <div>
                    <div id='windRate'>{windSpeed} km/h</div>
                    <p>Wind Speed</p>
                </div>
            </div>
        </div>        
    </div>
  )
}

export default WeatherApp
