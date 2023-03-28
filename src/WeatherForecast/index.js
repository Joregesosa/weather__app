import React from "react";
import './WeatherForecast.css';
function WeatherForecast(props) {
  return (
    <section className="weatherForecast__container">

      <ul className="weatherForecast__list">

        {props.children}

      </ul>

    </section>
  )
}
export { WeatherForecast }