import React from "react";
import { useState, useEffect } from "react";
import location from "./../assests/location.png";
import day from "./../assests/day.png";
import evening from "./../assests/evening.png";
import night from "./../assests/night.png";
import pressure from "./../assests/pressure.png";
import humidity from "./../assests/humidity.png";
import dewPoint from "./../assests/dew-point.png";
import windspeed from "./../assests/wind-speed.png";
import windDegree from "./../assests/wind-deg.png";
import windGust from "./../assests/wind-gust.png";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  celsiusToFarenheit,
  cityName,
  fahrenheitToCelsius,
  TimeFormatter,
} from "../utils/util";
import { daysOfWeek, rotateArray } from "../utils/util";
import WeatherFallback from "../utils/WeatherFallback";

const Weather = ({ city }) => {
  const [tempUnit, setTempUnit] = useState("C"); // 'C' for Celsius, 'F' for Fahrenheit
  const [days, setDays] = useState(daysOfWeek);
  const [selected, setSelected] = useState({ id: 1, name: "Monday" });
  const [latLng, setLatLng] = useState();
  const [weather, setWeather] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [temp, setTemp] = useState(null);
  const [r1,setR1] = useState(null);
  const [r2,setR2] = useState(null);
  
  const tempUnitHandler = (unit) => {
    if (unit === "F") {
      setTemp(celsiusToFarenheit(temp));
    } else {
      setTemp(fahrenheitToCelsius(temp));
    }
    setTempUnit(unit);
  };

  const handleDay = (day) => {
    // console.log(day);
    setSelected(day);
    // console.log(weather.daily[day.id - 1]);
    setCurrentWeather(weather.daily[day.id - 1]);
    setTemp(weather.daily[day.id - 1].temp);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}`
        );
        setR1(response);
        const data = await response.json();
        setLatLng(data.coord);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [city]);

  useEffect(() => {
    if (latLng) {
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latLng.lat}&lon=${latLng.lon}&exclude=hourly,minutely&units=metric&appid=${process.env.REACT_APP_API_KEY}`
          );
          setR2(response);
          const data = await response.json();
          setWeather(data);
          setCurrentWeather(data.daily[0]);
          setTemp(data.daily[0].temp);
          const currentDayIndex = new Date(data.daily[0].dt * 1000).getDay();
          // console.log("currentDayIndex", currentDayIndex);
          const sortedDays = rotateArray(currentDayIndex===0 ? 6 : currentDayIndex - 1);
          // console.log("sortedDays", sortedDays);
          setDays(sortedDays);
          setSelected(sortedDays[0]);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      fetchWeather();
    }
  }, [latLng]);

  if (!weather) {
    return <WeatherFallback/>;
  }

  if(!r1.ok) return <p className="text-xl text-center text-white textt-semibold ">Something went wrong</p>;
  if(!r2.ok) return <p className="text-xl text-center text-white textt-semibold ">Something went wrong</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-red-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-2xl shadow-lg ">
        {/* Header Section */}
        <div className={`p-6 bg-cover rounded-tl-2xl rounded-tr-2xl`} style={{ backgroundImage: "url('images/overcast.jpg')" }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={location} alt="location" className="w-12 h-14" />
              <div>
                <h1 className="text-3xl font-bold text-white font-title">
                  {cityName(city)}
                </h1>
              </div>
            </div>
            <div className="flex gap-[1px]">
              <span
                onClick={() => tempUnitHandler("C")}
                className={`px-1 text-2xl rounded-bl-lg rounded-tl-lg font-bold cursor-pointer hover:scale-105 ${
                  tempUnit === "C" ? "bg-teal-400" : "bg-white"
                }`}
              >
                C
              </span>
              <span
                onClick={() => tempUnitHandler("F")}
                className={`px-1 text-2xl rounded-br-lg rounded-tr-lg font-bold cursor-pointer hover:scale-105 ${
                  tempUnit === "F" ? "bg-teal-400" : "bg-white"
                }`}
              >
                F
              </span>
            </div>
          </div>
          {/* Current Weather Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-2xl font-title font-semibold text-white p-2 ">
                {TimeFormatter(currentWeather.dt)}
              </p>
              <img
                src={require(`./../assests/${currentWeather.weather[0].icon}.png`)}
                alt="cloudy"
                className="w-32 p-2 md:ml-4"
              />
              <p className="text-xl text-white font-semibold font-title mt-2 p-2 md:ml-2">
                {cityName(currentWeather.weather[0].description)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-64 h-64 rounded-full bg-transparent shadow-custom">
              <div className="text-white flex space-x-4 font-bold font-title mt-4">
                <p className="text-2xl text-red-500 ">{temp.min.toFixed(1)}°</p>
                <p className="text-2xl text-teal-300">{temp.max.toFixed(1)}°</p>
              </div>
              <div className="text-white flex space-x-4 font-bold font-title mb-1">
                <p className="text-5xl ">{temp.day.toFixed(1)}°</p>
              </div>
              <div className="flex space-x-4 mt-2 text-white font-title text-md font-semibold">
                <div className="flex flex-col items-center">
                  <img src={day} alt="day" className="w-8 h-8 object-cover" />
                  <p>{temp.morn.toFixed(1)}°</p>
                </div>
                <div className="flex flex-col items-center mt-6">
                  <img
                    src={evening}
                    alt="evening"
                    className="w-8 h-8 object-cover"
                  />
                  <p>{temp.eve.toFixed(1)}°</p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={night}
                    alt="night"
                    className="w-8 h-8 object-cover"
                  />
                  <p>{temp.night.toFixed(1)}°</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-custom-input py-1">
          <div className="w-[240px] px-6 ">
            <Listbox value={selected} onChange={handleDay}>
              <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-md bg-nav-200 py-1.5 pl-3 pr-10 text-left text-white font-semibold shadow-sm outline-none sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    <span className="ml-3 block truncate font-title">
                      {selected.name}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>
                <ListboxOptions
                  transition
                  className="absolute z-10 max-h-56 w-full overflow-auto rounded-none bg-nav-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                  {days.map((day) => (
                    <ListboxOption
                      key={day.id}
                      value={day}
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-white font-title data-[focus]:bg-custom-input data-[focus]:text-white"
                    >
                      <div className="flex items-center">
                        <span className="ml-3 block truncate font-title">
                          {day.name}
                        </span>
                      </div>
                      {selected.id === day.id && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-custom-input">
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        </div>

        {/* Weather Details Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-6 py-4 text-lg font-semibold font-title bg-custom-input rounded-br-2xl rounded-bl-2xl">
          <div className="bg-nav-300 rounded-xl p-2 flex flex-col items-center shadow-lg">
            <p className="text-white mt-2">Pressure</p>
            <img src={pressure} alt="pressure" className="" />
            <p className="text-white mt-2">{currentWeather.pressure} mmHg</p>
          </div>
          <div className="bg-nav-300 rounded-xl p-2 flex flex-col items-center shadow-lg">
            <p className="text-white mt-2">Humidity</p>
            <img src={humidity} alt="pressure" className="" />
            <p className="text-white mt-2">{currentWeather.humidity}%</p>
          </div>
          <div className="bg-nav-300 rounded-xl p-2 flex flex-col items-center shadow-lg">
            <p className="text-white mt-2">Dew Point</p>
            <img src={dewPoint} alt="pressure" className="" />
            <p className="text-white mt-2">{currentWeather.dew_point}%</p>
          </div>
          <div className="bg-nav-300 rounded-xl p-2 flex flex-col items-center shadow-lg">
            <p className="text-white mt-2">Wind Speed</p>
            <img src={windspeed} alt="pressure" className="" />
            <p className="text-white mt-2">{currentWeather.wind_speed} Km/h</p>
          </div>
          <div className="bg-nav-300 rounded-xl p-2 flex flex-col items-center shadow-lg">
            <p className="text-white mt-2">Wind Degree</p>
            <img src={windDegree} alt="pressure" className="" />
            <p className="text-white mt-2">{currentWeather.wind_deg} deg</p>
          </div>
          <div className="bg-nav-300 rounded-xl p-2 flex flex-col items-center shadow-lg">
            <p className="text-white mt-2">Wind Gust</p>
            <img src={windGust} alt="pressure" className="p-1 rounded-lg" />
            <p className="text-white mt-2">{currentWeather.wind_gust} deg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
