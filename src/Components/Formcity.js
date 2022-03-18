import React, {useState, useEffect} from 'react';
import {
  Form, 
  Button, 
  Loading, 
  Select, SelectItem
} from "carbon-components-react";
import Data from './Variable';
import Chart from './Chart';
import { timeDay } from 'd3';




const Formcity = () => {

  const api = "http://api.weatherapi.com/v1/forecast.json?key=c717ab506269416bab9231151220103&q="
  const param = "&days=3&aqi=no&alerts=no"

  const time_labels = []
  const [values, setValues] = useState("Sydney")
  const [weather, setWeather] = useState([])
  

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  useEffect(() => {
    search();
  }, []);



  const search = () => {
    const data = values
      fetch(`${api}${data}${param}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result.forecast.forecastday);
          console.log(label(weather)[0]);
          temp(weather);
        })
        
  }


  const label = (weather) => {
    return weather.map(function (item, index) {
      return item.hour.map(function (info, index) {
        return info.time
      })
    })
  }



  const humid = (weather) => {
    return weather.map(function (item, index) {
      return item.hour.map(function (info, index) {
        return info.humidity
      })
    })
  }

  const temp = (weather) => {
    return weather.map(function (item, index) {
      return item.hour.map(function (info, index) {
        return info.temp_c
      })
    })
  }

  

  const data_humid = {
    labels : label(weather)[0],
    datasets: [
      {
        label: 'Humidity',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: humid(weather)[0]
      }
    ]

  }

  const data_temperature = {
    labels : label(weather)[0],
    datasets: [
      {
        label: 'Temperature',
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 2,
        data: temp(weather)[0]
      }
    ]

  }

  const data_both = {
    labels : label(weather)[0],
    datasets: [
      {
        label: 'Humidity',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: humid(weather)[0]
      },
      {
        label: 'Temperature',
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 2,
        data: temp(weather)[0]
      }
    ]
  }


  

  return (
    <div className='text-black'>
        <div style={{margin:"20px", padding:"20px"}}>
          <Select
            defaultValue="placeholder-item"
            id="select-1"
            invalidText="This is an invalid error message."
            labelText="Select"
            style={{marginBottom:"5px"}}
            onChange={handleChange}
           >
            {Data.map((item,index) => {
              return (
                <SelectItem
                  key={index}
                  text={item.city}
                  value={item.city}
                />
              )
              })}
          </Select> 
          <Button
          kind="primary"
          onClick = {search}
          >
          Weather
          </Button> 
        </div>
        <div className="card-group">
        {weather.map((item,index) => {
          return (
            <div className="col-md-4 lead mb-3 d-flex align-items-stretch" style={{float:"left"}}>
            <div className="card mb-2" style={{width:"18rem",margin:"20px", padding:"20px", color:"black"}} key={index}>
              <img className="card-img-top" src={item.day.condition.icon} alt="Card cap" />
              <div className="card-body">
              <h5 className="card-title">Date: {item.date}</h5>
              <p className="card-text">Weather: {item.day.condition.text}</p>
              <p className="card-text">Min_Temperature: {item.day.mintemp_c}</p>
              <p className="card-text">Max_Temperature: {item.day.maxtemp_c}</p>
              <p className="card-text">Humidity: {item.day.avghumidity}</p>
            </div>
            </div>
        </div>
          )
        })}
        </div>
          <div style={{width: 900, marginLeft:"auto",marginRight:"auto"}} >
            
            <Chart data={data_humid} />
            
            <Chart data={data_temperature} />
            <Chart data={data_both} />
          </div>
        
    </div>
  )
}
 
export default Formcity