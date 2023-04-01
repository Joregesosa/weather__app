import React from "react";
import './WeatherNav.css';

function WeatherNav(props) {
    const [searchLocationVal, setSearchLocationVal] = React.useState('');

    const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=YgPYWjsPMRNWaSXDVPH6KqifZVdRLVH9&q=${searchLocationVal}`

    const onChangeSearchLocation = (event) => {

        setSearchLocationVal(event.target.value);

    }
    return (

        <nav className="Weather__nav">

            <button className="weather__nav_buttonClose"
                onClick={() => { props.setOpenNav(false) }}>
                X
            </button>

            <div className="weather__nav_inputConatiner">

                <span className="material-symbols-outlined">
                    search
                </span>

                <input
                    type="text"
                    placeholder="search location"
                    value={searchLocationVal}
                    onChange={onChangeSearchLocation}
                />

            </div>

            <button className="weather__nav_buttonSearch"
                onClick={() => props.getLocationInfo(url)}>

                Search

            </button>

        </nav>
    )
}
export { WeatherNav };