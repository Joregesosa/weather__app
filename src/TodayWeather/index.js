import React, { } from "react";
import './TodayWeather.css';

function TodayWeather(props) {
    const onClickOpenSearcher = () =>{
        props.setOpenSearcher(true);
    }
    return (
        <section className="todayWeather__section">
            <header>

                <input 
                className="weather__search_button" 
                type="button" 
                value="Search for Places"
                onClick={onClickOpenSearcher} />

                <span className="icon_ubicar"> Q</span>
                
            </header>

            <div className="weather__icon_container">

                <span className="currentWeather">
                    <img src={props.icon} alt="current weather icon" />
                </span>

            </div>

            <div className="currentWeather__info_container">

                <div className="weather__temp_container">

                    <h2 className="weather__temp">{props.temp}</h2>

                    <h3>{props.changeTemp}</h3>

                </div>

                <h2 className="weather__condition">{props.condition}</h2>

                <p className="weather__date">Today &nbsp;&nbsp; . &nbsp;&nbsp; {props.date}</p>

                <span className="weather__location">{props.location}</span>
            </div>

        </section>
    )
}

export { TodayWeather };

