import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'


function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState ([])
  const [quantity, setQuantity] = useState(0)
  const [country, setCountry] = useState ('')

  const handleChange = (event)=>{
    setFilter(event.target.value)
  }

  useEffect(()=>{
    if (filter) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const countryNames = response.data.map(data=> data.name.common)
          const filteredNames = countryNames.filter(name=>name.toLowerCase().includes(filter.toLowerCase()))
          setQuantity(filteredNames.length)
          if(filteredNames.length <=10 && filteredNames.length>1){
            setCountries(filteredNames)
            setCountry('')
          } else if(filteredNames.length===1){
            axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredNames[0]}`)
            .then(response =>{
              setCountry(response.data)
            })
          }

        })
    }

  },[filter])

  const detailsHandler=(name)=>{
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    .then(response =>{
      setCountry(response.data)
    })
  }

 
  return (
      <div>
        <div>
        find countries: <input
        type='text'
        value={filter}
        onChange={handleChange} 
        />
        </div>
        {quantity>10 && <h2>Too many matches, specify another filter</h2>}
        {countries && quantity>1 && quantity<=10 && <Countries countries={countries} showDetailsHandler={detailsHandler} countryDetails={country}/>}
        {(country && quantity===1)? <Country country={country}/>:null }
      </div>
  )
}

export default App
