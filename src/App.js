import React, {useState, useEffect } from 'react';

const api = {
    key: "024b2303bcc09ae85dba5a8f03eb9d55",
    base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
    const [searchInput, setSearchInput] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [weatherInfo, setWeatherInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
    const fetchWeatherData = async () =>{
        if(!searchCity) return;
        setLoading(true);
        // Process
        try {
            const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok){
                setWeatherInfo(data);
                setErrorMessage("");
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setLoading(false);
    };
    fetchWeatherData();
}, [searchCity]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchCity(searchInput);
    };


  return (
    <>
    <div className="taitle">Check The Weather Bro</div>
    <div className="container">
       
        <div class="img"></div>

        
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="🔎" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            <button>Search</button>
        </form>
        {loading ? (<div>Loading...</div>) : (
            <>
        {errorMessage ? (<div className="err" style={{color:"red"}}>{errorMessage}</div>) : 
        (
        <>
                {typeof weatherInfo.main != "undefined" ? (
                  <div className="succ">
                    <h1 className="city">
                    {weatherInfo.name}, {weatherInfo.sys.country}
                    </h1>
                    <h1 className="temp">{weatherInfo.main.temp}<span className="cel">°C</span></h1>
                    
                    <div className="status">
                      {weatherInfo.weather[0].main}
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`}
                      alt=""
                      className="icon"
                    />
                    </div>
                    <div className="humidity">
                    <span>Humidity:</span>{weatherInfo.main.humidity}%
                    </div>
                    <div className="wind">
                      <span>Wind:</span> {weatherInfo.wind.speed} km/h
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
              )}  
            </>
        )}
        </div>
    </>
  );
}

export default App;