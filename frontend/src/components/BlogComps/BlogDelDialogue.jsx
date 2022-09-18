import * as React from 'react';
import {useContext} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {BloggerContext} from '../../Pages/BloggerDashboard1';

export default function BlogDeleteDialogue({open,handleClose,title,blogId}) {
  
    const value = useContext(BloggerContext);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

 

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
          {"Do you really want to delete this blog?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your blog with title "{title}" will be permanently deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={()=>{value.handleBlogDelete(blogId);handleClose()}} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> 
    </div>
  );
}
