import { useEffect,useState } from 'react';
import axios from "axios";
import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import WeeklyReportsItems from './../../components/AdminDashComps/WeeklyReportItems';

const WeeklyReports = ()=>{
    const [reports,setReports] = useState(null)
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/readerDashboard/get-analysis")
        .then(res=>{
            console.log(res.data )
            setReports(res.data)

        })
    },[])
    return(
        <>
        <CssBaseline />
        {/* <div style={{marginTop:"20px",display:"flex",width:"73%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}> */}
          {/* <h2 style = {{color:"#379863"}}>IBlogs</h2> */}
          {/* <SearchBar/> */}
        {/* </div> */}
        {/* <Divider variant="middle"/> */}
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 lg ={11} spacing={0} sx = {{minHeight:"90vh",marginTop:"50px",marginLeft:"30px"}}  >  
       {/* ----------------------------------------------------------------------------------- */}
        <div style={{marginTop:"70px"}}>
        <Grid2 container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Grid2>
                <h2 style={{color:"#05386b"}}>Weekly Report</h2>
            </Grid2>
            <Grid2 >
            <Button sx = {{marginRight:"10px"}} variant="contained">Run Report</Button>
            <Button variant="contained">Email Recommendation</Button>
            </Grid2>
        </Grid2>   
        
        <Paper sx = {{padding:"15px"}}>
        <h3>Analysis Date : {reports ? reports[0].postAnalysis[0].analysisDate.slice(0,10): ""}</h3>
        {
            reports !== null? (
                reports.length  > 0 ? (
                    reports[0].postAnalysis.map(report=>{
                        return <WeeklyReportsItems   report={report} key={report._id}  />
                    })
                ):(
                    <h2>No data to Show</h2>
                )
             ):(
                <CircularProgress/>
            )
        }
        </Paper>
        {/* <WeeklyReportsItems/>
        <WeeklyReportsItems/>
        <WeeklyReportsItems/> */}
        </div>
       
       
     
        {/* ---------------------------------------------------------------- */}
        </Grid2>
      
      </Grid2>

        </>

    )
}
export default WeeklyReports
