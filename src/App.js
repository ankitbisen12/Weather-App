import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Layout/Header";

const App = () => {
  const [weath, setWeath] = useState(null);
  const [state, setState] = useState(null);
  const [location, setLocation] = useState("");
  const [cloud, setCloud] = useState("");
  const [cityName, setCityName] = useState("Gwalior");
  const [wind, setWind] = useState({});
  const [descrp, setDescrp] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherDetailsApi = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=c4389738498adeb9c6c4c6bb876c1679`
        );

        if (!weatherDetailsApi.ok)
          throw new Error("Problem getting location data");

        const detailsJson = await weatherDetailsApi.json();
        setWeath(detailsJson.main);
        setLocation(detailsJson.sys);
        setState(detailsJson.name);
        setCloud(detailsJson.clouds);
        setWind(detailsJson.wind);
        setDescrp(detailsJson.weather[0]);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchWeather();
  }, [cityName]);

  const inputChangeHandler = (event) => {
    setCityName(event.target.value);
  };

  const dateObject = new Date();
  const day = dateObject
    .toLocaleString("en-US", { day: "numeric" })
    .padStart(2, "0");
  const month = dateObject
    .toLocaleString("en-US", { month: "numeric" })
    .padStart(2, "0");

  const year = dateObject.toLocaleString("en-US", { year: "numeric" });
  const weekDay = dateObject.toLocaleString("en-US", { weekday: "long" });
  const date = `${weekDay},${day}/${month}/${year}`;
  let [hour, minute] = [dateObject.getHours(), dateObject.getMinutes()];

  const padMinutes = (minutes) => {
    // Convert minutes to a string and add leading zeros
    if (+minutes < 10) {
      return String(minutes).padStart(2, "0");
    }
    return minutes;
  };

  const minutes = padMinutes(minute);
  const time = `${hour}:${minutes}`;
  const evening = hour > 12 ? "PM" : "AM";

  return (
    <React.Fragment>
      <Header />
      <section>{!error && <p>{error}</p>}</section>
      <div class="main_div">
        {!weath ? (
          <p className="Para">Invalid city</p>
        ) : (
          <div class="insertedHtml">
            <div class="cover">
              <div class="crd_contain">
                <div class="card1">
                  <div className="box">
                    <div className="inputData">
                      <input
                        type="search"
                        className="inputField"
                        placeholder="Search"
                        onChange={inputChangeHandler}
                      />
                    </div>
                  </div>
                  <div class="content">
                    <div class="innercol1">
                      <div class="country">
                        <h2>
                          {state}, {location.country}
                          <br />
                          <label>Mostly {descrp.description}</label>
                        </h2>
                      </div>
                      <span class="now">Now</span>
                      <div class="temp">
                        {weath.feels_like}
                        <span>°C</span>
                      </div>
                    </div>
                    <div class="innercol11">
                      <div class="cloud">
                        <i class="fab fa-4x fa-cloudversify"></i>
                      </div>
                      <div class="time">
                        {time} {evening}
                      </div>
                      <div class="day">{date}</div>
                    </div>
                  </div>
                </div>
                <div class="card2">
                  <div class="innercol2">
                    <div class="innerbox">
                      <div class="forecast">
                        <div class="box1">
                          <span>CLOUD</span>
                          <span>{cloud.all}%</span>
                        </div>
                        <div class="box2">
                          <span>
                            <i class="fas fa-2x fa-cloud"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="innerbox">
                      <div class="forecast">
                        <div class="box1">
                          <span>Humidity</span>
                          <span>{weath.humidity}%</span>
                        </div>
                        <div class="box2">
                          <span>
                            <i class="fas fa-2x fa-cloud-sun"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="innerbox">
                      <div class="forecast">
                        <div class="box1">
                          <span>WIND</span>
                          <span>{wind.speed} kph</span>
                        </div>
                        <div class="box2">
                          <span>
                            <i class="fas fa-2x fa-wind"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
