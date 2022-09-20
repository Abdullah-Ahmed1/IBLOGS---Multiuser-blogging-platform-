import * as React from 'react';
import { useEffect,useState,createContext} from 'react';
import axios from "axios";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import { createStyles, makeStyles } from '@mui/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import List_Items from '../../components/ReaderDashComponents/ListItems2';

import "./../../components/PostComponentsMui/PostCardScroll.css";
// import Avatar from '@mui/material/Avatar';
// //import Grid from "@mui/material/Grid";
// //import Box from "@mui/material/Box";
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import RecommendedChips from './../../components/PostComponentsMui/RecommendChips';
// import TrendPostCard from './../../components/PostComponentsMui/TrendPostCard';
import AccountMenu from './../../components/Avatar/AccountAvatar';
//--------------Calling Components--------------------------
import ReaderHome from './ReaderHome';
import ReaderFullPostView from './ReaderFullPostView';
import AuthorProfile from './AuthorProfile';
import YourProfile from '../YourProfileInfo';

var _  =require('lodash')
//----------------------------------------------------------------
const drawerWidth = 70;



const useStyles = makeStyles((theme)=>({
  root:{
   // height :'100vh',
    backgroundImage: 'url(https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661960761/my-uploads/4665_zuak4h.jpg)',
    backgroundRepeat : "repeat",
    backgroundAttachment:"fixed",
     backgroundSize:"contain",
   
  }
}))


 export const  UserContext = createContext(null);

export default function ReaderDashboard() {
  const classes = useStyles();

  const [visible,setVisible] = useState(false);
  const [posts,setPosts] = useState([])
  const [profileData,setProfileData] = useState({});
  const [profileData1,setProfileData1] = useState({});
  const [dataChanged,setDataChanged] = useState(false);
 
  console.log("post",posts  )

  const handleInfoChange = (item)=>{
    setProfileData({...profileData,...item})
  } 

  ///----------------- Here API for updating data of profileInfo is applied  --------------
  const ApiForProfileInfoChange = ()=>{
    //--------------Here we first check that if the state value is changed or not, If changed we will make an API 
    //-- otherwise not 
    if(_.isEqual(profileData,profileData1)){
      return console.log("not chnaged")
    }else{
      console.log("chnaged");
      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
        axios.post(
          "http://127.0.0.1:5000/updateProfile",profileData ,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          console.log("Got response------------------", res);

          let value = JSON.parse(localStorage.getItem("token"));
          let token = value.token;
          axios.get(
              "http://127.0.0.1:5000/getProfile",
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: token,
                },
              }
            )
            .then((res) => {
              console.log("Got Profile", res);
              setProfileData(res.data)
              setProfileData1(res.data)
            })
            .catch((err) => console.log("errr", err));
          
        })
        .catch((err) => console.log("errr", err));
    
    }

    // _.isEqual(profileData,profileData1)? 
    //    "data is not changed"
    //  : 
      
    //     console.log("uuuuuuuuuuuuuu");
    //     let value = JSON.parse(localStorage.getItem("token"));
    //     let token = value.token;
    //       axios.get(
    //         "http://127.0.0.1:5000/getProfile",
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             Authorization: token,
    //           },
    //         }
    //       )
    //       .then((res) => {
    //         console.log("Got Profile", res);
    //         setProfileData(res.data)
    //       })
    //       .catch((err) => console.log("errr", err));
      
    
    
    
  }


  const ProfileFetch = ()=>{
    console.log("uuuuuuuuuuuuuu")
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
    axios.get(
        "http://127.0.0.1:5000/getProfile",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("Got Profile", res);
        setProfileData(res.data)
      })
      .catch((err) => console.log("errr", err));
  }



  useEffect(()=>{

    axios.get('http://127.0.0.1:5000/readerDashboard')
    .then(res =>{
      console.log("res--------",res.data.data)
      setPosts(res.data.data)
      
     
    }).catch(err=> console.log(err))

//---------------------------------------------------------
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
    axios.get(
        "http://127.0.0.1:5000/getProfile",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("Got Profile", res);
        setProfileData(res.data)
        setProfileData1(res.data)
      })
      .catch((err) => console.log("errr", err));

    return () => {
      // will run on every unmount.
       console.log("component is unmounting");
      }
  },[])

  
  
  return (
    <UserContext.Provider  value = {{ProfileFetch,profileData,handleInfoChange,ApiForProfileInfoChange}} >
    <Box sx={{ display: 'flex' }} 
    className={classes.root}
    >
      
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display:{sm :"flex",xs :"none"},
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
           
            backgroundColor: "#05386b"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        
        <Toolbar />
        <Divider />
        <List  sx ={{marginTop:"50px",marginLeft:"5px",overflow:"hidden"}}>
         <List_Items/>
        </List>
        {/* <Divider /> */}
        <List>
         
        </List>
        <AccountMenu profileData={profileData}  sx = {{position :"absolute", bottom:"80px",left:"15px",backgroundColor:"#05386b",cursor:"pointer"}}/>
      </Drawer>
      <Box  
      
        component="main"
        sx={{ 
          flexGrow: 1,paddingLeft:"20px",background:"rgba(255, 255, 255,0.9)" }}
      >
       <Routes>
       <Route exact path="/" element={<ReaderHome  posts = {posts}/>} />
       <Route exact path="/full-post" element={<ReaderFullPostView posts = {posts} />} />
       <Route exact path="/author-profile" element={<AuthorProfile />} />
       <Route exact path="/your-profile" element={<YourProfile />} />         
       </Routes>
      </Box>
    </Box>
    </UserContext.Provider>
  );
}
