import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import SearchCountry from './components/SearchCountry'
import DisplayCountry from './components/DisplayCountry'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [chooseCountry, setchooseCountry] = useState('')
  const [showMode, setShowMode] = useState(false)

  // Crawl data from Json first
  useEffect(() => {
     axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
  },[])

  // Search => Info dissapear
  useEffect(() => {
    setShowMode(false)
    setchooseCountry('')
  },[searchCountry])
  
  // Handle when typing search country
  const handleSearch = (event) => {
    setSearchCountry(event.target.value)
  }
  
  const filtered = allCountries.filter(c => c.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
  
  const handleClick = (country) => {
      setchooseCountry(country)
      setShowMode(true)
  }

  const filtered_choose = allCountries.filter(c => c.name.common === chooseCountry)

  return (
    <div>
      <div>
        Find Countries <SearchCountry onChange = {handleSearch} value={searchCountry} />
      </div>

      {showMode && filtered_choose.length > 0 && (
        <DisplayCountry country={filtered_choose[0].name.common} area ={filtered_choose[0].area} capital={filtered_choose[0].capital[0]} languages={filtered_choose[0].languages} src = {filtered_choose[0].flags.png}/>
      )}

      {!showMode && searchCountry !== '' && (
        <>
          {filtered.length > 10 ? (
            <h2>Too many matches, specify another filter</h2>
          ) : filtered.length === 1 ? (
            <DisplayCountry country={filtered[0].name.common} area ={filtered[0].area} capital={filtered[0].capital[0]} languages={filtered[0].languages} src = {filtered[0].flags.png}/>
          ) : (
            filtered.map(country => (
            <div key = {country.ccn3}>
               {country.name.common}
               <button onClick = {() => handleClick(country.name.common)}>Show</button>
            </div>
          ))
          )}
        </>
      )}
    </div>
  )
}

export default App
