import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ city }) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.OW_API_KEY;
    console.log(api_key)
    useEffect(() => {
        if (!weather) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
                .then(response => {
                    console.log(response.data);
                    setWeather(response.data)
                })
        }

    }, [weather])

    return (
        <div>
            <h3>Weather in {city}</h3>
            <p>Temperature: {weather?.main?.temp} Celcius</p>
            <img alt="weather icon" src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`} />
            <p>Wind: {weather?.wind?.speed} m/s </p>
        </div>
    )
}


export default Weather;