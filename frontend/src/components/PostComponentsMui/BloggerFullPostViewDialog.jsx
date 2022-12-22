import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import parse from 'html-react-parser';

export default function BloggerFullPostViewDialog({item,open,handleClose}) {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        
      >
        {/* <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent >
         <div>
            <div>
              <h2 sx = {{backgroundColor:"#05386b"}}>Post Title</h2>
              {item.postTitle}
            </div>
            <div>
              <h2 sx = {{backgroundColor:"#05386b"}}>Post Image</h2>
              <img  src={item.postCardImage} />
              {item.postCardImage}
            </div>
            {
              item.summary? (
                <div>
                  <h2 sx = {{backgroundColor:"#05386b"}}>Summary</h2>
                  
                  {item.summary}
                </div>
              ):(
                null
              )
               
            }
           
            <div>
            <h2 sx = {{backgroundColor:"#05386b"}}>Post Description</h2>
              {item.postDescription}
            </div>
            <div>
            <h2 sx = {{backgroundColor:"#05386b"}}>Post Content</h2>
            {parse(item.postContent)}
            </div>

         </div>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Disagree
          </Button> */}
          <Button onClick={handleClose} sx = {{backgroundColor:"#05386b",'&:hover':{backgroundColor:"#05386b"}}} variant='contained' autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}