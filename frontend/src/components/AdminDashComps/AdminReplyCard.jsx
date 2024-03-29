import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import axios from "axios"
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import CommentAddReplyCard from './CommentAddReplyCard';




export default function AdminReplyCard({reply}) {

    console.log("reached")
  
 
 

  return (
    <Card sx={{ maxWidth: 380, marginBottom:"10px" }}>
      <CardHeader sx = {{maxHeight:"50px",fontSize:"12px"}}
        avatar={
          <Avatar sx={{ bgcolor: red[500],height:"30px",width:"30px" }} aria-label="recipe"  src = {reply.author.profileImage}/>
            
        }
      
         title={`${reply.author.firstname} ${reply.author.lastname}`}
        subheader={new Date(reply.uploadDate).toDateString()}
      />
     
      <CardContent>
        <Typography  sx = {{fontSize:"13px", color:"black"}} variant="body2" color="text.secondary">
            {reply.replyText}
        </Typography>
      </CardContent>
    
      
     
    </Card>
  );
}
