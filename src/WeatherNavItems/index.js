
import React from "react";
import './WeatherNavItems.css';

function WeatherNavItems(props) {
    const locationName = props.city + ',' + props.country;

    return (
        <li
            className="wheather__nav_item"
            onClick={() => props.getWeatherData(locationName)}
        >

            <p className="wheather__nav_itemContent">

                {props.city},&nbsp;&nbsp;&nbsp;&nbsp;{props.country}

            </p>

        </li>
    )
}
export { WeatherNavItems };