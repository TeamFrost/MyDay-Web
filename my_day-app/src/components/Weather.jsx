import React from 'react';
import ReactWeather from 'react-open-weather';


export default function Weather() {
    return (
        <div>
       
        
        <ReactWeather 
            forecast="today"
            apikey="6d4f585ebf38037802b8d1f39e7bd1ad"
            type="city"
            city="Timisoara"
        />
        </div>
    );
}