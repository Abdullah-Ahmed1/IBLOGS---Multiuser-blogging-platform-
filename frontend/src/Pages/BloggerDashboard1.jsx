import * as React from "react";
import {useState,useEffect} from "react";
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
import ProfileUpdate from './ProfileUpdate';
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
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#000000",
    },
  },
  paper: {
    background: "black",
  },
});
const mdTheme2 = createTheme({
  palette: {
    mode: "dark",
  },
});
//---------------------------------------------------------------



function DashboardContent(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const[openModal,setOpenModal] = useState(false);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [ token ,  setToken ] = useState({});
  

    useEffect(()=>{
      console.log("------------------------------",typeof(JSON.parse(localStorage.getItem("token"))))
       const a = JSON.parse(localStorage.getItem("token"))
       setToken(a)
       console.log("11111111111111111",token)
    },[])


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
    console.log(matches, "called");
    if (!matches) {
      setOpen(false);
    }
  }, [open, mobileOpen, matches]);
  console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnn",token);

  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
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
            <MenuIcon />
          </IconButton>

          {/* //////////////////////////////////////////////////////////// */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            IBlogs
          </Typography>
     
            <AccountMenu/>
     
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Notifications />
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
        <Drawer
          variant="permanent"
          open={open}
          color="primary"
          sx={{
            display: { xs: "none", sm: "flex" },
            // "& .MuiDrawer-paper": {
            //   // boxSizing: "border-box",
            //   width: drawerWidth,
            // },
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
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" color="primary">
            <MainListItems   handleClick = {handleClick} />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems/>
          </List>
        </Drawer>
      </ThemeProvider>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={1} direction="row">
            {/* Chart */}
            <Routes>
                <Route exact path="/" element={<BloggerHome  openModal = {openModal}  token={token}  handleClose={handleClose} />} />
                <Route exact path="/blogs" element={<BloggerBlog />} />
                <Route exact path="/blogPosts/:blogId" element ={<BlogPost/>}   />
                <Route exact path="/addpost" element={<AddPost />} />
                
                <Route exact path="/full-blog/:blogId" element={<FullBlogView />} /> 
                <Route exact path="/update/:PostId" element={<PostUpdate />} /> 
                <Route exact path="/updateProfile" element={<ProfileUpdate />} />

            </Routes>
          </Grid>
          
        </Container>
      </Box>
    </Box>
  </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
