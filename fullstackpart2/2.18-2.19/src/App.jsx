import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import SearchCountry from './components/SearchCountry'
import DisplayCountry from './components/DisplayCountry'

const App = () => {
    const [search, useSearch] = useState('')
    const [showsearchresult, useShowsearchresult] = useState(false)
    const [showfinalresult, useShowfinalresult] = useState(false)
    const [allcountries, useAllcountries] = useState([])
    const [finalcountry, useFinalcountry] = useState('')

    // First time extract all value from the API page
    useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          useAllcountries(response.data)
          //console.log(response.data)
    })  
        .catch(error => console.log(error.message))
    },[])
    // When typing or not click on Show just save it as false
    useEffect(() => {
        useShowsearchresult(false)
    }
    ,[search])




    // Display the value when searching
    const handleSearchCountry = (event) => {
        useSearch(event.target.value)
        useShowsearchresult(false)
        useShowfinalresult(false)
    }
    
    // Handle display search result 
    const handleshowResult = () => {
        useShowsearchresult(true)
    }
    
    const handleshow1Country = (country) => {
        useShowfinalresult(true)
        useFinalcountry(country)
        useShowsearchresult(false)
    }



    const show_possible_result = allcountries.filter(data => data.name.common.toLowerCase().includes(search.toLowerCase()))
    const filtered1 = allcountries.filter(data => data.name.common === finalcountry)




    return(
    <>
      <>
        <SearchCountry onChange = {handleSearchCountry} value = {search}> </SearchCountry>
        <button onClick = {handleshowResult}>Show</button>
      </>

      <>
      {
        showsearchresult && (
          show_possible_result.length > 10 ? <h2>Please enter more letter</h2> :
          show_possible_result.length === 0 ? <h2>No result found</h2> :
          show_possible_result.map(data =>(
            <div key = {data.ccn3}>
                <li key = {data.ccn3}>{data.name.common}</li> 
                <button onClick = {() => handleshow1Country(data.name.common)}>Show</button>
            </div>
          )
          )
        )
      }
      </>

      <>
      {
        showfinalresult &&
          <DisplayCountry
            country = {filtered1[0].name.common}
            area = {filtered1[0].area}
            capital = {filtered1[0].capital[0]}
            languages = {filtered1[0].languages}
            src = {filtered1[0].flags.png}>
          </DisplayCountry>
      }
      </>
    </>
    )
  }
export default App
