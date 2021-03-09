import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
const api_key = process.env.REACT_APP_API_KEY
const Country = (props) =>{
  const goToCountry=(event)=>{
    event.preventDefault()
    props.setNewChange(props.country.name)
  }
  return(
      <form onSubmit={goToCountry}>
        <span>
          {props.country.name}
          <button type="submit">show</button>
        </span>
      </form>

  )
}

const Countries = (props) =>{
  if(props.countries.length>10){
    return(
      <p>Too many matches, specify another filter </p>
    )
  }
  else if(props.countries.length===1){
    let data=""
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.countries[0].capital}`)
      .then(response=>{
        data=response.data
      })
    return(
      <div>
        <h1>{props.countries[0].name}</h1>
        <p>Capital: {props.countries[0].capital}</p>
        <p>Population: {props.countries[0].population}</p>
        <h2>languages</h2>
        <ul>
          {props.countries[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={props.countries[0].flag} alt='country flag' width='100' length='100'  />
        <h2>Weather in {props.countries[0].capital}</h2>
        <span>
        <b>temperature:</b> <p>{data.current.temperature} Celcius</p> 
        </span>
        <div>
          <img src={data.current.weather_icons[0]} alt='weather icon' width='100' length='100'/>
        </div>
        <span>
        <b>wind:</b> <p>{data.current.wind_speed}</p>
        </span>
        
        
      </div>

    )
  }
  return(
    props.countries.map(country => <Country key={country.name} country={country} setNewChange={props.setNewChange}/>)
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [newChange, setNewChange] = useState('')

  useEffect(() =>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        setCountries(response.data)
      })
  }, [])
  const handleSearchChange= (event) =>{
    setNewChange(event.target.value)
  }
  let selectedCountries = countries.filter(country => country.name.toLowerCase().includes(`${newChange}`.toLowerCase()))
  console.log(selectedCountries)
  return (
    <div>
      <form>
        find countries
        <input onChange={handleSearchChange}/>
      </form>
      <Countries countries={selectedCountries} setNewChange={setNewChange}/>
    </div>
  );
}

export default App;
