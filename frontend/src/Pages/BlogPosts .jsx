import {useParams } from 'react-router-dom';
import {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import parse from 'html-react-parser';
import animationData from '../lottie/pencil.json'
import Lottie from "lottie-web";
//import PostCard from "../components/PostComponentsMui/PostCardMui"

import "../components/Css_for_pages/addPostModal.css"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
//import { TransitionProps } from '@mui/material/transitions';
import { useState } from 'react';
import AddPostStepper from './../components/StepperAddPostMUI/stepper';
import { useRef } from 'react';
import PostCardMui from './../components/PostComponentsMui/PostCardMui';


//---------------------- FULL SCREEN MUI DIALOGUE BOX     ------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


   function FullScreenDialog({handleClose,handleClickOpen,dialogOpen ,blogId  }) {

    //  const container = useRef(null)
      const [content,setContent] = useState("")
      console.log("-----------------------------------------",content)
      const id =  JSON.parse(atob((JSON.parse(localStorage.getItem('token'))).token.split(".")[1])).id
      const date = new Date();
      const   data = {
        title: "this is a dummy title",
        content : content,
        date:date,
        status: "save"

      }
     const handlePostSave= ()=>{
         axios.post(`http://127.0.0.1:5000/bloggerDashboard/addpost/${blogId}`,data)
         .then((res)=>console.log(res))
         .catch((err)=>console.log(err))
        // console.log("reached")
        // handleClose();
      }
     
  
    return (
      <div>

        <Dialog
          fullScreen
          open={dialogOpen}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' ,position: '-webkit-sticky',
        position: 'sticky',
        top: 0,backgroundColor:"#379683",color:"white" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon sx = {{color:"#05386b "}} />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1, color:"#05386b",fontWeight:"bolder" }} variant="h6" component="div">
                Create Post
               
              </Typography>
                       
              <Button className ="saveButton"   onClick={handlePostSave}  sx = {{backgroundColor:"white",color:"black"}}  >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{ display:"flex",justifyContent:"center"}}>
          <div style={{width:"95%" ,marginTop:"20px"}} >
            <AddPostStepper/>
            </div>
            
          </div>
          <div>
           
          </div>
        </Dialog>
      </div>
    );
  }
//-----------------------------------------------------------------




const BlogPost= ()=>{
    const [open, setOpen] = React.useState(false);
    const [posts ,setPosts] = useState([])
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    let { blogId } = useParams();
    useEffect(()=>{
        console.log(blogId)

        axios.get(`http://127.0.0.1:5000/bloggerDashboard/get-all-posts/${blogId}`)
        .then(res=>{
          console.log("posts",res.data.posts);
          setPosts(res.data.posts)        
        })

    },[])
    
    return(
        <div  style= {{ width:"100%"}}>  
            <FullScreenDialog  dialogOpen = {open} blogId = {blogId}  handleClickOpen = {handleClickOpen}  handleClose = {handleClose}  />
            <Grid container sx = {{width:"100%" }} justifyContent="space-between">
            <Grid item   sx = {{fontSize: "25px", fontWeight:"bold" ,marginBottom:"10px"}}  >
               Posts 
            </Grid>
            <Grid item>
                
            <AddCircleIcon fontSize='large' sx = {{cursor:"pointer"}}    onClick = {()=> setOpen(true)} /> 
            </Grid>
            </Grid>
            <div  >
            <Grid container spacing={4} >
              {
                
                posts.map((item)=>{
                  return(
                    <Grid item lg ={6} xs = {12}>
                    <PostCardMui key={item._id} item = {item}/>
                    </Grid>
                  )
                })
                
              }
              </Grid>
            </div>
            {/* <PostCard/> */}
        </div>  
    )
}
export default BlogPost;