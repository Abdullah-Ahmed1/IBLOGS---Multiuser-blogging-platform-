import * as React from 'react';
import './../../components/PostComponentsMui/PostCardMui.css'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
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
import PostDeleteDialog from './../../components/PostComponentsMui/PostDeleteDialog';
import { set } from 'lodash';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function AdminPostCard({item,handlePostDelete}) {
  const [postDeleteDialogOpen,setPostDeleteDialogOpen] =React.useState(false)
  const [shareDialogOpen,setShareDialogOpen] = React.useState(false) 
  const navigate = useNavigate();
  const handleShareDialogClose = ()=>{
    setShareDialogOpen(false)
  }
  const handlePostDeleteDialogClose = ()=>{
    setPostDeleteDialogOpen(false)
  }

 // console.log("items",item)
  return (
    <>
    <PostDeleteDialog item = {item} handlePostDelete={handlePostDelete}  open = {postDeleteDialogOpen} handleClose={handlePostDeleteDialogClose} />
    <Card  className = "card-container" sx={{ display: 'flex' ,position:"relative",maxHeight:"230px",minHeight:"230px"}}>
      
    <CardContent sx={{ flex: 1 }}>
    { new Date(item.publishDate).toDateString()}
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
       <Button   sx = {{color:"#05386b"}}  size="small"><ThumbUpAltIcon/>{item.comments.length}</Button>
        {/* <Button  onClick = {()=>setShareDialogOpen(true )}   sx = {{color:"#05386b"}} size="small"><ShareIcon/></Button> */}
        {/* <Button  sx = {{color:"#05386b"}} size="small"><EditIcon/></Button> */}
        <Button  onClick={()=>setPostDeleteDialogOpen(true)}  sx = {{color:"#05386b"}} size="small"><DeleteIcon /></Button>
        <Button  onClick={()=>navigate(`/admin/users/full-postView/${item._id}`)}  sx = {{color:"#05386b"}} size="small"><VisibilityIcon/></Button>
        <Chip  sx = {{backgroundColor:"#379683",color:"white"}}  label={item.publishStatus} />
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
  {/* <PostShareDialog shareDialogOpen ={shareDialogOpen} handleShareDialogClose={handleShareDialogClose} /> */}
  </>
 
  );
}
