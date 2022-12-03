import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import lottie from 'lottie-web';
import { useEffect,useState,useRef } from 'react';
import { CircularProgress } from '@mui/material';
import AdminNotificationBar from './../../components/AdminDashComps/AdminNotificationBar';
const Notifications =()=>{
  const container = useRef(null)
  
const [notifications,setNotifications]  =useState(null)
  const handleWarn = (id)=>{
    let value = JSON.parse(localStorage.getItem("adminToken"));
    let token = value.adminToken;
    axios.post(`http://127.0.0.1:5000/admin/add-warn-notification/${id}`,{data:null},{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    }).then(res=>{
      setSeen(id)
    })

    
  }
  const handleDiscard = (id)=>{
  
    setSeen(id)
  }
const setSeen = (id)=>{
  console.log("*-*-*1111111")
  let value = JSON.parse(localStorage.getItem("adminToken"));
  let token = value.adminToken;
  axios.get(`http://127.0.0.1:5000/admin/set-notification-seen/${id}`,{
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  })
  .then(res=>{
    axios.get(`http://127.0.0.1:5000/admin/get-notifications`,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    })
    .then(res=>{
      console.log(res)
      setNotifications(res.data)
    })

  })
}

const handleDeleteNotification = (id)=>{
  console.log("seen",id)
  let value = JSON.parse(localStorage.getItem("adminToken"));
  let token = value.adminToken;
  axios.delete(`http://127.0.0.1:5000/admin/delete-notification/${id}`,{
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  }).then(res=>{
    axios.get(`http://127.0.0.1:5000/admin/get-notifications`,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    })
    .then(res=>{
      console.log(res)
      setNotifications(res.data)
    })
  })

}


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
    let value = JSON.parse(localStorage.getItem("adminToken"));
    let token = value.adminToken;
    axios.get(`http://127.0.0.1:5000/admin/get-notifications`,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    })
    .then(res=>{
      console.log(res)
      setNotifications(res.data)
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
        {/* <h2 style={{color:"#05386b"}}>Weekly Report</h2>
        <Paper sx = {{padding:"15px"}}>
       yReportsItems/> */}
        </div> 
        <h3>Notifications</h3>
        {
          notifications?(
            notifications.length> 0? (
              
              notifications.map(notification=>{
                return <AdminNotificationBar key={notification._id} handleDeleteNotification={handleDeleteNotification} notification = {notification} handleDiscard={handleDiscard} handleWarn={handleWarn} />
              })
              
            ):(

              <div style={{margin:"auto"}}>
              <div className='container' ref={container} style={{width:"350px"}}  ></div>
              </div>
            )
          ):(
            <CircularProgress/>
          )
        }
       {/* <h3>Notifications will be shown here</h3> */}
      
       
     
        {/* ---------------------------------------------------------------- */}
        </Grid2>
      
      </Grid2>

        </>

    )
}
export default Notifications