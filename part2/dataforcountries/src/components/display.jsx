import { useState } from 'react';
import Weather from './weather';

const CountryResultDisplay = ({ country }) => (
    <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country?.capital}</p>
        <p>Area: {country?.area}</p>
        <h3>languages:</h3>
        <ul>
            {Object.keys(country.languages).map((key) => (<li key={key}>{country.languages[key]}</li>))}
        </ul>
        <div>
            <img src={country.flags.png} alt='flag' height='200' width='250' />
        </div>
        <div>
            <Weather city={country.capital} />
        </div>
    </div>

)

const MultipleCountryDisplay = ({ result }) => {
    const [select, setSelect] = useState(false)

    const handleSelect = () => {
        setSelect(!select)
    }
    return (
        <div>
            {result.name.common} <button onClick={handleSelect}>show</button>
            {select ? <CountryResultDisplay country={result} /> : null}
        </div>

    )
}


const Display = ({ result }) => {
    if (result.length >= 10) {
        return (
            <p>Too many matches, specify another filter.</p>
        )
    } else if (result.length > 1) {
        return (
            <div>
                {result.map((item, index) => <MultipleCountryDisplay key={index} result={item} />)}
            </div>
        )
    } else if (result.length == 1) {
        const resultData = result[0];
        return (
            <CountryResultDisplay country={resultData} />
        )
    } else {
        return;
    }
}

export default Display;