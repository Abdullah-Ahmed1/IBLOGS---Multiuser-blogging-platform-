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
import Searching from '../../components/ReaderDashComponents/Searching';
import TrendPostCard from './../../components/PostComponentsMui/TrendPostCard';
import { CircularProgress } from '@mui/material';


const ResponsesPage = ()=>{
  const container = useRef(null)
  const container1 = useRef(null)
    const [test,setTest] = useState(null)
    const [trendingPosts,setTrendingPosts] = useState(null)
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
      
    lottie.loadAnimation({
      container : container.current,
      renderer: 'svg',
      loop:true,
      autoplay:true,
      animationData:require('../../lottie/noNotifications.json')

    })
    
  },[])
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

  useEffect(()=>{
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
    axios.get('http://127.0.0.1:5000/readerDashboard',{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    })
    .then(res =>{
      console.log("res--------",res.data    ) 

      res.data.sort((a,b)=>{
        if(a.likes.length> b.likes.length) return 1;
        if(a.likes.length< b.likes.length) return -1;
        return 0 ;
      })
      setTrendingPosts(res.data)
    }).catch(err=> console.log(err))
  
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
        <h4 style={{color:"#5cdb95"}} > Search</h4>
        <Searching borderColor={'#5cdb95'}  width={'355px'} height={'500px'} />
        <div>
        <h4 style={{color:"#5cdb95"}}>Trending Posts</h4>
        {
            trendingPosts !== null? (
              trendingPosts.length > 0?(
                trendingPosts.map(item=>{
                  return (
                    <TrendPostCard  key={item._id}  item = {item}/>
                  )
                })
              ):(
                <h4>No trending right now</h4>
              )
            ):(
              <CircularProgress/>
            )
          }
          </div>
        
        {/* */} 

        </Grid2>
      </Grid2>

        </>
    )
}
export default ResponsesPage