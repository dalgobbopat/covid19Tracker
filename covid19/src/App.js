import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from './InfoBox';
import Mapz from './Mapz';
import Table from './Table'
import { sortData } from './utils'
import LineGraph from './LineGraph'
import './App.css';
import "leaflet/dist/leaflet.css";

function App() {
   const [countries, setCountries] = useState([]);
   const [country, setCountry] = useState('worldwide');
   const [countryInfo, setCountryInfo] = useState({});
   const [tableData, setTableData] = useState([]);
   const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
   const [mapZoom, setMapZoom] = useState(3);
   
  useEffect(() =>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(res => res.json())
    .then((data) => {
      setCountryInfo(data);
    })
  }, [])

  useEffect(() =>{

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }
        ));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
    };

  getCountriesData();
},[]);

const onCountryChange = async (e) => {
  const countryCode = e.target.value;

  const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
  .then(res => res.json())
  .then((data) => {
    setCountry(countryCode);
    setCountryInfo(data);
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(4);
  })
}
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          {/* Title */}
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
            variant="outlined" onChange={onCountryChange}
            value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="stats">
          <InfoBox title="Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
          
          {/* Info Boxes */}
          {/* Info */}
          {/* Info */}
        </div>
        
        {/* Map */}
        <Mapz
        center = {mapCenter}
        zoom = {mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases</h3>
          {/* Table */}
          <Table countries={tableData}/>
          <h3>World Wide New Cases</h3>
          <LineGraph />
          {/* Graph */}
        </CardContent>
        
      </Card>
    </div>
     
  );
}

export default App;
