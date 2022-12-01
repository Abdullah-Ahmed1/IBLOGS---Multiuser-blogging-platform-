import {useParams } from 'react-router-dom';
import {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import axios from "axios";
import Grid2 from '@mui/material/Unstable_Grid2';
import ArticleIcon from '@mui/icons-material/Article';
import DoneIcon from '@mui/icons-material/Done';
import "../components/Css_for_pages/addPostModal.css"
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import AddPostStepper from './../components/StepperAddPostMUI/stepper';
import { useRef } from 'react';
import PostCardMui from './../components/PostComponentsMui/PostCardMui';
import lottie from 'lottie-web';
import { Description } from '@mui/icons-material';
var _  =require('lodash')
//---------------------- FULL SCREEN MUI DIALOGUE BOX     ------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
   function FullScreenDialog({handleClose,handleClickOpen,dialogOpen ,refreshPosts,blogId  }) {
  
    return (
      <div>

        <Dialog
          fullScreen
          open={dialogOpen}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <div style={{ display:"flex",justifyContent:"center"}}>
          <div style={{width:"100%"}} >
            <AddPostStepper  handleClose={handleClose}  refreshPosts ={refreshPosts} />
            </div>
            
          </div>
          <div>
           
          </div>
        </Dialog>
      </div>
    );
  }
//-----------------------------------------------------------------
const BlogPost= ({refreshBlogs})=>{

  const container = useRef(null)
  const [test,setTest] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [data,setData] = useState({})
    const [data1,setData1] = useState({})
    const [posts ,setPosts] = useState([])
//---------------------------------------------------
  const [titleEdit,setEditTitle] = useState(false);
  const [descriptionEdit,setDescriptionEdit] = useState(false)
  //const [title, setTitle] = useState(null)
  const [description,setDescription] = useState(null)


  const handleChangeItem = (item)=>{
   const a = (/^\w+(?:\s+\w+){0,249}$/).test(item.description)
   console.log("--!",a)
    setData({...data,...item})
  }
  const EditInfo = ()=>{
    
    

    if(_.isEqual(data,data1)){
      console.log("not changed")
    }else
    {
      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      axios.post(`http://127.0.0.1:5000/bloggerDashboard/update-blog-info/${blogId}`,data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }).then(res=>{
        console.log(res)
        refreshBlogs()
      })
    }
  }

  const refreshPosts = ()=>{
    axios.get(`http://127.0.0.1:5000/bloggerDashboard/get-all-posts/${blogId}`)
        .then(res=>{
          console.log("posts--------------------",res.data);
          setData(res.data)
          setData1(res.data)
          setPosts(res.data.posts)        
        })
  }

//-------------------------------------------------
  
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
          setData1(res.data)
          setPosts(res.data.posts)        
        })

    },[])
    
    return(
        <div  style= {{ width:"100%"}}>  
            <FullScreenDialog  dialogOpen = {open} blogId = {blogId}  refreshPosts = {refreshPosts} handleClickOpen = {handleClickOpen}  handleClose = {handleClose}  />
            <Grid container sx = {{width:"100%",padding:"0px 20px"  }} justifyContent="space-between">
            <Grid item container   sx = {{height:"410px",margin:0,fontSize: "25px",borderRadius:"10px", fontWeight:"bold" ,backgroundImage:`url('${data.image}')`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover",position: "relative"}}  >
              
              {/* <div style={{margin:0,padding:0}}> */}
                  <div style={{padding:"0px 15px",margin:0,height:"410px",width:"100%",borderRadius:"10px",backgroundColor:"black",opacity:"80%",height:"100%"}} >
                {
                  titleEdit ? (
                    <Grid2 container  alignItems={"center"}  justifyContent={"space-between"}  >
                      <Grid2 lg ={10} >
                      <TextField  value ={data.title} onChange={(e)=>handleChangeItem({title: e.target.value})}  sx = {{backgroundColor:"white",marginTop:"10px",marginBottom:"10px",padding:"10px"}} id="standard-basic" fullWidth label="Title" variant="standard" />
                       
                      </Grid2>  
                      <Grid2>
                        <Tooltip title={"Done"}>
                          <DoneIcon  onClick={()=>{setEditTitle(false);EditInfo()}} sx = {{color:"white"}}/> 
                       </Tooltip>
                      </Grid2>
                    </Grid2>
                   )
                  :
                  (
                    <Grid2 container direction="row"  alignItems ={"center"} justifyContent ={"space-between"} >
                      <Grid2>
                      <h4  style={{color:"white"}}>{data.title}</h4>
                      </Grid2>
                      <Grid2>
                      <Tooltip title={"Edit Title"}>
                        <EditIcon  onClick={()=>setEditTitle(true)}  sx = {{color:"white",cursor:"pointer"}}/>
                      </Tooltip>
                      </Grid2>
                    </Grid2>
                    
                  )    
                }
                {
                  descriptionEdit ? (
                    <Grid2 container direction={"row"} alignItems = {"center"} justifyContent={"space-between"}>
                      <Grid2 lg = {10}  sx ={{backgroundColor:"white"}}>
                      <TextField  value={data.description} onChange={(e)=>handleChangeItem({description:e.target.value})}  id="filled-basic" sx = {{backgroundColor:"white"}} multiline size="small" label="About" rows={5} fullWidth variant="filled" />
                      </Grid2>
                      <Grid2>
                      <Tooltip title={"Done"}>
                      <DoneIcon  onClick={()=>{setDescriptionEdit(false);EditInfo()}}  sx = {{color:"white",cursor:"pointer"}}/>
                      </Tooltip>
                      </Grid2>
                    </Grid2>
                                           
                  ):(
                    <Grid2 container direction = {"row"} alignItems = {"center"} justifyContent={"space-between"} >
                      <Grid2 sx = {{width:"90%",minHeight:"140px"}}>
                        <p style={{fontSize:"15px",color:"white"}}>
                          {data.description}   
                        </p>
                      </Grid2>
                      <Grid2>
                      <Tooltip title={"Edit Description"}>
                        <EditIcon  onClick={()=>setDescriptionEdit(true)}  sx = {{color:"white",cursor:"pointer"}}/>
                      </Tooltip>
                      </Grid2>
                    </Grid2>
                    
                  )
                }
                 

                 
                  <h5 style={{color:"white"}}><span><ArticleIcon  sx = {{marginTop:"5px"}} /></span>Total posts : {posts.length}</h5>

                  </div>   
                  {/* </div> */}
                
             
                
              {/* <Grid  sx = {{Height:"400px" ,width:"100%"}}>
                <div style={{height:"200px",width:"100%",backgroundImage:"url('https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661858507/my-uploads/crxuibfslasaepf24mvp.png')"}}>
                sdjfdsnfkdsfnsdkjfn
                </div>
            </Grid> */}
            </Grid>
            
            <Grid container item  sx = {{padding:"0px 20px",marginTop:"10px" ,backgroundColor:"transparent"}}  justifyContent={"space-between"} >
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
            <Grid container  sx = {{padding:"0px 20px",marginTop:"10px",marginBottom:"10px"}} spacing={3} >
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