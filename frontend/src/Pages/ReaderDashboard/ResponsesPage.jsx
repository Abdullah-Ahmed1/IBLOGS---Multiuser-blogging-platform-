// import Box from '@mui/material/Box';
// import Grid from "@mui/material/Grid";
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import lottie from 'lottie-web';
import RecommendedChips from './../../components/PostComponentsMui/RecommendChips';
// import TrendPostCard from './../../components/PostComponentsMui/TrendPostCard';
// import ResponseTabs from './../../components/ReaderDashComponents/ResponseTabs';
import NotificationBar from './../../components/ReaderDashComponents/NotificationBar';
import { useEffect,useState,useRef } from 'react';
import axios from 'axios';

const ResponsesPage = ()=>{
  const container = useRef(null)
    const [test,setTest] = useState(null)
  const [notifications,setNotifications]  =useState(null)
  useEffect(()=>{
      
    lottie.loadAnimation({
      container : container.current,
      renderer: 'svg',
      loop:true,
      autoplay:true,
      animationData:require('../../lottie/notifications.json')

    })
    
  },[test])
  useEffect(()=>{
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
    axios.get("http://127.0.0.1:5000/readerDashboard/get-reader-notifications",{
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization": token 
      }
    }).then(res=>{
     // console.log(res.data)
      setNotifications(res.data)
    })
  },[])
    return(
        <>
        <CssBaseline />
        <div style={{marginLeft :"20px", marginTop:"10px",display:"flex",width:"73%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}>
          <h2 style = {{color:"#379863"}}>IBlogs</h2>
         
        </div>
        {/* <Divider variant="middle"/> */}
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 xs={12} md={5} lg={7} spacing={0} sx = {{height:"100vh",marginTop:"20px",marginLeft:"30px"}}  >  
       {/* ----------------------------------------------------------------------------------- */}
       {/* <Posts  posts = {posts}/> */}
       <Grid2 container direction = {"row"} justifyContent="space-between" alignItems={"center"}>
            <Grid2>
            <h2 style={{color:"#379683"}}>Notifications</h2>
            </Grid2>
            <Grid2>
            <div className='container' ref={container} style={{width:"80px"}}  ></div>
        
            </Grid2>
        </Grid2>
      
       {/* <ResponseTabs/> */}
      
        {/* <NotificationBar/>
        <NotificationBar/>
        <NotificationBar/> */}
           {
        notifications !== null ? (
          notifications.length > 0 ?  (
            notifications.map(notification =>{
              return <NotificationBar notification={notification} key={notification._id}  />
            })
          ):(
            <h2>no notifications yet </h2>
          )
        ):(
          null
        )
       }
        {/* ---------------------------------------------------------------- */}
        </Grid2>
        <Divider orientation='vertical' sx={{width:"29px"}} flexItem/>
        <Grid2 className="sideScroll" xs={12} md={5} lg={3.3 }   sx = {{ position:"fixed",bottom:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"20px"} }     >
       
        {/* <Divider /> */}
        <h4 style={{color:"#379683"}} > Recommended Topics</h4>
        <RecommendedChips/>
        <div>
        <h4 style={{color:"#379683"}}>Trending Posts</h4>
         
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
        {/* */} 

        </Grid2>
      </Grid2>

        </>
    )
}
export default ResponsesPage