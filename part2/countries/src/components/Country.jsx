import { useState, useEffect } from "react";
import axios from 'axios'

const Country =({country})=>{
    const [temperature, setTemperature]=useState(0)
    const [wind, setWind] = useState(0)
    const [icon, setIcon] = useState(0)
    const [isResponse, setIsResponse] = useState(true)
    const languageValuesArray = Object.values(country.languages);
    const api_key = import.meta.env.VITE_SOME_KEY
    
    useEffect(()=>{
        if (country.capital){
             axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
                .then(response =>{
                    setTemperature(response.data.main.temp)  
                    setWind(response.data.wind.speed) 
                    setIcon(response.data.weather[0].icon)
                    setIsResponse(true)
                })
                .catch(error=>{ // Tokelau (Fakaofo)
                    console.log("No weather data for this capital");
                    setIsResponse(false)
                })
            } else{
                axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=${api_key}&units=metric`)// Macau
                .then(response =>{
                    setTemperature(response.data.main.temp)  
                    setWind(response.data.wind.speed) 
                    setIcon(response.data.weather[0].icon)
                    setIsResponse(true)
                })
                .catch(error=>{
                        console.log(error)
                        setIsResponse(false)
                      
                })}

    }, [country])
   
    return(
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <p>languages:</p>
            <ul>
                {languageValuesArray.map(language=><li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} width={200} alt={country.flags.alt}/>
            <h2>Weather in {country.capital? country.capital: country.name.common}</h2>
            { isResponse && <div>
                <p>temperature {temperature} Celcius</p>
                {icon && <img src={`http://openweathermap.org/img/w/${icon}.png`}/>}
                <p>wind {wind} m/s</p>
            </div>}
            {!isResponse && <div>
                Data is not found
            </div>}    
        </div>
    )

}

export default Country