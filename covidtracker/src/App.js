import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TopCards from './TopCards';
import Map from './Map';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Table from './Table';
import {sortData,prettydata} from './sort';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
function App() {
  //use state es un arreglo, countries es la variable que almacena los paises.  
  const [countries, setCountries] = useState([]);
  const [country, setcountry] = useState(['worldwide']);
  const [countrydata, setcountrydata] = useState({});
  const [tableData, settableData] = useState([]);
  const [map, setmap] = useState({lat:34.80746, lng:-40.4796});
  const [zoom, setzoom] = useState(3);
  const [mapcountries, setmapcountries] = useState([]);
  const [casesType, setcasesType] = useState("cases");
  //Use Efect runs a piece of code based on a giving condition, also it loads data when loads the component []

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setcountrydata(data);
      })
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
            flag: country.countryInfo.flag
          }));
          setCountries(countries);
          const sortedData=sortData(data);
          settableData(sortedData);
          setmapcountries(data);
        });
    };
    getCountriesData();

  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log('country cleicked ', countryCode);
    setcountry(countryCode);

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`

     fetch(url)
      .then(response => response.json())
      .then(data => {
        setcountry(countryCode);
        setcountrydata(data);
        if(countryCode === "worldwide" ){
        console.log("ghitjh");
         
        }else{
          setmap([data.countryInfo.lat,data.countryInfo.long]);
          setzoom(4);
        }
       
      });

  };
  console.log(countrydata);
  return (
    <div className="app">
      <Header />
      <div className="app__container">
        <div className="app__info">

          <div className="app__top">
            <div className="app__headertwo">
              <h2> World Covid Cases updated every 10 minutes and more!</h2>
            </div>

            <FormControl className="app__formcontrol">
              <Select variant="outlined"
                value={country} onChange={onCountryChange}>
                <MenuItem value="worldwide">Worldwide <span className="worldemoji">🌎</span></MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name} <img className="selectimg" alt="" src={country.flag}></img></MenuItem>
                ))}

              </Select>
            </FormControl>
          </div>



          <div className="cards">

            <TopCards active={casesType==="cases"} onClick={(e)=>setcasesType("cases")} isred title="Covid Cases" cases={prettydata(countrydata.todayCases)} total={prettydata(countrydata.cases)}></TopCards>


            <TopCards active={casesType==="recovered"}  onClick={(e)=>setcasesType("recovered") } isgreen id="casesrecover" title="Covid Recovery" cases={prettydata(countrydata.todayRecovered)} total={prettydata(countrydata.recovered)}></TopCards>
            <TopCards active={casesType==="deaths"}  onClick={(e)=>setcasesType("deaths")} isred id="casesdeath" title="Covid Deaths" cases={prettydata(countrydata.todayDeaths)} total={prettydata(countrydata.deaths)}></TopCards>
          </div>
          <div className="mapcontainer">
            <Map casesType={casesType} countries={mapcountries} zoom={zoom} center={map}></Map>
          </div>
        </div>
        <div className="inforight">
          <Card>
            <CardContent>
              <h3>Live Total Cases by Country</h3>
              <Table countries={tableData} />
                <h3 className="wwnew">Worldwide new {casesType}</h3>
                  <LineGraph casesType={casesType}></LineGraph>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}

export default App;
