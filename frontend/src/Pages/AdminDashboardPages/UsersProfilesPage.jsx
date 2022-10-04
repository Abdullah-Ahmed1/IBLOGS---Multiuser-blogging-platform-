import * as React from 'react';
import axios from "axios"
import { useState,useEffect } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import "./../../components/PostComponentsMui/PostCardScroll.css";
import UsersCard from '../../components/AdminDashComps/UsersCard';


const UsersProfilePage = ({userData,handleUserDelete})=>{
    return(
        <>
        <CssBaseline />
        <div style={{marginTop:"20px",display:"flex",width:"73%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}>
          {/* <h2 style = {{color:"#379863"}}>IBlogs</h2> */}
          {/* <SearchBar/> */}
        </div>
        {/* <Divider variant="middle"/> */}
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2  lg ={11} spacing={0} sx = {{minHeight:"90vh",marginTop:"50px",marginLeft:"30px"}}  >  
       {/* ----------------------------------------------------------------------------------- */}
       <h2 style = {{color:"#379863"}}  >All Users</h2>
       
       <Grid2 container direction="row" spacing={2} sx = {{margin:"0px",padding:"0px"}} >
       {
        userData ? (
            userData.length > 0 ? (
                
                    userData.map(item=>{
                      return (
                        <Grid2  lg = {2.4  } sx = {{padding:0}} key={item._id}>
                            <UsersCard  key={item._id}  item = {item}  handleUserDelete={handleUserDelete} />
                        </Grid2>
                      ) 
                    })
                
            ):(
                <h3>No users so far</h3>
            )
        ):(
            <CircularProgress  sx = {{color:"green"}}/>
        )
       }
       </Grid2>
       {/* <Posts  posts = {posts}/> */}
    
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
export default UsersProfilePage;