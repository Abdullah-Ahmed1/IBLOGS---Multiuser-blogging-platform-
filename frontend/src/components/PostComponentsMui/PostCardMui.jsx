import * as React from 'react';
import './PostCardMui.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Divider from '@mui/material/Divider';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function PostCardMui({item}) {
  console.log("items",item)
  return (
    <Card  className = "card-container" sx={{ display: 'flex' ,position:"relative",maxHeight:"230px",minHeight:"230px"}}>
      
    <CardContent sx={{ flex: 1 }}>
    {item.publishDate}
      <Typography component="h6" variant="h6" sx ={{fontWeight:"bolder",maxHeight:"30px",minHeight:"30px",  display: "block",lineClamp: 2 ,overflow:"hidden",boxOrient:"vertical"}}  >
       {item.postTitle}
      </Typography>
      
      <Divider  variant='middle'  />
      {/* <Typography variant="subtitle1" color="text.secondary">
       
      </Typography> */}
      <Typography variant="subtitle1" className='scrolling' sx= {{minHeight:"105px",maxHeight:"105px",overflow:"auto"}}  paragraph>
        {item.postDescription}
      </Typography>
     
       <div  >
       <Button   sx = {{color:"#05386b"}}  size="small"><ThumbUpAltIcon/>5</Button>
        <Button  sx = {{color:"#05386b"}} size="small"><ShareIcon/></Button>
        <Button  sx = {{color:"#05386b"}} size="small"><EditIcon/></Button>
        <Button  sx = {{color:"#05386b"}} size="small"><DeleteIcon/></Button>
        <Button  sx = {{color:"#05386b"}} size="small"><VisibilityIcon/></Button>
        
    </div>
    </CardContent>
      
    {/* <CardMedia
      component="img"
     // height="100"
      sx={{ width: 170, display: { xs: 'none', sm: 'block' } }}
      image = {'https://res.cloudinary.com/dlgwvuu5d/image/upload/v1660811997/my-uploads/hrnxf8krmisji29cpgnw.png'}
      alt={"post.imageLabel"}
    /> */}
   
  </Card>
 
  );
}