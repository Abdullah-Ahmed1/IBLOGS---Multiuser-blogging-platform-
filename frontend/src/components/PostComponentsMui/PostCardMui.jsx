import * as React from 'react';
import '../../Pages/scroll.css'
import {Link} from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';




export default function PostCard() {


  return (
    
    <Card sx={{ minWidth:400,maxWidth: 400 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={"https://res.cloudinary.com/dlgwvuu5d/image/upload/v1660213469/my-uploads/phzatp2folb3pglrxkea.jpg"}
      />
      <CardContent  textoverflow="ellipsis"  >
     
        <Typography gutterBottom variant="h5" sx = {{   color:"black",textDecoration:"none"}}   component="div">
        this is a dummy title
        </Typography>
      
        <Typography variant="body2" className='scrolling'  sx = {{height:"100px",overflow:"auto"}}   color="text.secondary">
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque reprehenderit quis ipsa quae? Necessitatibus vel velit delectus doloribus inventore optio explicabo? Fuga corrupti inventore, ullam recusandae culpa eligendi accusantium! Saepe?
        </Typography>
      </CardContent>
      <CardActions>
        <Button   sx = {{color:"black"}}  size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    
  );
}

