import * as React from 'react';
import axios from "axios";
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Grid2 from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
//------------
import "./../../components/PostComponentsMui/PostCardScroll.css";

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));


const ReaderHome = ()=>{

    useEffect(()=>{

      axios.get("http://127.0.0.1:5000/admin/getAllUsers")
      .then(res=>{
        console.log("!!££££££",res.data)
      })
    })

   

    return(
        <>
        <CssBaseline />
        <div style={{marginTop:"20px",display:"flex",width:"73%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}>
          {/* <h2 style = {{color:"#379863"}}>IBlogs</h2> */}
          {/* <SearchBar/> */}
        </div>
        {/* <Divider variant="middle"/> */}
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 lg ={11} spacing={0} sx = {{minHeight:"90vh",marginTop:"50px",marginLeft:"30px"}}  >  
       {/* ----------------------------------------------------------------------------------- */}
       {/* <Posts  posts = {posts}/> */}
       <Grid2 container  spacing= {3} sx = {{p:3}} >
        <Grid2 xs={12} md={6} lg={6}>
        <Paper sx = {{height:"70px"}}>
          <Grid2 container>
            <Grid2  container  sx={{margin:"auto"}} flexDirection="row" alignItems = "center" justifyContent={"space-around"}   >
              <Grid2>
                <PeopleAltIcon/>
              </Grid2>
              <Grid2>
              <h2 style={{margin:"0px",padding:"0px"}}>Total Users</h2>
            
              </Grid2>
              <Grid2>
            <h2 style={{margin:"0px",padding:"0px"}}></h2>
            </Grid2>    
            </Grid2>
            
          </Grid2>
          
        </Paper>
        </Grid2>
        <Grid2 xs={12} md={6} lg={6}>
        <Paper sx = {{height:"70px"}}>
          <Grid2 container>
            <Grid2  container  sx={{margin:"auto"}} flexDirection="row" alignItems = "center" justifyContent={"space-around"}   >
              <Grid2>
                <PeopleAltIcon/>
              </Grid2>
              <Grid2>
              <h2 style={{margin:"0px",padding:"0px"}}>Total Blogs</h2>
            
              </Grid2>
              <Grid2>
            <h2 style={{margin:"0px",padding:"0px"}}>10</h2>
            </Grid2>    
            </Grid2>
            
          </Grid2>
          
        </Paper>
        </Grid2>
       </Grid2>
       
       
       
     
        {/* ---------------------------------------------------------------- */}
        </Grid2>
        {/* <Divider orientation='vertical' sx={{width:"29px"}} flexItem/> */}
        {/* <Grid2 className="sideScroll" xs={12} md={5} lg={3.3 }   sx = {{ position:"fixed",bottom:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"20px"} }     >
       
        {/* <Divider /> */}
        {/* <h4 style={{color:"#379683"}} > Recommended Topics</h4> */}
        {/* <RecommendedChips/> */}
        {/* <div> */}
        {/* <h4 style={{color:"#379683"}}>Trending Posts</h4> */}
          {/* <TrendPostCard/> */}
          {/* <TrendPostCard/> */}
          {/* <TrendPostCard/> */}
          {/* <TrendPostCard/> */}
          {/* <TrendPostCard/> */}
          {/* </div> */}
       

        {/* </Grid2> */} 
      </Grid2>

        </>
    )
}
export default ReaderHome