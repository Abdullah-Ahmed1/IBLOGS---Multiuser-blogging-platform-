import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect,useState,useRef } from 'react';
import lottie from 'lottie-web';
export default function AddNewListDialog({open,handleClose,handleAdd}) {
    const container = useRef(null)
    const [listName,setListName] = useState("")
    useEffect(()=>{
    
        lottie.loadAnimation({
          container : container.current,
          renderer: 'svg',
          loop:true,
          autoplay:true,
          animationData:require('../../lottie/saved.json')
      
        })
        
      },[])
  return (
    <div>
    
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            <div style = {{display:"flex",flexDirection:"row"}}>
            <div>
                Add New List
            </div>
            {/* <div className='container' ref={container} style={{margin:0,padding:0,width:"80px"}}  ></div> */}
            </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter name for your reading list
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="List Name"
            type="list"
            fullWidth
            variant="standard"
            value = {listName}
            onChange = {(e)=>setListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleAdd(listName)}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}