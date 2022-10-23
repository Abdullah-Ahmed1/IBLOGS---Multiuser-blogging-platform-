import * as React from 'react';
import {useState,useContext,useEffect} from 'react';
// import "./BlogCardMui.css";
// import Aos from 'aos';
// import '../../Pages/scroll.css'
import {Link} from "react-router-dom"
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Badge from "@mui/material/Badge";
import Typography from '@mui/material/Typography';
// import BlogDeleteDialogue from './BlogDelDialogue';
// import {BloggerContext} from '../../Pages/BloggerDashboard1';
// import BlogShareDialog from './../ShareComps/BlogShare';




export default function PostCardMobile() {



  return (
     <>
      {/* <BlogDeleteDialogue  title = {item.title} blogId ={item._id}  open = {open} handleClose={handleClose} /> */}
     
      <Card   className='BlogCard_item' sx={{ minWidth:400,maxWidth: 400 ,boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      <CardHeader sx = {{maxHeight:"50px",fontSize:"11px",textDecoration:"none",'.MuiCardHeader-title':{fontSize:"12px",fontWeight:"bold",color:"#05386b"},'.MuiCardHeader-subheader':{fontSize:"12px"}}}
        avatar={
          <Avatar sx={{ bgcolor: "grey",height:"30px",width:"30px" }} 
          alt={"item.parentBlog.firstname"} 
          src={"item.parentBlog.owner.profileImage"} />
        }
      
        title={`${"Abdullah"} ${"Ahmed"}`}
        subheader="September 14, 2016"
      />
      <CardContent  textoverflow="ellipsis"  >
      {/* <Link   style = {{textDecoration:"none",color:"black"}}  to= {`/Bloggerdashboard/blogPosts/${item._id}`}> */}
        <Typography gutterBottom variant="h6" sx = {{   color:"black",fontWeight:"bold",textDecoration:"none"}}   component="div">
          {/* {item.title} */}
          dummy title
        </Typography>
        {/* </Link> */}
        <Typography variant="body2" className='scrolling'  sx = {{height:"100px",overflow:"auto"}}   color="text.secondary">
         {/* {item.description} */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sequi illo beatae eveniet minima unde distinctio magni tempora quibusdam laborum rem itaque molestiae, nostrum consequatur cum dignissimos, recusandae facere sed!
        </Typography>
      </CardContent>
      <CardActions  >
        <Button   sx = {{color:"black"}}  size="small"><ArticleIcon/></Button>
        <Button  sx = {{color:"black"}} size="small"  ><ShareIcon/></Button>
        <Button    sx = {{color:"black"}} size="small"  ><DeleteIcon/></Button>
        
      </CardActions>
    </Card>
    
    {/* <BlogShareDialog  shareDialogOpen = {shareDialogOpen}  handleShareDialogClose={handleShareDialogClose} /> */}

    </>
  );
}

