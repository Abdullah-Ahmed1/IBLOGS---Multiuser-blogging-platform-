import * as React from 'react';
import { styled } from '@mui/material/styles';
import "./TrendPostCard.css"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function RecipeReviewCard({item}) {
 

  return (
    // <>
    // {console.log("1111111111111111111111111111",item)}
    // </>
    <Card  className='trendPostCard_item' sx={{ maxWidth: 370, marginBottom:"10px" }}>
      <Link style= {{textDecoration:"none",color:"black",fontSize:"5px"}} to={`/ReaderDashboard/full-post/${item._id}`}>
      <CardHeader sx = {{maxHeight:"50px",fontSize:"11px",textDecoration:"none",'.MuiCardHeader-title':{fontSize:"12px",fontWeight:"bold",color:"#05386b"},'.MuiCardHeader-subheader':{fontSize:"12px"}}}
        avatar={
          <Avatar sx={{ bgcolor: red[500],height:"30px",width:"30px" }} 
          alt={item.parentBlog.firstname} 
          src={item.parentBlog.owner.profileImage} />
        }
      
        title={`${item.parentBlog.owner.firstname} ${item.parentBlog.owner.lastname}`}
        subheader="September 14, 2016"
      />
     
      <CardContent>
        <Typography  sx = {{fontSize:"14px", color:"grey",fontWeight:"bold",textDecoration:"none"}} variant="h2" color="text.secondary">
         {item.postTitle}
         {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi repudiandae aliquam quaerat commodi nemo perferendis eos beatae vero ut libero dignissimos sequi, cum pariatur excepturi ex voluptate, quibusdam itaque numquam. */}
        </Typography>
      </CardContent>
    </Link>
  
     </Card>
  );
}
