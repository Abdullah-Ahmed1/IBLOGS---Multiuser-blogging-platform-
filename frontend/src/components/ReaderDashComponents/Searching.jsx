 import TextField from '@mui/material/TextField';
 import axios from 'axios';
 import { useNavigate } from 'react-router-dom';
 import Avatar from '@mui/material/Avatar';
 import { green } from '@mui/material/colors';
 import Divider from '@mui/material/Divider';
 import AssignmentIcon from '@mui/icons-material/Assignment';
 import { useCallback, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export default function MenuListComposition({borderColor,width,height}) {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const[people,setPeople] = useState(null);
  const[posts,setPosts] = useState(null);

  const handleToggle = () => {
    // setOpen((prevOpen) => !prevOpen);
    setOpen(true)
  };
  const handleChangeInput = (value)=>{
    if(!value ){
      console.log("---")
    }else{
      axios.get(`http://127.0.0.1:5000/readerDashboard/search/${value}`)
    .then(res=>{
        console.log("response---    ",res.data)
        setPeople(res.data.users)
        setPosts(res.data.posts)
    })
    }
    
    
  }
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

 

  const optimizedFn = useCallback(debounce(handleChangeInput), []);


  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // function handleListKeyDown(event) {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //     setOpen(false);
  //   } else if (event.key === 'Escape') {
  //     setOpen(false);
  //   }
  // }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    // <Stack direction="row" spacing={2}>
     
      <div style={{width:"90%"}}>
        
                     <TextField 
                      ref={anchorRef}
                      fullWidth
                      InputLabelProps = {{
                        sx:{ color:"green"}
                      }}
                      sx = {{'MuiInputLabel':"green",'& .MuiOutlinedInput-root':{'& fieldset':{  borderColor: borderColor}}}}
                      aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onChange={(e)=> optimizedFn(e.target.value)}
        
          onFocus={handleToggle}
                     id="outlined-basic" size='small'  placeholder='search' variant="outlined" />

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
              <Paper sx = {{width:width,maxHeight:height,overflow:"auto"}}>
                
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    // onKeyDown={handleListKeyDown}
                  >
                    <MenuItem >People</MenuItem>
                    <Divider />
                    
                    {
                        people? (
                            people.length>0 ? (
                                people.map(item=>{
                                    return(
                                        <MenuItem key ={item._id} onClick={()=>navigate(`/ReaderDashboard/author-profile/${item._id}`)} >
                                        <div style={{margin:0,padding:0,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                        <Avatar
                                        alt={item.firstname}
                                        src={item.profileImage}
                                        sx={{ width: 24, height: 24,marginRight:"10px" }}
                                        />
                                        <p style = {{fontSize:"14px"}}>{item.firstname} {item.lastname}</p>    
                                    </div>
                                    </MenuItem>
                                    )
                                })
                                                          ):(
                               <p></p>
                            )
                        ):(
                            <p></p>
                        ) 
                    }
                    
                    <MenuItem >Posts</MenuItem>
                    <Divider />
                    {
                        posts? (
                            posts.length>0 ? (
                                posts.map(item=>{
                                    return(
                                        <MenuItem key={item._id} onClick={()=>navigate(`/ReaderDashboard/full-post/${item._id}`)}>
                                            <div style={{margin:0,padding:0,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                                <Avatar sx={{ width:24,height:24    ,bgcolor: green[500],marginRight:"10px" }}>
                                                    <AssignmentIcon sx = {{fontSize:"18px"}} />
                                                </Avatar>
                                                <p style = {{fontSize:"14px"}}>{item.postTitle}</p>    
                                            </div>
                                        </MenuItem>
                                    )
                                })
                                                          ):(
                               <p style = {{fontSize:"12px"}}></p> 
                            )
                        ):(
                            <p></p>
                        ) 
                    }
                    <MenuItem >Tags</MenuItem>
                    <Divider />
                    {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    // </Stack>
  );
}
