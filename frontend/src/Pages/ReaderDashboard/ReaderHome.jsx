import * as React from 'react';
import { useEffect,useState,useRef } from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Grid from "@mui/material/Grid";
import Grid2 from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
//import Divider from '@mui/material/Divider';

import Paper from '@mui/material/Paper';
// import Card from '@mui/material/Card';
// import parse from 'html-react-parser';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { createStyles, makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import List_Items from '../../components/ReaderDashComponents/ListItems2';
import SearchBar from "../../components/ReaderDashComponents/Searchbar"
import ReaderPostCard from './../../components/PostComponentsMui/ReaderPostCard';
//------------
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import "./../../components/PostComponentsMui/PostCardScroll.css";
import Avatar from '@mui/material/Avatar';
//import Grid from "@mui/material/Grid";
//import Box from "@mui/material/Box";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RecommendedChips from './../../components/PostComponentsMui/RecommendChips';
import TrendPostCard from './../../components/PostComponentsMui/TrendPostCard';
import AccountMenu from './../../components/Avatar/AccountAvatar';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const ReaderHome = ({posts})=>{
    const [added,setAdded] = useState(false) 
    return(
        <>
        <CssBaseline />
        {/* <h1>hellow world</h1> */}
        {/* <Toolbar /> */}
        <div style={{display:"flex",width:"73%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}>
          <h2 style = {{color:"#379863"}}>IBlogs</h2>
          <SearchBar/>
        </div>
        {/* <Divider variant="middle"/> */}
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 xs={12} md={5} lg={7} spacing={0} sx = {{marginTop:"20px",marginLeft:"30px"}}  >  
       {/* ----------------------------------------------------------------------------------- */}
       {/* <Posts  posts = {posts}/> */}
       {
        posts ?
        (
        posts.map(item =>{
           
          return (
            <Box sx = {{ boxShadow:"1px 1px 3px 1px rgba(0,0,0,0.3)",borderRadius:"3px",maxHeight:"300px",minHeight:"300px",width:"95%",marginBottom:"30px",backgroundColor:"white"}} >
       <Grid container direction="row"   spacing = {0} >
         <Grid lg = {10} md = {12} sm={12} sx= {{p:2}} item direction="column" justifyContent="space-between" spacing={0} container >
            <Grid item container sx = {{maxHeight:"20px"}} spacing={0} lg={8}  >
                <Grid item lg = {1} md = {1} sm = {1}>
                    
                    <Avatar sx={{ width: 45, height: 45 }}>A</Avatar>
                </Grid>
                <Grid item container   direction="column" spacing={0} lg = {9}  md = {7} sm={5}>
                    <Grid item   sx = {{fontSize:"14px",fontWeight:"bold",fontFamily: " Ubuntu, sans-serif"}}>
                        Abdullah Ahmed -{" 27 April "}
                    </Grid>
                    <Grid item  sx = {{fontSize:"16px",fontFamily: " Ubuntu, sans-serif",color:"#05386b"}}>
                        From: Reactjs - from begginer to expert
                    </Grid>
                   
                </Grid>
                <Grid item lg ={2}>
                    {/* icons here */}
                    <MoreVertIcon  sx ={{color:"#05386b"}}  />
                </Grid>
                
            </Grid>
            <Grid item lg ={8} sx ={{padding:0,margin:0, fontFamily: "Fjalla One, sans-serif"}}>
                    <h4 style = {{fontWeight:"bolder"}}>{item.postTitle}</h4>
                    <div  className="scrollers" style= {{color:"#00000099",width:"98%",maxHeight:"60%",fontSize:"14px",minHeight:"60%",overflow:"auto"}}>
                      {item.postDescription}
                    </div>
                   
            </Grid>
            <Grid item sx = {{ width:"80%",maxHeight:"20px"}} >
              {/* <Button  sx = {{width:"20px",color:"#05386b"}} size="small"><ThumbUpIcon/></Button>
             <Button  sx = {{   width:"20px",color:"#05386b"}} size="small"> <ShareIcon/></Button>
             <Button sx = {{   width:"20px",color:"#05386b",display: `${!added ? "inline":"none"}`}} onClick ={()=>setAdded(true)} size="small"><BookmarkAddIcon/></Button>
             <Button sx = {{   width:"20px",color:"#05386b",display: `${!added ? "none":"inline"}`}} onClick ={()=>setAdded(false)}  ><BookmarkAddedIcon/></Button>   
               */}
           <ThumbUpIcon sx=  {{cursor:"pointer",color:"#05386b",margin:"0px 15px "}}  />
           <ShareIcon sx=  {{   cursor:"pointer",color:"#05386b",margin:"0px 15px "}} />
           <BookmarkAddIcon  sx=  {{cursor:"pointer",color:"#05386b",margin:"0px 15px ",display: `${added ? "none":"inline"}`}} onClick ={()=>setAdded(true)}  />
           <BookmarkAddedIcon sx=  {{cursor:"pointer",color:"#379683 ",margin:"0px 15px ",display: `${!added ? "none":"inline"}`}}  onClick ={()=>setAdded(false)}  />
            </Grid>
         </Grid>

         <Grid item container justifyContent="flex-end" sx = {{display:{lg :"flex",md:"none",sm:"none",xs:"none"},height:"300px"}}  alignItems={"center"} lg = {2} >
            <img  style={{maxWidth:"160px",height:"90px"}} src={"https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661858507/my-uploads/crxuibfslasaepf24mvp.png"} alt="image" />
        </Grid>       
       </Grid>
       </Box>
          )
        })):(
          <Item>No data show</Item>
        )
       }
       
       
       {/* <Grid2 item lg ={12}>
       <ReaderPostCard/>
       </Grid2>  */}
       {/* <Grid item lg ={12}>
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
       </Grid> */}

       
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
        </Grid2>
        <Divider orientation='vertical' sx={{width:"29px"}} flexItem/>
        <Grid2  xs={12} md={5} lg={3 }  sx = {{position:"fixed",top:"0px",right:"0px",height:"100vh",overflow:"auto", background:"rgba(92, 219, 149,1)",marginRight:"0px",paddingLeft:"12px" } }     >
       
        {/* <Divider /> */}
        <h4>Recommended Topics</h4>
        <RecommendedChips/>
        <div>
        <h4>Trending Posts</h4>
          <TrendPostCard/>
          <TrendPostCard/>
          <TrendPostCard/>
          <TrendPostCard/>
          <TrendPostCard/>
          </div>
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
        {/* <Typography paragraph>
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
        </Typography> */}
        {/* <div  style={{backgroundColor:"green",maxWidth:"100px",overflowY: "auto"}} onScroll={onScroll}
        ref={listInnerRef} >Hello</div>

    
      */}

        </Grid2>
      </Grid2>

        </>
    )
}
export default ReaderHome