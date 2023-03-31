import { useEffect, useState } from "react";
import { FetchData } from "./Fetching";

const fetchData = new FetchData();
function useWeatherApp() {

    const [currentWeather, setCurrentWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [searchedLocation, setSearchedLocation] = useState([]);
    const [openNav, setOpenNav] = useState(false);
    const [changeTemp, setChangeTemp] = useState('°C');


    // change date format
    const dateFormat = (date) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        const day = new Date(date);
        return day.toLocaleDateString("en-gb", options);
    }
    // change Temperature
    const changeTempUnit = (temp_f) => {
        const temp_c = (temp_f - 32) * 0.5556;

        return temp_c;
    }
    // change win direction unit
    const windDireccion = (value) => {

        if (value < 22.5) {
            return 'N'
        }
        if (value >= 22.5 && value < 45) {
            return 'NNE'
        }
        if (value >= 45 && value < 67.5) {
            return 'NE'
        }
        if (value >= 67.5 && value < 90) {
            return 'ENE'
        }
        if (value >= 90 && value < 112.5) {
            return 'E'
        }
        if (value >= 112.5 && value < 135) {
            return 'ESE'
        }
        if (value >= 135 && value < 157.5) {
            return 'SE'
        }
        if (value >= 157.5 && value < 180) {
            return 'SSE'
        }
        if (value >= 180 && value < 202.5) {
            return 'S'
        }
        if (value >= 202.5 && value < 225) {
            return 'SSW'
        }
        if (value >= 225 && value < 247.5) {
            return 'SW'
        }
        if (value >= 247.5 && value < 270) {
            return 'WSW'
        }
        if (value >= 270 && value < 292.5) {
            return 'W'
        }
        if (value >= 292.5 && value < 315) {
            return 'WNW'
        }
        if (value >= 315 && value < 337.5) {
            return 'NW'
        }
        if (value > 337.5) {
            return 'NNW'
        }


    }
    // Make Location (Cities) List
    const getLocationInfo = async (url) => {

        try {
            const searchResults = await fetchData.getData(url);

            const searchedLocations = Array.isArray(searchResults) ? searchResults : [searchResults];

            const newSearchedLocations = [];

            for (let i = 0; i < searchedLocations.length; i++) {
                newSearchedLocations.push(
                    {
                        key: searchedLocations[i].Key,
                        city: searchedLocations[i].LocalizedName,
                        country: searchedLocations[i].Country.ID
                    }
                )

            }

            if (Array.isArray(searchResults)) {
                setSearchedLocation(newSearchedLocations);
            } else {
                return newSearchedLocations;
            }

        } catch (error) {
            setError(error);
        }


    }
    // get data & create Forecast Array
    const getWeatherData = async (locationName) => {
        try {
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}/next6days?unitGroup=us&key=Q2ANF9YAZURFRRTLS85QB5LXJ`;

            const researchResults = await fetchData.getData(url);

            // create Forecast Array
            const newweatherForecast = [];
            for (let i = 2; i < researchResults.days.length; i++) {

                newweatherForecast.push({
                    date: dateFormat(researchResults.days[i].datetime),
                    condition: researchResults.days[i].conditions,
                    icon: 'icons/weather/' + researchResults.days[i].icon + '.png',
                    mintemp_c: Math.round(changeTempUnit(researchResults.days[i].tempmin)) + '°C',
                    maxtemp_c: Math.round(changeTempUnit(researchResults.days[i].tempmax)) + '°C',
                    mintemp_f: Math.round(researchResults.days[i].tempmin) + '°f',
                    maxtemp_f: Math.round(researchResults.days[i].tempmax) + '°f'
                })
            }
            setForecast(newweatherForecast);

            // create CurrentWeather Array
            const location = (text) => {
                const textArr = text.split(',');
                return (
                    textArr.length > 1 ?
                        textArr[0].trim() + '\n' + textArr[textArr.length - 1].trim() :
                        text
                );
            }

            const newCurrentWeather = {
                temp_f: Math.round(researchResults.currentConditions.temp),
                temp_c: Math.round(changeTempUnit(researchResults.currentConditions.temp)),
                condition: researchResults.currentConditions.conditions,
                icon: 'icons/weather/' + researchResults.currentConditions.icon + '.png',
                pressure_mb: researchResults.currentConditions.pressure,
                vis_miles: researchResults.currentConditions.visibility,
                humidity: researchResults.currentConditions.humidity,
                wind_mph: researchResults.currentConditions.windspeed,
                location: location(researchResults.resolvedAddress),
                wind_dir: windDireccion(researchResults.currentConditions.winddir),
                date: dateFormat(Date()),
            }

            setCurrentWeather(newCurrentWeather);
            setOpenNav(false);

        } catch (error) {

            setError(error);

        }

    }
    // get Coordinates from geoLocation Api
    function getCoordinates() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
    // get weather from consulting Latitude an Longitude
    const getWeatherByGeoLocation = () => {
        try {
            getCoordinates().then((position) => {
                return position.coords.latitude + ',' + position.coords.longitude;
            })
                .then((geoCordinates) => {
                    const locationUrl = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=YgPYWjsPMRNWaSXDVPH6KqifZVdRLVH9&q=' + geoCordinates;

                    return locationUrl;
                })
                .then((url) => {
                    return getLocationInfo(url);
                })
                .then((res) => {
                    const locationName = res[0].city + ',' + res[0].country;
                    getWeatherData(locationName);
                })

        } catch (error) {
            setError(error);
        }

    }

    useEffect(() => {
        try {
            fetchData.getData('https://ipinfo.io/json?token=758fd0d3d30b79')
                .then((locationInfo) => {
                    const locationName = locationInfo.city + ',' + locationInfo.country;
                    
                    getWeatherData(locationName);
                })
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }


    }, [])

    return {
        currentWeather,
        forecast,
        error,
        loading,
        searchedLocation,
        getLocationInfo,
        openNav,
        setOpenNav,
        changeTemp,
        setChangeTemp,
        getWeatherData,
        getWeatherByGeoLocation

    }

}
export { useWeatherApp };
