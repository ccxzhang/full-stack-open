import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/filter';
import Display from './components/display';



function App() {
  const [filter, setFilter] = useState("")
  const [result, setResult] = useState([])

  useEffect(() => {
    if (filter) {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then(response => {
          const countryData = response.data;
          const filteredData = countryData.filter(country => country.name?.common.toLowerCase().includes(filter.toLowerCase()));
          setResult(filteredData);
        })
    }
  }, [filter])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter text={"find countries"} value={filter} onChange={handleFilter} />
      <Display result={result} />
    </div>
  )
}

export default App
