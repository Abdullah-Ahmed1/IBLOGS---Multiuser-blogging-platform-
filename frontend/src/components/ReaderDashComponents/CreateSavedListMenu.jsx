import * as React from 'react';
import {useState,useEffect} from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Grid2 from '@mui/material/Unstable_Grid2';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';



export default function MenuListComposition({postId}) {

  const [open, setOpen] = React.useState(false);
  const [checked,setChecked] = useState(false);
  const anchorRef = React.useRef(null);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    
    checked? (
      console.log("cheked")
    ):(
      console.log("not cheked")
    )

  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setChecked(true)

    
      // let value = JSON.parse(localStorage.getItem("token"));
      // let token = value.token;
      // axios.post(`http://127.0.0.1:5000/readerDashboard/add-to-reading-list/${postId}`,{
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //     Authorization: token,
      //   },
      // }).then(res => console.log(res))
    
    
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  useEffect(()=>{
    if(checked){
    let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      console.log("token: ",token)
      axios.post(`http://127.0.0.1:5000/readerDashboard/add-to-reading-list/${postId}`,{},{
        headers: {
          "Content-Type": "application/json", 
          Accept: "application/json",
          Authorization: token,
        },
      }).then(res => console.log(res))
    }
  },[checked,postId])
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
     
      <div>
        <Button
        sx = {{margin:"0px",padding:"0px"}}
         ref={anchorRef}
         id="composition-button"
         aria-controls={open ? 'composition-menu' : undefined}
         aria-expanded={open ? 'true' : undefined}
         aria-haspopup="true"
         onClick={handleToggle}
        >
         {checked ? <BookmarkAddedIcon sx = {{color:"#379863"}}/> : <BookmarkAddIcon sx = {{color:"#05386b"}}/>} 
        </Button>
       
          
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper sx={{ width: 300 }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                     dense
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem > 
                      <Checkbox checked={checked} onChange={handleChange}  inputProps={{ 'aria-label': 'controlled' }}  />
                      Reading List
                    </MenuItem>
                    <Divider />
                    <MenuItem 
                      // onClick={handleClose}
                      >
                      Create new List
                    </MenuItem>
                    <MenuItem >
                    <Grid2 container spacing={0}>
                        <Grid2>
                            <Input placeholder='Enter list title' />
                        </Grid2>
                        <Grid2 justifyContent={"center"} alignItems="center" >
                            <DoneIcon/>
                        </Grid2>
                        <Grid2   justifyContent={"center"} alignItems="center" >
                            <CloseIcon/>
                        </Grid2>
                    </Grid2>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
