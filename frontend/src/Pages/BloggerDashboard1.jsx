import * as React from "react";
import axios from "axios";
import {useState,useEffect,createContext} from "react";
import {Link} from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { createStyles, makeStyles } from '@mui/styles';
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
//import Paper from "@mui/material/Paper";
//import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Notifications } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import BloggerHome from './BloggerHome';
import BloggerBlog from './BloggerBlog';
import AddPost from './AddPost';
import FullBlogView from './FullBlogView';
//import ProfileUpdate from './ProfileUpdate';
import PostUpdate from './PostUpdate';
import {
  MainListItems,
  SecondaryListItems,
  // drawer,
} from "../components/BloggerSideBarMui/ListItems";
//import BlogCard from "../components/BlogCard";
//import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";
import AccountMenu from './../components/Avatar/AccountAvatar';
import BlogPost from './BlogPosts ';
import EditorialCalender from './EditorialCalender';
import BloggerNotification from './BloggerNotifications';
import SpreadSheet from './SpreadSheet';
import EditorialCalenderTabs from './../components/BlogComps/EditorialCalenderTabs';


const useStyles = makeStyles((theme)=>({
  root:{
   // height :'100vh',
   //width:"100%",
    backgroundImage: 'url(https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661960761/my-uploads/4665_zuak4h.jpg)',
    backgroundRepeat : "repeat",
    backgroundAttachment:"fixed",
     backgroundSize:"contain",
   
  }
}))

const mdTheme = createTheme({

});
const mdTheme2 = createTheme({
  palette: {
    mode: "dark",
  },
});
//---------------------------------------------------------------

export const  BloggerContext = createContext(null);

function DashboardContent() {
  // tabs value 
  const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  //----------------------------
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const[openModal,setOpenModal] = useState(false);
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [ token ,  setToken ] = useState({});
  const [profileData,setProfileData] = useState({});
  const [blogs,setBlogs]=useState([]);

    useEffect(()=>{
      console.log("------------------------------",typeof(JSON.parse(localStorage.getItem("token"))))
       const a = JSON.parse(localStorage.getItem("token"))
       setToken(a)
       console.log("11111111111111111",token)
    },[])
//------------------Blogs manipulation functions--------------------

    const refreshBlogs = ()=>{
      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      axios.get('http://127.0.0.1:5000/bloggerDashboard/get',{
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Authorization": token 
        }
      })
      .then((res)=>{
          console.log("blogssss----",res.data.blogs)
          setBlogs(res.data.blogs)
         
      }).catch((error)=>{
          console.log(error)
      })
    }
    const handleBlogDelete = (id)=>{
      console.log("clicked id",id)
      setBlogs(blogs.filter(blog => blog._id !== id ))

      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;

    axios.delete(
      `http://127.0.0.1:5000/bloggerDashboard/delete-blog/${id}`,
      {headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization": token 
      }},

      ).then(res =>{
        console.log(res)
      }

      ) 
    }
//-------------------------------------------------    
   //console.log("match", match);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClick = ()=>{
    setOpenModal(true);
  }
  const handleClose = ()=>{
    setOpenModal(false);
  }



  React.useEffect(() => {

//------------------------------------------------------------------    
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
//--------------------------------------------------------------------------

    axios.get('http://127.0.0.1:5000/bloggerDashboard/get',{
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Authorization": token 
        }
      })
      .then((res)=>{
          console.log("blogssss----",res.data.blogs)
          setBlogs(res.data.blogs)
          // setValue(res.data.blogs[0]._id)
      }).catch((error)=>{
          console.log(error)
      })
//--------------------------------------------------------------------------

//    console.log(matches, "called");
    if (!matches) {
      setOpen(false);
    }
  }, [open, mobileOpen, matches]);
  console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnn",token);

  return (
    <BloggerContext.Provider value = {{handleBlogDelete}}>
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
    <Box sx={{ display: "flex" }}   className={classes.root} >
      
      <AppBar 
        sx = {{ backgroundColor:"#379683" ,zIndex: (theme) => theme.zIndex.drawer + 1 }}
        position="fixed"
      >
        <Toolbar
          sx={{
            pr: "10px", // keep right padding when drawer closed
          }}
        >
        

          {/* //////////////////////////////////////////////////////////// */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon fill = "green" />
          </IconButton>
          {/* <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontWeight: "bold" ,color:"#05386B" }}
          >
            IBlogs
          </Typography> */}
          <div style={{flexGrow:1}}>
           <img style={{width:"120px"}} src={'/logo3.png'} alt="iblogs" />
           </div>
          <div style={{fontWeight:"bolder" , backgroundColor:"#05386b",color:"#EDF5E1" ,padding:"10px" ,  border:"0px solid #EDF5E1", borderRadius:"10px" ,cursor:"pointer",':hover':{backgroundColor:"green"} }}  >
           <Link  style = {{ color:"#EDF5E1",textDecoration:"none"}} to = "/readerdashboard"  >Switch to Reading</Link> 
            </div>
          {/* ------------------------------------------ */}

            <AccountMenu  profileData={profileData} />

          {/* ------------------------------------------ */}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Notifications sx = {{color:"#05386b"}} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <ThemeProvider theme={mdTheme2}>
        {/* <MuiDrawer
          // container={container}
          variant="temporary"
          color="primary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              
            },
          }}
        >
          {drawer}
        </MuiDrawer> */}
        <MuiDrawer
          variant="permanent"
          // open={open}
          color="primary"
          sx={{
             width:0,
            display: { xs: "none", sm: "flex" },
             "& .MuiDrawer-paper": {
            //   // boxSizing: "border-box",
              width: 75,
            backgroundColor:"#05386B",
            color:"yellow"
          },
          flexShrink: 0,
          
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              // color: "primary",

              px: [1],
            }}
          >
            {/* <h2 style={{ color: "white", marginRight: "30px " }}>IBlogs</h2> */}
            {/* <img style={{width:"200px"}} src={'/logo3.png'} alt="iblogs" /> */}
            {/* <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton> */}
          </Toolbar>
          
          <List component="nav" color="primary">
            <MainListItems   handleClick = {handleClick} />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems/>
          </List>
        </MuiDrawer>
      </ThemeProvider>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          width:"90%",
          p: "10px 70px",
          background:"rgba(255, 255, 255,0.9)"
          // overflow: "auto",
        }}
      >
        <Toolbar />
        {/* <Container maxWidth="lg" sx={{ mt: 4 }} > */}
          <Grid container spacing={1} direction="row"sx = {{margin:"20px 50px"}} >
            {/* Chart */}
            <Routes>
                <Route exact path="/" element={<BloggerHome  blogs = {blogs} openModal = {openModal}  token={token}  refreshBlogs = {refreshBlogs}  handleClose={handleClose} />} />
                <Route exact path="/blogs" element={<BloggerBlog />} />
                <Route exact path="/blogPosts/:blogId" element ={<BlogPost  refreshBlogs={refreshBlogs}/>}   />
                <Route exact path="/addpost" element={<AddPost />} />
                <Route exact path="/notifications" element={<BloggerNotification />} />
                
                <Route exact path="/full-blog/:blogId" element={<FullBlogView />} /> 
                <Route exact path="/update/:PostId" element={<PostUpdate />} /> 
                <Route exact path="/calender" element={<EditorialCalenderTabs  blogs={blogs} value={value} handleChange={handleChange} handleChangeIndex={handleChangeIndex} />}/>
                

            </Routes>
          </Grid>
          
        {/* </Container> */}
      </Box>
    </Box>
  </ThemeProvider>
  </BloggerContext.Provider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
