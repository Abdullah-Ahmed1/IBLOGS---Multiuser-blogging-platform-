import * as React from 'react';
import { useEffect,useState,createContext} from 'react';
import axios from "axios";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { createStyles, makeStyles } from '@mui/styles';
//import List_Items from '../../components/ReaderDashComponents/ListItems2';
import "./../../components/PostComponentsMui/PostCardScroll.css";
//import AccountMenu from './../../components/Avatar/AccountAvatar';
import AdminHome from './AdminHome';
import List_ItemsAdmin from './../../components/AdminDashComps/ListItemsAdmin';
import User from './Users';
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

// export const  UserContext = createContext(null);

export default function AdminDashboard() {
  const classes = useStyles();
  return (
    <Box sx={{ display: 'flex' }} 
    className={classes.root}
    >
        <AppBar position="fixed" sx={{backgroundColor:"#379863",color:"#05386b", height:"60px",zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <div style = {{display:"flex", flexDirection:"row"}}>
            <h3 style={{fontFamily:"Roboto,Helvetica,Arial,sans-serif",paddingTop:"5px",marginTop:"5px",marginRight:"50px"}}>IBlogs</h3>
            <h3 style={{fontFamily:"Roboto,Helvetica,Arial,sans-serif",paddingTop:"5px",marginTop:"5px",fontStyle:"italic"}}>Admin</h3>
          
            </div>
           {/* <Typography sx ={{marginTop:"0px",paddingTop:"0px"}} variant="h6" noWrap component="div">
            Clipped drawer
          </Typography> */}
        </Toolbar>
      </AppBar>
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
         <List_ItemsAdmin/>
        </List>
        {/* <Divider /> */}
        <List>
         
        </List>
        {/* <AccountMenu   sx = {{position :"absolute", bottom:"80px",left:"15px",backgroundColor:"#05386b",cursor:"pointer"}}/> */}
      </Drawer>
      <Box  
      
        component="main"
        sx={{ 
          flexGrow: 1,paddingLeft:"20px",background:"rgba(255, 255, 255,0.9)" }}
      >
       <Routes>
       <Route exact path="/" element={<AdminHome />} />
       <Route  path="/users/*" element={<User/>} />
       
       </Routes>
      </Box>
    </Box>
    
  );
}
