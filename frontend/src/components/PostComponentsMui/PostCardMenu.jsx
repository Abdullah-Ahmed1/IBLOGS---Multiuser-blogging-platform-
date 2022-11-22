import * as React from 'react';
// import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import ReportDialog from './ReportDialog';
import axios from "axios";
import ReportSnack from './ReportSnack';

export default function PostCardMenu({ownerId,postId}) {
  const [open, setOpen] = React.useState(false);
  const [reportSnackOpen, setReportSnackOpen] = React.useState(false);
  const [openReportDialog, setOpenReportDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpenDialReport = () => {
    setOpenReportDialog(true);
  };

  const handleCloseReportSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setReportSnackOpen(false);
  };

  const handleCloseDialogReport = async(value1) => {
    setOpenReportDialog(false);
    console.log("---",postId)
    setSelectedValue(value1);
    const  data = {
      postId : postId,
      ownerId: ownerId,
      reason: value1  
    }
    
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
    await axios.post('http://127.0.0.1:5000/readerDashboard/report',data,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    })
      setReportSnackOpen(true)
    

  };

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    handleClickOpenDialReport();
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

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
    <ReportSnack  open= {reportSnackOpen} handleClose = {handleCloseReportSnack} />
    <ReportDialog  open={openReportDialog}  selectedValue={selectedValue}  handleClose={handleCloseDialogReport}   handleClickOpen={handleClickOpenDialReport}  />
    <Stack direction="row" spacing={2}>
     
      <div>
        {/* <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Dashboard
        </Button> */}
        <MoreVertIcon
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={()=>{
          handleToggle();
          // handleClickOpenDialReport();
        }}
        />
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
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Report this post</MenuItem>
                    {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                  </MenuList>
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