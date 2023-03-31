import React from "react";
import './WeatherNavContainer.css';
function WeatherNavContainer(props) {
    return (
        <section className="weatherNav_container">
            {props.children}
        </section>
    )
}

export {WeatherNavContainer};