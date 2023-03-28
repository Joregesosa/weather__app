import './App.css';
import React, { useState } from 'react';
import { TodayWeather } from '../TodayWeather';
import { useWeatherApp } from './useWeatherApi'
import { RightSide } from '../rightSide';
import { TemperatureUnitsButton } from '../TemperatureUnitsButton';
import { WeatherForecast } from '../WeatherForecast'
import { WeatherForecastDays } from '../WeatherForecastDays';
import { TodayHightlights } from '../TodayHightlights';
import { LocationCities } from '../locationCities';
import { SearchLocation } from '../searchLocation';

function App() {
  const {

    currentWeather,
    forecast,
    loading,
    error

  } = useWeatherApp();

  const [changeTemp, setChangeTemp] = useState('°C');
  const [openSearcher, setOpenSearcher] = useState(false);
  return (
    <React.Fragment>



      <TodayWeather
        temp={changeTemp === '°C' ? currentWeather.temp_c : currentWeather.temp_f}
        condition={currentWeather.condition}
        date={currentWeather.date}
        location={currentWeather.location}
        icon={currentWeather.icon}
        changeTemp={changeTemp}
        setOpenSearcher={setOpenSearcher}
      />

      {openSearcher &&

        <SearchLocation>
          <LocationCities />
        </SearchLocation>

      }

      <RightSide>
        {loading && <p style={{ color: 'white' }}>Loading... please wait</p>}

        <TemperatureUnitsButton
          setChangeTemp={setChangeTemp}
        />

        <WeatherForecast>
          {error && <p style={{ color: 'white' }}>${error}</p>}

          {forecast.map(day => (
            <WeatherForecastDays
              key={day.date}
              date={day.date}
              condition={day.condition}
              maxtemp_c={changeTemp === '°C' ? day.maxtemp_c : day.maxtemp_f}
              mintemp_c={changeTemp === '°C' ? day.mintemp_c : day.mintemp_f}
              icon={day.icon}
            />
          ))}

        </WeatherForecast >

        <TodayHightlights
          pressure_mb={currentWeather.pressure_mb}
          vis_miles={currentWeather.vis_miles}
          humidity={currentWeather.humidity}
          wind_mph={currentWeather.wind_mph}
          wind_dir={currentWeather.wind_dir}
        />

      </RightSide>

    </React.Fragment>
  );

}

export default App;
