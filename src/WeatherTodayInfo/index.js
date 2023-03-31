import React from "react";
import './WeatherTodayInfo.css';

function WeatherTodayInfo(props) {
    return (
        <div className="currentWeather__info_container">

            <div className="weather__icon_container">

                <span className="currentWeather_icon">
                    <img src={props.icon} alt={props.condition} />
                </span>

            </div>

            <div className="weather__temp_container">

                <h2 className="weather__temp">{props.temp}</h2>

                <h3>{props.changeTemp}</h3>

            </div>

            <h2 className="weather__condition">{props.condition}</h2>

            <p className="weather__date">Today &nbsp;&nbsp; . &nbsp;&nbsp; {props.date}</p>

            <pre className="weather__location">
                <span className="material-symbols-outlined">
                    location_on
                </span>
                {props.location}
            </pre>
        </div>
    )
}
export { WeatherTodayInfo };