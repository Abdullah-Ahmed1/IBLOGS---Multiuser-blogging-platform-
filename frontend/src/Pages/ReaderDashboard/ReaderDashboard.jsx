import * as React from 'react';
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
import SearchBar from './../../components/ReaderDashComps/Searchbar';

const drawerWidth = 80;

const useStyles = makeStyles((theme)=>({
  root:{
    minHeight :'100vh',
    backgroundImage: 'url(https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661960761/my-uploads/4665_zuak4h.jpg)',
    backgroundRepeat : "no-repeat",
    backgroundSize:"cover",
   
  }
}))


export default function ReaderDashboard() {
const classes = useStyles();


  return (
    <Box sx={{ display: 'flex' }}  >
      
      
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
        <List  sx ={{marginTop:"50px",marginLeft:"5px"}}>
         <List_Items/>
        </List>
        <Divider />
        <List>
         
        </List>
      </Drawer>
      <Box
      className={classes.root}
        component="main"
        sx={{ flexGrow: 1, paddingLeft:"20px" }}
      >
        <CssBaseline />
        {/* <h1>hellow world</h1> */}
        {/* <Toolbar /> */}
        <div style={{display:"flex",width:"70%",flexDirection:"row" ,background:"rgba(255,255,255,0.95)",alignItems:"center",justifyContent:"space-between"}}>
          <h2>IBlogs</h2>
          <SearchBar/>
        </div>
        <Divider variant="middle"/>
       <Grid container spacing = {5} sx = {{background:"rgba(255,255,255,0.9)"}}  >
        <Grid item container  spacing={4}  lg ={8} md = {7} sm ={12} sx = {{marginLeft:"7px"}}  >  
       {/* ----------------------------------------------------------------------------------- */}
       
        <Grid item lg={12} >
        <Card sx={{minHeight:"250px" ,display: 'flex' ,boxShadow:"10px" }}>
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
            sx={{ width: 160, display: { xs: 'none', sm: 'block',height:"100px",margin:"auto" } }}
            image={"https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661858507/my-uploads/crxuibfslasaepf24mvp.png"}
            alt=" image"
          />
        </Card>
        </Grid>   
        <Grid item lg={12} >
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
        </Grid>    <Grid item lg={12} >
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
            sx={{ width: 160, display: { xs: 'none', sm: 'block', height:"100px"} }}
            image={"https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661858507/my-uploads/crxuibfslasaepf24mvp.png"}
            alt=" image"
          />
        </Card>
        </Grid>    
        <Grid item lg={12} >
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
        </Grid>
        <Grid item lg={12} >
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
        </Grid>   
        <Grid item lg={12} >
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
        </Grid>
        <Grid item lg={12} >
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
        </Grid>
        <Grid item lg={12} >
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
        </Grid>

        {/* ---------------------------------------------------------------- */}
        </Grid>
        <Grid item lg = {4} md={5} sm = {12}>
        <Drawer
        sx={{   
          flexShrink: 0,
          display:{sm :"flex",xs :"none"},
          '& .MuiDrawer-paper': {
            width: "25%",
            boxSizing: 'border-box',
    
          },
        }}
        variant="permanent"
        anchor="right"
      >

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
    
      </Drawer>

        </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
