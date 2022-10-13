import * as React from 'react';
import {useState,useContext} from 'react';
import "./AdminBlogCard.css"
import '../../Pages/scroll.css'
import {Link} from "react-router-dom"
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
//import BlogShareDialog from './../ShareComps/BlogShare';
import DeleteAdminBlogDialog from './DeleteAdminBlogDialog';




export default function AdminBlogCard({item,handleDeleteBlog}) {

//   const [shareDialogOpen, setShareDialogOpen] = React.useState(false);

//   const handleShareDialogClose = (value) => {
//     setShareDialogOpen(false);
//    // setSelectedValue(value);
//   };

  const [open, setOpen] = useState(false);

//   const value = useContext(BloggerContext);


  const handleClose = () => {
    setOpen(false);
  };
//     //console.log("*****",item.image)

  return (
     <>
      <DeleteAdminBlogDialog  title = {item.title}  handleDeleteBlog={handleDeleteBlog} blogId ={item._id}  open = {open} handleClose={handleClose} />
      <div className='blogCard_item'>
        <Card   sx={{ minWidth:400,maxWidth: 400 ,boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      <CardMedia  
        component="img"
        alt="green iguana"
        height="140"
        image={item.image? item.image : "https://res.cloudinary.com/dlgwvuu5d/image/upload/v1660213469/my-uploads/phzatp2folb3pglrxkea.jpg"}
      />
      <CardContent  textoverflow="ellipsis"  >
      {/* <Link   style = {{textDecoration:"none",color:"black"}}  to= {`/Bloggerdashboard/blogPosts/${item._id}`}> */}
        <Typography gutterBottom variant="h6" sx = {{   color:"black",fontWeight:"bold",textDecoration:"none"}}   component="div">
          {item.title}
          {/* askdasldknaslanda */}
        </Typography>
        {/* </Link> */}
        <Typography variant="body2" className='scrolling'  sx = {{height:"100px",overflow:"auto"}}   color="text.secondary">
         {item.description}
         {/* asdaskdsjfskjsdfjbsfsdj */}
        </Typography>
      </CardContent>
      <CardActions  >
        <Button   sx = {{color:"black"}}  size="small"><ArticleIcon/>{item.posts.length}</Button>
        <Button  onClick = {()=>setOpen(true)}  sx = {{color:"black"}} size="small"  ><DeleteIcon/></Button>
      </CardActions>
    </Card>
    
    {/* <BlogShareDialog  shareDialogOpen = {shareDialogOpen}  handleShareDialogClose={handleShareDialogClose} /> */}
    </div>
    </>
  );
}
