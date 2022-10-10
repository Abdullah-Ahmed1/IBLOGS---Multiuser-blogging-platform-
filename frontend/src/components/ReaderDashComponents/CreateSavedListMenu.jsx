import * as React from 'react';
import {useState,useEffect} from "react";
import axios from "axios";

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
import CheckboxesGroup from './GroupedCheckBox';



export default function MenuListComposition({postId,item,customList,handleCustomChange,open,checked,handleToggle,handleChange,handleListKeyDown,handleClose,anchorRef}) {

  var a = [1,2,3,4]
  console.log("saved??????????????????????????????????",true)

 
  // const [saved,setSaved] = useState(saved)


  // useEffect(()=>{
  //   setSaved()
  // })

  useEffect(()=>{
    // if(checked){
    // let value = JSON.parse(localStorage.getItem("token"));
    //   let token = value.token;
    //   console.log("token: ",token)
    //   axios.post(`http://127.0.0.1:5000/readerDashboard/add-to-reading-list/${postId}`,{},{
    //     headers: {
    //       "Content-Type": "application/json", 
    //       Accept: "application/json",
    //       Authorization: token,
    //     },
    //   }).then(res => {
    //     console.log(res)
    //          })
    // }else{
    //   let value = JSON.parse(localStorage.getItem("token"));
    //   let token = value.token;
    //   axios.delete(`http://127.0.0.1:5000/readerDashboard/remove-from-readingList/${postId}`,{
    //     headers: {
    //       "Content-Type": "application/json", 
    //       Accept: "application/json",
    //       Authorization: token,
    //     },
    //   }).then(res=>{
    //     console.log(res)
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // }
  },[checked])

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
                    
                    {
                     
                      a.map(item=>{
                        return(
                          <MenuItem key = {item}>
                            <Checkbox   inputProps={{ 'aria-label': 'controlled' }}  />
                               MyList1
                              {/* <CheckboxesGroup/> */}
                          </MenuItem>
                        )

                      })
                    }
                    
                    <Divider />
                    <MenuItem 
                       onClick={()=>handleCustomChange(customList)}
                      >
                      Create new List
                    </MenuItem>
                    <MenuItem  sx = {customList ? {display:"block"}:{display:"none"}} >
                    <Grid2     container spacing={0}>
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
