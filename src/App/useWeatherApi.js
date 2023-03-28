import { useEffect, useState } from "react";
import { FetchData } from "./Fetching";

const fetchData = new FetchData();

function useWeatherApp() {

    const [currentWeather, setCurrentWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    // change date format
    const dateFormat = (date) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        const day = new Date(date);
        return day.toLocaleDateString("en-gb", options);
    }

    // obtner icono
    const extractIcon = (text) => {

        const icon = Number(text.substr(-7, 4));
        if ([185, 263, 266, 281, 296, 302].includes(icon)) {
            return 'icons/weather/rainCloud.png'
        }
        if ([200, 386].includes(icon)) {
            return 'icons/weather/sunCloudThunder.png'
        }
        if ([284, 308, 311, 314].includes(icon)) {
            return 'icons/weather/heavyRainCloud.png'
        }
        if ([284, 308, 311, 314].includes(icon)) {
            return 'icons/weather/heavyRainCloud.png'
        }
        if ([317, 320].includes(icon)) {
            return 'icons/weather/snowRainCloud.png'
        }
        if ([326, 332].includes(icon)) {
            return 'icons/weather/snowCloud.png'
        }
        if ([335, 338, 350].includes(icon)) {
            return 'icons/weather/heavySnowCloud.png'
        }
        if ([374, 377].includes(icon)) {
            return 'icons/weather/sunPalletsCloud.png'
        }
        if ([176, 293, 299, 305, 353, 356, 359].includes(icon)) {
            return 'icons/weather/sunRainCloud.png'
        }
        if ([179, 323, 329, 368, 371].includes(icon)) {
            return 'icons/weather/sunSnowCloud.png'
        }
        if ([182, 362, 365].includes(icon)) {
            return 'icons/weather/sunRainSnowCloud.png'
        }

        return `icons/weather/${icon}.png`

    }

    useEffect(() => {
        (async () => {

            try {

                const response = await fetchData.getData();
                console.log(response);
                // Creating an Array Current Weather 
                const newCurrentWeather = {
                    temp_f: Math.round(response.current.temp_f),
                    temp_c: Math.round(response.current.temp_c),
                    condition: response.current.condition.text,
                    icon: extractIcon(response.current.condition.icon),
                    pressure_mb: response.current.pressure_mb,
                    vis_miles: response.current.vis_miles,
                    humidity: response.current.humidity,
                    wind_mph: response.current.wind_mph,
                    location: response.location.name,
                    wind_dir: response.current.wind_dir,
                    date: dateFormat(Date()),
                }
                setCurrentWeather(newCurrentWeather);


                // weather forecast Array
                const weatherForecast = [...response.forecast.forecastday];
                const newweatherForecast = [];
                for (let i = 2; i < weatherForecast.length; i++) {

                    newweatherForecast.push({
                        date: dateFormat(weatherForecast[i].date),
                        condition: weatherForecast[i].day.condition.text,
                        icon: extractIcon(weatherForecast[i].day.condition.icon),
                        mintemp_c: Math.round(weatherForecast[i].day.mintemp_c) + '°C',
                        mintemp_f: Math.round(weatherForecast[i].day.mintemp_f) + '°f',
                        maxtemp_c: Math.round(weatherForecast[i].day.maxtemp_c) + '°C',
                        maxtemp_f: Math.round(weatherForecast[i].day.maxtemp_f) + '°f'
                    })

                    setForecast(newweatherForecast);

                }

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }

        })();

    }, [])


    return {
        currentWeather,
        forecast,
        error,
        loading

    }

}
export { useWeatherApp };
