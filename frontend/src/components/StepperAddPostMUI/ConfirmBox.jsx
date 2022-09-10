import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmBox({openBox,handleOpenBox,handleSchedule,handleSetSchedule}) {
  
    const handleAgree = ()=>{
        handleSchedule()
        handleOpenBox(false)
    }

  return (
    <div>
     
      <Dialog
        open={openBox}
        onClose={()=>{handleSetSchedule(true);handleOpenBox(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Schedule this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           If you agree, your Post will be scheduled to the date and time you selected!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleSetSchedule(true);handleOpenBox(false)}}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
