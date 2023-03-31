import React from "react";
import './WeatherForecastDays.css';

function WeatherForecastDays(props) {
    return (
        
        <li className="nextDaysWeather__items">

            <h3 className="nextDaysWeather__date">{props.date}</h3>

            <span className="nextDaysWeather__icon">
                <img src={props.icon} alt={props.condition} />
            </span>

            <div className="nextDaysWeather__temp_container">

                <p className="nextDaysWeather__temp_a">{props.maxtemp_c}{props.unit}</p>

                <p className="nextDaysWeather__temp_b">{props.mintemp_c}{props.unit}</p>

            </div>

        </li>
        
    )
}
export { WeatherForecastDays };