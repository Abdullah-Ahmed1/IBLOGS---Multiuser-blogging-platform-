import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import lottie from 'lottie-web';
import axios from 'axios';
import { useEffect,useRef } from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
//import SearchBar from "../../components/ReaderDashComponents/Searchbar"
//import TrendPostCard from '../../components/PostComponentsMui/TrendPostCard';
import LockIcon from '@mui/icons-material/Lock';
import RecommendedChips from '../../components/PostComponentsMui/RecommendChips';
//import { Grid } from '@mui/material/Grid';

const SavedList = ()=>{
  const container = useRef(null)
  const [lists,setLists] =useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    lottie.loadAnimation({
      container : container.current,
      renderer: 'svg',
      loop:false,
      autoplay:true,
      animationData:require('../../lottie/list.json')

    })
    
  },[])

  const handleDeleteList = (id)=>{
    console.log(id)
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
    axios.delete(`http://127.0.0.1:5000/readerDashboard/remove-custom-list/${id}`,{
      headers: {
        "Content-Type": "application/json", 
        Accept: "application/json",
        Authorization: token,
    },
    })
    .then(res=>{
      console.log("!!!",res.data)

      axios.get('http://127.0.0.1:5000/readerDashboard/get-customLists',{
      headers: {
        "Content-Type": "application/json", 
        Accept: "application/json",
        Authorization: token,
    },
    })
    .then(res=>{
      // console.log("---/---/",res.data)
      setLists(res.data)
     
    })  
    })
  }

  useEffect(()=>{
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;

    axios.get('http://127.0.0.1:5000/readerDashboard/get-customLists',{
      headers: {
        "Content-Type": "application/json", 
        Accept: "application/json",
        Authorization: token,
    },
    })
    .then(res=>{
      console.log("---/---/",res.data)
      setLists(res.data)
     
    })  
    
  },[])

    return(
        <>
        <CssBaseline />
        {/* <div style={{marginTop:"5px",display:"flex",width:"73%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}>
          <h2 style = {{color:"#5cdb95"}}>IBlogs</h2>
         
        </div> */}
        {/* <Divider variant="middle"/> */}
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 xs={12} md={5} lg={7} spacing={0} sx = {{height:"100vh",marginTop:"50px",marginLeft:"30px"}}  >  
       {/* ----------------------------------------------------------------------------------- */}
          <Grid2 container justifyContent={"space-between"}>
            <Grid2>
              <h2 style={{margin: 0 ,padding:0}} >Your Lists</h2>
            </Grid2>
            <Grid2>
              <Button sx = {{backgroundColor:"#05386b"}} variant='contained'> New List </Button>
            </Grid2>
          </Grid2>

          <Divider  sx = {{ margin: "50px 10px"}} variant="middle" />

          <Grid2>
          <Grid2 sx ={{backgroundColor:"white",marginBottom:"20px",padding:"10px",boxShadow:"0 4px 8px 0 rgba(92,219,149, 0.2), 0 6px 20px 0 rgba(92,219,149, 0.19)"}} >
          <Grid2 container  justifyContent={"space-between"}>
            <Grid2 container>
              <Grid2 sx = {{paddingLeft:"10px",paddingTop:"10px"}}>
              <h3 style={{padding:"0px",margin:"0px"}}  >Reading List {<LockIcon sx = {{fontSize:"20px",margin:"0px 10px"}} />}</h3>
              <h4>Posts: 5</h4>
              <Button onClick={()=>{ navigate("/readerdashboard/saved-lists/reading-list");}}  sx = {{color:"#05386b",borderColor:"#05386b"}}  variant="outlined">View list</Button>
              </Grid2>
            
            </Grid2>
            <Grid2>
            <div className='container' ref={container} style={{width:"150px"}}  ></div>
            </Grid2>
          </Grid2>
          <Grid2>

          </Grid2>

          </Grid2>
          {
            lists ?(
              lists.your_lists.map(list=>{
                return(
                  <Grid2  key={list._id}  sx ={{backgroundColor:"white",marginBottom:"20px",padding:"10px",boxShadow:"0 4px 8px 0 rgba(92,219,149, 0.2), 0 6px 20px 0 rgba(92,219,149, 0.19)"}} >
                  <Grid2 container  justifyContent={"space-between"}>
                    <Grid2 container>
                      <Grid2 sx = {{paddingLeft:"10px",paddingTop:"10px"}}>
                      <h3 style={{padding:"0px",margin:"0px"}}  >{list.listName}</h3>
                      <h4>Posts: 5</h4>
                      <Grid2 container  alignItems={"center"}>
                      <Button onClick={()=>{ navigate(`/readerdashboard/saved-lists/custom-list/${list._id}`);}}  sx = {{color:"#05386b",borderColor:"#05386b"}}  variant="outlined">View list</Button>
                      <DeleteIcon sx={{fontSize: "30px" ,cursor:"pointer"}} onClick={()=>handleDeleteList(list._id)}/>
                      </Grid2>
                      </Grid2>
                    
                    </Grid2>
                    <Grid2>
                    <div className='container' ref={container} style={{width:"150px"}}  ></div>
                    </Grid2>
                  </Grid2>
                  <Grid2>
        
                  </Grid2>
        
                  </Grid2>
                )
              })
            ):
            (
              null
            )
          }
         



          </Grid2>
        {/* ---------------------------------------------------------------- */}
        </Grid2>
        <Divider orientation='vertical' sx={{width:"29px"}} flexItem/>
        <Grid2 className="sideScroll" xs={12} md={5} lg={3.3 }   sx = {{ position:"fixed",bottom:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"20px"} }     >
       
        {/* <Divider /> */}
        <h4 style={{color:"#5cdb95"}} > Recommended Topics</h4>
        <RecommendedChips/>
        <div>
        <h4 style={{color:"#5cdb95"}}>Trending Posts</h4>
          {/* <TrendPostCard/>
          <TrendPostCard/>
          <TrendPostCard/>
          <TrendPostCard/>
          <TrendPostCard/> */}
          </div>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography> */}
        {/* <div  style={{backgroundColor:"green",maxWidth:"100px",overflowY: "auto"}} onScroll={onScroll}
        ref={listInnerRef} >Hello</div>

    
      */}

        </Grid2>
      </Grid2>

        </>
    )
}
export default SavedList;