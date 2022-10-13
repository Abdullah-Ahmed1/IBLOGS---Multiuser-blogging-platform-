import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
const Notifications =()=>{
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
        {/* <h2 style={{color:"#05386b"}}>Weekly Report</h2>
        <Paper sx = {{padding:"15px"}}>
       yReportsItems/> */}
        </div> 
       <h3>Notifications will be shown here</h3>
       
     
        {/* ---------------------------------------------------------------- */}
        </Grid2>
      
      </Grid2>

        </>

    )
}
export default Notifications