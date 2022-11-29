import * as React from "react"; //import Grid from "@mui/material/Grid";
//import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import axios from "axios";
import reactGA from "react-ga";
import parse from 'html-react-parser';
import Tooltip from '@mui/material/Tooltip';
import { useParams } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Divider from '@mui/material/Divider';
 //import { Typography } from '@mui/material';    
 import CssBaseline from '@mui/material/CssBaseline';
 import InsertCommentIcon from '@mui/icons-material/InsertComment';
 import Avatar from '@mui/material/Avatar';
 import RecommendedChips from './../../components/PostComponentsMui/RecommendChips';
 import { useEffect,useState } from 'react';
 //import TrendPostCard from './../../components/PostComponentsMui/TrendPostCard';
 import PostCommentDrawer from "../../components/ReaderDashComponents/PostCommentsDrawer"

   function Progress() {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }      
const ReaderFullPostView = ()=>{
      
    let { id } = useParams();
    console.log("idddd",id)
    const [post,setPost] = useState(null);
    
  React.useEffect(()=>{
    reactGA.pageview(window.location.pathname)
  },[])

    useEffect(()=>{
        console.log("rrrrrrrrrrr");
       
        axios.get(`http://127.0.0.1:5000/readerDashboard/full-post/${id}`)
        .then(res => {
            console.log("fullpost response" ,res.data.data[0])
         setPost(res.data.data[0])
        }).catch(err=>console.log (err))

    },[])   

    useEffect(()=>{
      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      const data = {post : id}
      axios.post(`http://127.0.0.1:5000/readerDashboard/add-to-history`,data,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      })

    },[])

    return(
        <>
            {/* <SimpleBackdrop open ={open} handleClose={handleClose}/> */}
        <CssBaseline />
        <Grid2 sx = {{minHeight:"100vh"}}>

        {
            post? (
                <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 xs={12} md={5} lg={8} spacing={0} sx = {{backgroundColor:"white",marginTop:"20px",marginLeft:"30px",padding:"20px",boxShadow:"0 4px 8px 0 rgba(92,219,149, 0.2), 0 6px 20px 0 rgba(92,219,149, 0.19)"}}  >
            <Grid2 container sx = {{marginBottom:"20px"}} flexDirection="row" columnSpacing={3}>
                <Grid2>
                <Avatar sx = {{height:"45px",width:"45px"}}  alt="Remy Sharp" src={post.parentBlog.owner.profileImage}/>   
            
                </Grid2>
                <Grid2 container  flexDirection="column" rowSpacing={0}  >
                  <Link to= {`/ReaderDashboard/author-profile/${post.parentBlog.owner._id}`}>
                    <Grid2 sx ={{fontSize:"14px",fontWeight:"bold"}}>
                       
                       { post.parentBlog.owner.firstname } { post.parentBlog.owner.lastname } 
                       
                    </Grid2>
                  </Link>  
                    <Grid2 sx ={{fontSize:"14px",fontWeight:"bold"}}>
                        {post.parentBlog.title}
                        
                    </Grid2>
                </Grid2>
            </Grid2>
             {parse(post.postContent)}

            <Grid2  sx = {{marginTop:"50px"}} spacing={3} >
            <Divider variant="middle" sx = {{margin:"20px 20px"}} />
            <div style={{display:"flex",flexDirection:"row"}}>
            <Tooltip title="Comment">
                < PostCommentDrawer/>
                </Tooltip>
                <Tooltip title="Like">
                <ThumbUpIcon sx = {{ marginLeft:"20px",fontSize: "40px",color:"#379863"}} />
                </Tooltip>
            </div>  
            </Grid2>
             </Grid2>
             
             <Grid2 className="sideScroll" xs={12} md={5} lg={3.3 }   sx = {{ position:"fixed",bottom:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"20px"} }     >
       
       {/* <Divider /> */}
       <h4 style={{color:"#379683"}} > Recommended Topics</h4>
       <RecommendedChips/>
       <div>
       <h4 style={{color:"#379683"}}>Posts From Same Blog</h4>
         {/* <TrendPostCard/>
         <TrendPostCard/>
         <TrendPostCard/>
         <TrendPostCard/>
         <TrendPostCard/> */}
         </div>
      
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
            ):(
                <Progress/>
            )
           
        }
      </Grid2> 
        </>
    )
}
export default ReaderFullPostView