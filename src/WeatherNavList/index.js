import React from "react";
import './WheatherNavList.css';

function WeatherNavList(props) {
    return (
        <ul className="weather__nav_list">

            {props.children}

        </ul>
    )
}
export { WeatherNavList }; 