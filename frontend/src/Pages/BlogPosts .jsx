import {useParams } from 'react-router-dom';
import {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import parse from 'html-react-parser';
import animationData from '../lottie/pencil.json'
import Lottie from "lottie-web";
import ArticleIcon from '@mui/icons-material/Article';
//import PostCard from "../components/PostComponentsMui/PostCardMui"
import Tooltip from '@mui/material/Tooltip';
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
import lottie from 'lottie-web';


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
          {/* <AppBar sx={{ position: 'relative' ,position: '-webkit-sticky',
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
          </AppBar> */}
          <div style={{ display:"flex",justifyContent:"center"}}>
          <div style={{width:"100%"}} >
            <AddPostStepper  handleClose={handleClose}/>
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
  const container = useRef(null)
  const [test,setTest] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [data,setData] = useState({})
    const [posts ,setPosts] = useState([])
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    let { blogId } = useParams();

    const handlePostDelete=(postId)=>{
      // console.log("postId",postId)
      // console.log("reached handle Posr")
      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      axios.delete(`http://127.0.0.1:5000/bloggerDashboard/delete-post/${postId}`,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }).then(res=>{
        console.log(res)
        axios.get(`http://127.0.0.1:5000/bloggerDashboard/get-all-posts/${blogId}`)
        .then(res=>{
          console.log("posts--------------------",res.data);
          setData(res.data)
          setPosts(res.data.posts)        
        })
      })


    }

    useEffect(()=>{
      
      lottie.loadAnimation({
        container : container.current,
        renderer: 'svg',
        loop:true,
        autoplay:true,
        animationData:require('./../lottie/add.json')
  
      })
      
    },[test])

    useEffect(()=>{
        console.log(blogId)

        axios.get(`http://127.0.0.1:5000/bloggerDashboard/get-all-posts/${blogId}`)
        .then(res=>{
          console.log("posts--------------------",res.data);
          setData(res.data)
          setPosts(res.data.posts)        
        })

    },[])
    
    return(
        <div  style= {{ width:"100%"}}>  
            <FullScreenDialog  dialogOpen = {open} blogId = {blogId}  handleClickOpen = {handleClickOpen}  handleClose = {handleClose}  />
            <Grid container sx = {{width:"100%" , backgroundColor:"white  " }} justifyContent="space-between">
            <Grid item container   sx = {{height:"410px",padding:0,margin:0,fontSize: "25px",borderRadius:"10px", fontWeight:"bold" ,backgroundImage:`url('${data.image}')`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover",position: "relative"}}  >
              
              {/* <div style={{margin:0,padding:0}}> */}
                  <div style={{padding:"0px 15px",margin:0,height:"410px",width:"100%",borderRadius:"10px",backgroundColor:"black",opacity:"80%",height:"100%"}} >
                  <h4  style={{color:"white"}}>{data.title}</h4>
                  <p style={{fontSize:"15px",color:"white"}}>
                    {data.description}   
                  </p>
                  <h5 style={{color:"white"}}><span><ArticleIcon  sx = {{marginTop:"5px"}} /></span>Total posts : {posts.length}</h5>

                  </div>   
                  {/* </div> */}
                
             
                
              {/* <Grid  sx = {{Height:"400px" ,width:"100%"}}>
                <div style={{height:"200px",width:"100%",backgroundImage:"url('https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661858507/my-uploads/crxuibfslasaepf24mvp.png')"}}>
                sdjfdsnfkdsfnsdkjfn
                </div>
            </Grid> */}
            </Grid>
            
            <Grid container item  sx = {{marginTop:"10px"}}  justifyContent={"space-between"} >
             <Grid>
              <h1 style = {{margin:0,padding:0,color:"#05386b"}}>Posts</h1>
            </Grid>
            <Grid>
            <Tooltip title="Add Post">   
              {/* <AddCircleIcon fontSize='large' sx={{cursor:"pointer",color:"#b7410e"}}   onClick = {()=> setOpen(true)} />  */}
              <div  className='container' ref={container} style={{padding:"0px",margin:"0px",width:"50px"}} onClick = {()=> setOpen(true)} ></div>
            </Tooltip>
            </Grid>
            </Grid>
            </Grid>
            <div  >
            <Grid container  sx = {{marginTop:"10px",marginBottom:"10px"}} spacing={3} >
              {
                
                posts.map((item)=>{
                  return(
                    <Grid item    key={item._id} lg ={6} xs = {12}>
                    <PostCardMui  item = {item}  handlePostDelete={handlePostDelete} />
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