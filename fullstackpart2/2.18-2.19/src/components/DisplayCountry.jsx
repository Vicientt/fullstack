const DisplayCountry = ({country, area, capital, languages, src}) => {
    return(
    <div>
        <h1>{country}</h1>
        {console.log(country)}
        <p>Capital: {capital}</p>
        {console.log(capital)}
        <p>Area: {area}</p>
        {console.log(area)}
        <h2>Languages</h2>
        <ul>
            {Object.values(languages).map(value => <div key={value}>{value}</div>)}
        </ul>
        {console.log(languages)}
        <img src = {src} width='200px' />
    </div>
    )
}

export default DisplayCountry