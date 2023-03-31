import './App.css';
import React from 'react';

import { LeftSide } from '../LeftSide';
import { WeatherHeader } from '../WeatherHeader';
import { WeatherTodayInfo } from '../WeatherTodayInfo';

import { WeatherNavContainer } from '../WeatherNavContainer';
import { WeatherNav } from '../WeatherNav';
import { WeatherNavList } from '../WeatherNavList';
import { WeatherNavItems } from '../WeatherNavItems';

import { useWeatherApp } from './useWeatherApi'
import { RightSide } from '../rightSide';
import { TemperatureUnitsButton } from '../TemperatureUnitsButton';
import { WeatherForecast } from '../WeatherForecast'
import { WeatherForecastDays } from '../WeatherForecastDays';
import { TodayHightlights } from '../TodayHightlights';

function App() {
  const {

    currentWeather,
    forecast,
    loading,
    error,
    searchedLocation,
    openNav,
    setOpenNav,
    getLocationInfo,
    changeTemp,
    setChangeTemp,
    getWeatherData,
    getWeatherByGeoLocation


  } = useWeatherApp();

  return (
    <React.Fragment>

      <LeftSide>

        <WeatherHeader
          setOpenNav={setOpenNav}
          getWeatherByGeoLocation={getWeatherByGeoLocation}
        />

        <WeatherTodayInfo
          temp={changeTemp === '°C' ? currentWeather.temp_c : currentWeather.temp_f}
          condition={currentWeather.condition}
          date={currentWeather.date}
          location={currentWeather.location}
          icon={currentWeather.icon}
          changeTemp={changeTemp}
        />

      </LeftSide>


      <RightSide>
        {loading && <p style={{ color: 'white', fontSize: '60px' }}>Loading... please wait</p>}
        {error && <p style={{ color: 'white', fontSize: '60px' }}>${error}</p>}

        <TemperatureUnitsButton
          setChangeTemp={setChangeTemp}
        />

        <WeatherForecast>
          {/* {error && <p style={{ color: 'white' }}>${error}</p>} */}

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

      {openNav &&

        <WeatherNavContainer>

          <WeatherNav
            getLocationInfo={getLocationInfo}
            setOpenNav={setOpenNav}
          />

          <WeatherNavList>

            {searchedLocation.map(city => (

              <WeatherNavItems
                key={city.key}
                city={city.city}
                country={city.country}
                getWeatherData={getWeatherData}

              />

            ))}

          </WeatherNavList>


        </WeatherNavContainer>

      }

    </React.Fragment >
  );

}

export default App;
