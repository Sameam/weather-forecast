import React from 'react'
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";


const Chart = ({data}) => {
  return (
      <Line
          data={data}
          options={{
            title:{
              display:true,
              title:"Weather Temperature",
              fontSize:20
            },
            legend:{
              display:true,
              position:'center'
            },
            
          }}
      />
  )
}





export default Chart