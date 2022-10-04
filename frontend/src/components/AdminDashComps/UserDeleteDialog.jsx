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

export default function UserDeleteDialog({open,handleClose,handleUserDelete,userId}) {
  
    const value = useContext(BloggerContext);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleAgree = ()=>{
        handleUserDelete(userId)
        handleClose()
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
          {"Do you really want to delete this blog?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This User will be permanently deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  sx = {{backgroundColor:"#379683"}} variant='contained' onClick={handleClose}>Disagree</Button>
          <Button   sx = {{backgroundColor:"#379683"}} variant='contained' onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> 
    </div>
  );
}
