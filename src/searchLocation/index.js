import React, { useState } from "react";
import './searchLocation.css';

function SearchLocation(props) {
  const [searchLocationVal, setSearchLocationVal] = useState('');

  const onChangeSearchLocation = (event) => {
    setSearchLocationVal(event.target.value);
  }
  const onClickSearchLocation = () => {
    props.searchLocation(searchLocationVal);
  }

  return (
    <section className="searchLocation_container">

      <nav className="searchLocation_nav">
        <div className="searchLocation_input">

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

        <button 
        type="button" 
        className="searchLocation_button"
        onClick={onClickSearchLocation}>

          Search

        </button>
      </nav>



      <ul className="citiesList_container">

        {props.children}

      </ul>

    </section>
  )

}
export { SearchLocation };