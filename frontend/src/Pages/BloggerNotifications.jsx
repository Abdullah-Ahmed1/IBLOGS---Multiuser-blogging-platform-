import Grid2 from '@mui/material/Unstable_Grid2';
import axios from "axios"
import BloggerNotificationBar from '../components/BlogComps/BloggerNotificationBar';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect,useRef,useState } from 'react';
import lottie from 'lottie-web';
//import BloggerNotificationBar from './../components/BlogComps/BloggerNotificationBar';
const BloggerNotification = ()=>{
    const container = useRef(null)
    const [test,setTest] = useState(null)
    const [notifications,setNotifications] = useState(null)
    const handleNotificationClick = (id)=>{
        console.log("clcickeddddddddddddddddddddddddddddddddd",id)
        console.log(notifications[0].seen)
       setNotifications( notifications.map(notification=>
        notification._id === id ? {...notification,seen : true   } : notification
               
        ))
    }
    useEffect(()=>{
      
        lottie.loadAnimation({
          container : container.current,
          renderer: 'svg',
          loop:true,
          autoplay:true,
          animationData:require('./../lottie/notifications.json')
    
        })
        
      },[test])
    useEffect(()=>{
        let value = JSON.parse(localStorage.getItem("token"));
        let token = value.token;
        axios.get("http://127.0.0.1:5000/bloggerDashboard/get-blogger-notifications",{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
        }).then(res=>{
            console.log(res.data)
            setNotifications(res.data)
        })
    },[])  
    return(
        <Grid2 sx = {{width:"100%"}} >
            <Grid2 container direction = {"row"}  justifyContent="space-between" alignItems={"center"}>
                <Grid2>
                <h2 style={{color:"#379683"}}>Notifications</h2>
                </Grid2>
                <Grid2>
                <div className='container' ref={container} style={{width:"80px"}}  ></div>
           
                </Grid2>
            </Grid2>
            <Grid2>
            {
                notifications ? (
                    notifications.length > 0 ? (
                     notifications.map(notification=>{
                        return <BloggerNotificationBar key={notification._id} handleNotificationClick={handleNotificationClick} notification={notification}   />
                     })          
                    ):(
                        <h3>No Notification so far</h3>
                    )
                ):(
                    <CircularProgress/> 
                )
            }
           
            {/* <BloggerNotificationBar/>
            <BloggerNotificationBar/>
            <BloggerNotificationBar/>
            <BloggerNotificationBar/> */}
            </Grid2>
        </Grid2>
        
    )
}
export default BloggerNotification