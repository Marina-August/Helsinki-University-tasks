import Country from "./Country"

const Countries = ({countries, showDetailsHandler, countryDetails}) =>{
    return(
        <div>
            {countries.map(country=>
                <div key={country}>
                    <div className="countries">
                        <h3 >{country}</h3>
                        <button onClick={()=>showDetailsHandler(country)}>show</button>     
                    </div>

                    {countryDetails && countryDetails.name.common === country && <Country country={countryDetails}/>}
                </div>
                )
            }
        </div>
    )
    
}

export default Countries