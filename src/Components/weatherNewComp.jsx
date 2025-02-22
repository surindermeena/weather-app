import { useEffect } from "react";
import { useState } from "react";
import process from 'process';
import { ProgressBar } from "react-loader-spinner";
const WeatherNewComp = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function getWeatherData() {
    try {
      setLoading(true);
      let API_KEY = import.meta.env.VITE_APP_API_KEY;
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );

      let result = await response.json();

      if (result.cod === "404") {
        setError(result.message);
      }
      if (result.cod !== "400" && result.cod !== "404") {
        setWeatherData(result);
        setError("");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWeatherData();
    
  }, [cityName]);

  // ===================================================================================================
  const tempUnitConverter = (temp) => Math.floor(temp - 273);
  const pressureUnitConverter = (pres) => Math.round(pres * 0.02953);
  const distanceUnitConverter = (dis) => dis / 1000;

  const timeConverter = (unix_timestamp) => {
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
  };
  // ===================================================================================================
  return (
    <>
      <div className="border border-white min-w-[500px] min-h-[650px] m-5 rounded-2xl text-center bg-white/10">
        <h2 className="text-white pt-5 text-[0_0_9px_black]">Weather in your City</h2>

        <input
          className="w-[70%] py-[9px] text-center text-[17px] border-none rounded-2xl my-2 bg-white/90 shadow-[inset_3px_3px_6px_black] focus:outline-none"
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter your City Name"
        />

        <br />

        {error && (
          <p className="text-red-600 text-center">Error: {error} </p>
        )}

        {weatherData && (
          <div className="innerBox">
            <div className="flex justify-center gap-10 text-[20px] text-white">
            <p className="p-1 inline-block">City: {weatherData.name}</p>
            <p className="p-1 inline-block">Country: {weatherData?.sys?.country}</p>
            </div>


            <div className="box3">
              {weatherData.weather && (
                <img
                  className="w-[200px] h-[200px] border border-white shadow-[inset_0_0_10px_black] rounded-2xl inline-block"
                  src={`${weatherData?.weather[0].icon}.svg`}
                  alt="img"
                />
              )}

              <div className="box4">
                <p className="cityTempNor">
                  {tempUnitConverter(weatherData?.main?.temp)}&#176;C
                </p>
                <hr className="text-white" />

                <p className="cityTempMaxMin">
                  Max:{tempUnitConverter(weatherData?.main?.temp_max)}&#176;C /
                  Min:
                  {tempUnitConverter(weatherData?.main?.temp_min)}&#176;C
                </p>
              </div>
            </div>

            <div className="com2">
              <div className="com3">
                <p className="cityTemp">
                  Description:{" "}
                  {weatherData.weather && weatherData?.weather[0].description}
                </p>
                <p className="cityTemp">
                  Pressure: {pressureUnitConverter(weatherData?.main?.pressure)}
                  inHg
                </p>
                <p className="cityTemp">
                  Humidity: {weatherData?.main?.humidity} %
                </p>
                <p className="cityTemp">
                  Clouds: {weatherData?.clouds?.all} %
                </p>
              </div>

              <div className="com4">
                <p className="cityTemp">
                  Sunrise: {timeConverter(weatherData?.sys?.sunrise)}
                </p>

                <p className="cityTemp">
                  Sunset: {timeConverter(weatherData?.sys?.sunset)}
                </p>

                <p className="cityTemp">
                  Wind Speed: {weatherData?.wind?.speed} km/h
                </p>

                <p className="cityTemp">
                  Wind Direction: {weatherData?.wind?.deg}&#176;
                </p>

                <p className="cityTemp">
                  Visibility: {distanceUnitConverter(weatherData?.visibility)}{" "}
                  km
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherNewComp;
