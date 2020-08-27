import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import './App.css';

function App() {
   const [countries, setCountries] = useState([])

useEffect(() =>{

  const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
      const countires = data.map((country) => (
        {
          name: country.country,
          value: country.countryInfo.iso2
        }
      ));

      setCountries(countries);
    });
  };
},[]);
  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select
          variant="outlined"
          value="abc"
          >
            {
              countires.map(country => (
              <MenuItem value={country}>{country}</MenuItem>
              ))
            }
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worlde</MenuItem> */}
          </Select>
        </FormControl>
      </div>

     

      {/* Header */}
      {/* Title */}

      {/* Info Boxes */}
      {/* Info */}
      {/* Info */}

      {/* Table */}
      {/* Graph */}
      
      {/* Map */}
    </div>
  );
}

export default App;
