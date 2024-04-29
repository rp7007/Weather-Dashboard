import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState({
        humidity: "64%",
        windSpeed: "18 km/h",
        temperature: "24°C",
        location: "London",
        weatherIcon: cloud_icon,
        weatherStatement: "Cloudy" // Default weather statement
    });

    const api_key = process.env.REACT_APP_API_KEY; // Replace with your actual API key

    const search = async () => {
        const cityInput = document.getElementsByClassName("cityInput")[0].value;
        if (cityInput === "") {
            return;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            let weatherStatement;
            switch (data.weather[0].main) {
                case "Clear":
                    weatherStatement = "Clear sky";
                    break;
                case "Clouds":
                    weatherStatement = "Cloudy";
                    break;
                case "Drizzle":
                    weatherStatement = "Drizzling";
                    break;
                case "Rain":
                    weatherStatement = "Rainy";
                    break;
                case "Snow":
                    weatherStatement = "Snowy";
                    break;
                default:
                    weatherStatement = data.weather[0].description;
            }

            let weatherIcon;
            switch (data.weather[0].icon) {
                case "01d":
                case "01n":
                    weatherIcon = clear_icon;
                    break;
                case "02d":
                case "02n":
                    weatherIcon = cloud_icon;
                    break;
                case "03d":
                case "03n":
                case "04d":
                case "04n":
                    weatherIcon = drizzle_icon;
                    break;
                case "09d":
                case "09n":
                case "10d":
                case "10n":
                    weatherIcon = rain_icon;
                    break;
                case "13d":
                case "13n":
                    weatherIcon = snow_icon;
                    break;
                default:
                    weatherIcon = cloud_icon;
            }

            setWeatherData({
                humidity: `${data.main.humidity}%`,
                windSpeed: `${Math.floor(data.wind.speed)} km/h`,
                temperature: `${Math.floor(data.main.temp)}°C`,
                location: data.name,
                weatherIcon: weatherIcon,
                weatherStatement: weatherStatement
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className='Container'>
            <div className='top-bar'>
                <input type='text' className='cityInput' placeholder='Enter City Name' />
                <div className='search-icon' onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className='weather-summary'>
                Current Weather: {weatherData.weatherStatement}
            </div>
            <div className='weather-image'>
                <img src={weatherData.weatherIcon} alt="" />
            </div>
            <div className='weather-temp'>{weatherData.temperature}</div>
            <div className='weather-location'>{weatherData.location}</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className='humidity-percentage'>{weatherData.humidity}</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className='wind-rate'>{weatherData.windSpeed}</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
