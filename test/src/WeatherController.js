import React, {useEffect, useState} from 'react';
import Output from "./Output";
import {variables} from './Variables.js';

const WeatherController =()=>{

    const [weather, setWeather] = useState([]);

    async function fetchData() {
         await fetch(variables.API_URL + 'WeatherForecast')
            .then(response => response.json())
            .then(data => setWeather(data))
    }
    useEffect(() => {
        fetchData();
    }, []);

    console.log(weather)

    const weatherInfo = weather.map(we => <Output info1={we.date}
                                                  info2={we.temperatureC}
                                                  info3={we.temperatureF}
                                                  info4={we.summary}
    />);

    return(
        <div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Data</th>
                            <th scope="col">TempC</th>
                            <th scope="col">TempF</th>
                            <th scope="col">Summary</th>
                        </tr>
                    </thead>
                    {weatherInfo}
                </table>
            </div>
        </div>
    )
}

export default WeatherController;
