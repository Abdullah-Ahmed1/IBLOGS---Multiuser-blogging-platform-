import { Line } from 'react-chartjs-2';
import {useState} from 'react';
import Paper from '@mui/material/Paper';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

const UserLineChart = ()=>{
    const [data, setData]= useState({
        labels:["Jan","Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
        datasets:[
          {
            label:"Users",
            data:[1,2,3,4,4,4,4,4,3,4,4,4],
            backgroundColor:'#05386b',
            borderColor:'#05386b',
            tension:0.4,
            fill:false,
            pointStyle:'rect',
            pointBorderColor:'#5cdb95',
            pointBackgroundColor:'#5cdb95',
            showLine:true
          }
        ]
      })    
    return(
        <Paper sx = {{padding:"10px",borderRadius:"5px",backgroundColor:"white"}}>
              <h3 style={{color:"#05386b"}}>Users Analysis</h3>
              <Line data={data}>Hello</Line>
        </Paper>
    )
}
export default  UserLineChart