import {useParams } from 'react-router-dom';
import {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import PostCard from "../components/PostComponentsMui/PostCardMui"
import MyEditor from '../components/Editorjs/Editor';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


//---------------------- FULL SCREEN MUI DIALOGUE BOX     ------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
   function FullScreenDialog({handleClose,handleClickOpen,dialogOpen}) {
   
  
    return (
      <div>

        <Dialog
          fullScreen
          open={dialogOpen}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' ,backgroundColor:"black",color:"white" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Create Post
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <MyEditor/>
        </Dialog>
      </div>
    );
  }
//-----------------------------------------------------------------




const BlogPost= ()=>{
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    let { blogId } = useParams();
    useEffect(()=>{
        console.log(blogId)

        // axios.get("/")


    })
    
    return(
        <div  style= {{backgroundColor:"green",width:"100%"}}>  
            <FullScreenDialog  dialogOpen = {open} handleClickOpen = {handleClickOpen}  handleClose = {handleClose}  />
            <Grid container sx = {{width:"100%" }} justifyContent="space-between">
            <Grid item >
               Posts 
            </Grid>
            <Grid item>
                
            <AddCircleIcon fontSize='large'   onClick = {()=> setOpen(true)} /> 
            </Grid>
            </Grid>

            <PostCard/>
        </div>
    )
}
export default BlogPost;