import React from "react";
import './TodayHightlights.css';

function TodayHightlights(props) {
    return (

        <div className="currentWeather_hightlights">

            <h2 className="currentWeather_hightlights_title">
                Today`s Hightlights
            </h2>

            <div className="currentWeather__windStatus">

                <h2 className="currentWeather__windStatus_title">
                    Wind status
                </h2>

                <div className="currentWeather__windStatus_value">

                    <h3>{props.wind_mph}</h3>

                    <h4>mph</h4>

                </div>

                <div className="currentWeather__windStatus_direction">

                    <span className="material-symbols-outlined">
                        navigation
                    </span>

                    {props.wind_dir}

                </div>

            </div>

            <div className="currentWeather__humidity">

                <h2 className="currentWeather__humidity_title">
                    Humidity
                </h2>

                <div className="currentWeather__humidity_value">
                    <h3>{props.humidity}</h3>
                    <h4>%</h4>
                </div>

                <div className="humidity__number_porcentage">
                    <p>0</p>
                    <p>50</p>
                    <p>100</p>
                </div>

                <div className="humidity__bar">

                    <div style={{ width: `${props.humidity}%` }}></div>


                </div>

                <div className="humidity__porcentage">
                    %
                </div>

            </div>

            <div className="currentWeather__visibility">

                <h2 className="currentWeather__visibility_title">
                    Visibility
                </h2>

                <div className="currentWeather__visibility_value">
                    <h3>{props.vis_miles}</h3>
                    <h4>miles</h4>
                </div>


            </div>

            <div className="currentWeather__airPressure">

                <h2 className="currentWeather__airPressure_title">
                    Air Pressure
                </h2>

                <div className="currentWeather__airPressure_value">
                    <h3>{props.pressure_mb}</h3>
                    <h4>mb</h4>
                </div>


            </div>

            <footer>
                <h4>Created by</h4>
                <h2>JoregeSosa</h2>
                <h3>- devChallenges.io</h3>
            </footer>

        </div>
    )
}
export { TodayHightlights }
