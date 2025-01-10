import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import searchy from '../assets/search_img.png';

const Weather = () => {
  const Ref = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const search = async (city) => {
    if (!city) {
      alert('Type the city name!');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_weather}`;
      const response = await fetch(url);
      const data = await response.json();
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        place: data.name,
        icon: iconUrl,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    search('London');
  }, []);

  return (
    <div className="weather-box flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-gradient-to-b from-blue-300 to-purple-600">
      <div className="search-bar flex items-center gap-3 mb-6">
        <input
          ref={Ref}
          type="text"
          placeholder="Search"
          className="search-input flex-grow p-3 rounded-full text-purple-700 bg-blue-100 text-lg"
        />
        <img
          src={searchy}
          alt="Search"
          className="search-icon w-10 h-10 cursor-pointer"
          onClick={() => search(Ref.current.value)}
        />
      </div>
      {weatherData && (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon w-36 mb-4" />
          <p className="temperature text-white text-6xl font-bold mb-2">{weatherData.temperature}°C</p>
          <p className="place text-white text-3xl mb-4">{weatherData.place}</p>
          <div className="data-box flex justify-between w-full p-4 rounded-lg bg-white bg-opacity-20 text-white">
            <div className="col flex items-center gap-4 text-xl">
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/humidity.png"
                alt="Humidity"
                className="icon w-8"
              />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col flex items-center gap-4 text-xl">
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/wind.png"
                alt="Wind"
                className="icon w-8"
              />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
