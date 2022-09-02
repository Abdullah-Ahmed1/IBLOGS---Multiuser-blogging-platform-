import * as React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { createStyles, makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import List_Items from '../../components/ReaderDashComponents/ListItems2';
import SearchBar from "../../components/ReaderDashComponents/Searchbar"
import ReaderPostCard from './../../components/PostComponentsMui/ReaderPostCard';

const drawerWidth = 70;

const useStyles = makeStyles((theme)=>({
  root:{
    minHeight :'100vh',
    backgroundImage: 'url(https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661960761/my-uploads/4665_zuak4h.jpg)',
    backgroundRepeat : "no-repeat",
    backgroundAttachment:"fixed",
    backgroundSize:"cover",
   
  }
}))


export default function ReaderDashboard() {
  const classes = useStyles();

  useEffect(()=>{
    axios.get('http://127.0.0.1:5000/readerDashboard')
    .then(res =>{
      console.log("res",res)
    })
  })
  return (
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
           
            backgroundColor:"#5cdb95"
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
        <Divider />
        <List>
         
        </List>
      </Drawer>
      <Box
      
        component="main"
        sx={{ flexGrow: 1, paddingLeft:"20px",background:"rgba(237, 245, 225,0.9)" }}
      >
        <CssBaseline />
        {/* <h1>hellow world</h1> */}
        {/* <Toolbar /> */}
        <div style={{display:"flex",width:"73%",flexDirection:"row" ,background:"rgba(237, 245, 225,0.95)",alignItems:"center",justifyContent:"space-between"}}>
          <h2 style = {{color:"#379863"}}>IBlogs</h2>
          <SearchBar/>
        </div>
        <Divider variant="middle"/>
       <Grid container spacing = {5} direction = "row"   >
        <Grid item container  spacing={3}  lg ={8} md = {7} sm ={12} sx = {{marginLeft:"7px"}}  >  
       {/* ----------------------------------------------------------------------------------- */}
       <Grid item lg ={12}>
       <ReaderPostCard/>
       </Grid>
       <Grid item lg ={12}>
       <ReaderPostCard/>
       </Grid>
       <Grid item lg ={12}>
       <ReaderPostCard/>
       </Grid>
       <Grid item lg ={12}>
       <ReaderPostCard/>
       </Grid>
       <Grid item lg ={12}>
       <ReaderPostCard/>
       </Grid>
       <Grid item lg ={12}>
       <ReaderPostCard/>
       </Grid>
       <Grid item lg ={12}>
       <ReaderPostCard/>
       </Grid>
       <Grid item lg ={12}>
       <ReaderPostCard/>
       </Grid>
       <Grid item lg ={12}>
       <ReaderPostCard/>
       </Grid>
       <Grid item lg ={12}>
       <ReaderPostCard/>
       </Grid>
       
        {/* <Grid item lg={12} >
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              this is title
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              this is subtitle space
            </Typography>
            <Typography variant="subtitle1" paragraph>
              this is description space Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam odit, ut eveniet, qui aspernatur dolores doloribus quis, accusantium corrupti porro quo velit ipsam sunt? Itaque minima ea neque sint quisquam.
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={"https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661858507/my-uploads/crxuibfslasaepf24mvp.png"}
            alt=" image"
          />
        </Card>
        </Grid> */}

        {/* ---------------------------------------------------------------- */}
        </Grid>
        <Grid item lg = {3} md={5} sm = {12} sx = {{position:"fixed",overflowY:"scroll",right:"0px"}}  >
       
        <Divider />
       
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

    
     

        </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
