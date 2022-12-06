import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function AddAccordionDialog({open,handleClose,handleSubmit,emailTitle,emailContent,emailDate,emailSubject,handleEmailDateChange,handleEmailSubjectChange,handleEmailTitleChange,handleEmailContentChange}) {
  


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

 

 

  return (
    <div>
     
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add new Email Content"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Title"
            type="email"
            fullWidth
            variant="standard"
            value={emailTitle}
            onChange={handleEmailTitleChange}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Subject"
            type="email"
            fullWidth
            variant="standard"
            value={emailSubject}
            onChange={handleEmailSubjectChange}
          />
            
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
             label="Date desktop"
            inputFormat="MM/DD"
            value={emailDate}
            onChange={handleEmailDateChange}
            renderInput={(params) => <TextField variant='standard' {...params} />}
        />
            </LocalizationProvider>
            
          <TextField
            autoFocus
            multiline
            rows={4}
            margin="dense"
            id="name"
            label="Email Content"
            type="email"
            fullWidth
            variant="standard"
            value={emailContent}
            onChange={handleEmailContentChange}
          />
         
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus  variant='contained'  onClick={handleClose}>
            Disagree
          </Button> */}
          <Button onClick={handleSubmit} variant='contained' autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}