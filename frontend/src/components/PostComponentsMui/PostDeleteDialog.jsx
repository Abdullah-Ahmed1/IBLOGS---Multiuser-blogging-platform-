import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
//import {BloggerContext} from '../../Pages/BloggerDashboard1';

export default function PostDeleteDialog({open,item,handlePostDelete,handleClose}) {
  
    // const value = useContext(BloggerContext);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const handleClick =()=>{
        handlePostDelete(item._id)
        handleClose();
    } 
 

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to remove this post from reading list?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This post will be removed from reading list
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} >Disagree</Button>
          <Button onClick={handleClick} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> 
    </div>
  );
}
