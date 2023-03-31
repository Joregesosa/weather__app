import React from 'react';
import './WeatherHeader.css';

function WeatherHeader(props) {
    return (
        <header id="header">

            <input
                className="weather__search_button"
                type="button"
                value="Search for Places"
                onClick={() => { props.setOpenNav(true) }} />

            <span className="material-symbols-outlined icon_ubicar"
            onClick={()=>{props.getWeatherByGeoLocation()}}>
                my_location
            </span>

        </header>
    )
}

export{WeatherHeader};