import * as React from "react";
import axios from "axios";
import {useState,useEffect,createContext} from "react";
import {Link} from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";

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
  drawer,
} from "../components/BloggerSideBarMui/ListItems";
//import BlogCard from "../components/BlogCard";
//import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";
import AccountMenu from './../components/Avatar/AccountAvatar';
import BlogPost from './BlogPosts ';
import EditorialCalender from './EditorialCalender';
import BloggerNotification from './BloggerNotifications';

////////////---------------------------------------------------------------MUI things
const drawerWidth = 220;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(6),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const mdTheme = createTheme({
 

  

  //  overrides: {
  //   MuiCssBaseline: {
     
  //       body: {
  //         backgroundImage:
  //           "url(https://designshack.net/wp-content/uploads/gradient-background.jpg)"
  //       }
     
  //   }
  // }
 
});
const mdTheme2 = createTheme({
  palette: {
    mode: "dark",
  },
});
//---------------------------------------------------------------

export const  BloggerContext = createContext(null);

function DashboardContent(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const[openModal,setOpenModal] = useState(false);
  const { window } = props;
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
  const container =
    window !== undefined ? () => window().document.body : undefined;
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
    <Box sx={{ display: "flex" }}>
      
      <AppBar 
        sx = {{ backgroundColor:"#379683" }}
      position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
              display: { xs: "none", sm: "flex" },
            }}
          >
            <MenuIcon sx = {{
              color:"#05386B"
            }}   />
          </IconButton> */}

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
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontWeight: "bold" ,color:"#05386B" }}
          >
            IBlogs
          </Typography>
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
        <MuiDrawer
          container={container}
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
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </MuiDrawer>
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
            <h2 style={{ color: "white", marginRight: "30px " }}>IBlogs</h2>
            {/* <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton> */}
          </Toolbar>
          <Divider />
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
        //  background:"https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661858507/my-uploads/crxuibfslasaepf24mvp.png",
              
         // backgroundColor:"yellow",
          //  backgroundColor: (theme) =>
          //    theme.palette.mode === "light"
          //      ? theme.palette.grey[100]
          //      : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4 }} >
          <Grid container spacing={1} direction="row">
            {/* Chart */}
            <Routes>
                <Route exact path="/" element={<BloggerHome  blogs = {blogs} openModal = {openModal}  token={token}  refreshBlogs = {refreshBlogs}  handleClose={handleClose} />} />
                <Route exact path="/blogs" element={<BloggerBlog />} />
                <Route exact path="/blogPosts/:blogId" element ={<BlogPost/>}   />
                <Route exact path="/addpost" element={<AddPost />} />
                <Route exact path="/notifications" element={<BloggerNotification />} />
                
                <Route exact path="/full-blog/:blogId" element={<FullBlogView />} /> 
                <Route exact path="/update/:PostId" element={<PostUpdate />} /> 
                <Route exact path="/calender" element={<EditorialCalender />} />
                

            </Routes>
          </Grid>
          
        </Container>
      </Box>
    </Box>
  </ThemeProvider>
  </BloggerContext.Provider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
