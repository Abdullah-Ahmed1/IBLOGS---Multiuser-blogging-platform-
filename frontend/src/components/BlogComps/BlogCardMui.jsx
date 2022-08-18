import * as React from 'react';
import '../../Pages/scroll.css'
import {Link} from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';




export default function BlogCard({item}) {

    console.log("*****",item.image)

  return (
    
    <Card sx={{ minWidth:400,maxWidth: 400 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={item.image? item.image : "https://res.cloudinary.com/dlgwvuu5d/image/upload/v1660213469/my-uploads/phzatp2folb3pglrxkea.jpg"}
      />
      <CardContent  textoverflow="ellipsis"  >
      <Link   style = {{textDecoration:"none",color:"black"}}  to= {`/Bloggerdashboard/blogPosts/${item._id}`}>
        <Typography gutterBottom variant="h6" sx = {{   color:"black",fontWeight:"bold",textDecoration:"none"}}   component="div">
          {item.title}
        </Typography>
        </Link>
        <Typography variant="body2" className='scrolling'  sx = {{height:"100px",overflow:"auto"}}   color="text.secondary">
         {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button   sx = {{color:"black"}}  size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    
  );
}

