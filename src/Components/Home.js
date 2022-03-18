import React from 'react'

import Formcity from './Formcity'



const Home = () => {
  return (
    <div>
      <h2 className='text-center' style={{padding:"10px"}}>Weather Forecast</h2>
      <div className="card-group text-black mainContainer">
        <Formcity />
      </div>  
   </div>
  )
}

export default Home