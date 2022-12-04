import * as React from 'react';
import {useState,useEffect} from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
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
import SavedListComponent from './SavedListComponent ';

import { SignalCellularNullSharp } from '@material-ui/icons';
import CustomListDuplicateSnack from './CustomListDuplicateSnack';



export default function MenuListComposition({postId,item,customList,handleCustomChange,open,checked,handleToggle,handleChange,handleListKeyDown,handleClose,anchorRef}) {
  
  const [listTitle,setListTitle] = useState("");
  const [lists,setLists] = useState(null)
  const [customChecked,setCustomChecked] =useState(true) 
  const [nameError,setNameError] = useState(false)
  const [nameErrorText,setNameErrorText] = useState("")
  console.log("saved??????????????????????????????????",true)
//--------------------------------------------------------------------------
  const [customListDuplicateSnackOpen,setCustomListDuplicateSnackOpen] = useState(false)
  const customListDuplicateSnackHandleClose = ()=>{
    setCustomListDuplicateSnackOpen(false)
  }
//------------------------------------------------------------------     
    
  
  const handleDone = ()=>{
    // console.log(postId)
    if(listTitle===""){
      setNameError(true)
      setNameErrorText("this field is required")
    }else{
      setNameError(false)
      setNameErrorText("")
      
      const same =  lists.map(list=>{
        return list.listName === listTitle 
      })
      // console.log("sameeeesssss",same.includes(true))
      //-------------------------------------------------------------------
      if(!same.includes(true) ){
        let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      axios.post(`http://127.0.0.1:5000/readerDashboard/create-custom-list`,{
            listName: listTitle
      },{
        headers: {
                  "Content-Type": "application/json", 
                  Accept: "application/json",
                  Authorization: token,
              },
      }).then(res=>{
        console.log(res)
        axios.get('http://127.0.0.1:5000/readerDashboard/get-customLists',{
          headers: {
            "Content-Type": "application/json", 
            Accept: "application/json",
            Authorization: token,
        },
        })
        .then(res=>{
          console.log("---/---",res.data)
          setListTitle("")
          setLists(res.data.your_lists)
        })  
      
      })
      }else{
        setCustomListDuplicateSnackOpen(true)
      }
      
    }
    
  }
 
  const refreshLists = ()=>{
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
    axios.get('http://127.0.0.1:5000/readerDashboard/get-customLists',{
      headers: {
        "Content-Type": "application/json", 
        Accept: "application/json",
        Authorization: token,
    },
    })
    .then(res=>{
      //console.log("---/---",res.data)
      setLists(res.data.your_lists)
    })
  } 

  useEffect(()=>{
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
    axios.get('http://127.0.0.1:5000/readerDashboard/get-customLists',{
      headers: {
        "Content-Type": "application/json", 
        Accept: "application/json",
        Authorization: token,
    },
    })
    .then(res=>{
      console.log("---/---",res.data)
      setLists(res.data.your_lists)
    })
  },[])
  
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
    <CustomListDuplicateSnack open={customListDuplicateSnackOpen}  handleClose={customListDuplicateSnackHandleClose}/>
    <Stack direction="row" spacing={2}>
     
      <div>
       
       
          
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          
          // disablePortal
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
                  <div>
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
                      lists?(
                        lists.map(list=>{
                          return (
                            <MenuItem key ={list._id}>
                              <SavedListComponent  refreshLists={refreshLists} postId={postId}  list ={list}    />
                            </MenuItem> 
                          )
                        })
                      ):(
                        null
                      )
                      
                    }
                   
                  
                    <Divider />
                    <MenuItem 
                       onClick={()=>handleCustomChange(customList)}
                      >
                      Create new List
                    </MenuItem>
                    {/* <MenuItem  sx = {customList ? {display:"block"}:{display:"none"}} >
                    <div>
                    <Grid2     container spacing={0}>
                        <Grid2>
                            <Input onChange={(e)=>setListTitle(e.target.value)}  placeholder='Enter list title' />
                        </Grid2>
                        <Grid2 justifyContent={"center"} alignItems="center" >
                            <DoneIcon  onClick = {handleDone} />
                        </Grid2>
                        <Grid2   justifyContent={"center"} alignItems="center" >
                            <CloseIcon/>
                        </Grid2>
                    </Grid2>
                    </div>
                    </MenuItem> */}
                  </MenuList>
                  <div  style = {customList ? {display:"block",padding:"5px 10px"}:{display:"none"}} >
                    
                    <Grid2     container spacing={0}>
                        <Grid2>
                            <TextField id="standard-basic"  variant="standard" error={nameError} helperText = {nameError? nameErrorText:""} onChange={(e)=>setListTitle(e.target.value)}   placeholder='Enter list title' />
                        </Grid2>
                        <Grid2 justifyContent={"center"} alignItems="center" >
                            <DoneIcon  onClick = {handleDone} />
                        </Grid2>
                        <Grid2   justifyContent={"center"} alignItems="center" >
                            <CloseIcon/>
                        </Grid2>
                    </Grid2>
                    
                    </div>
                    </div>
                </ClickAwayListener>
               
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
    </>
  );
}
