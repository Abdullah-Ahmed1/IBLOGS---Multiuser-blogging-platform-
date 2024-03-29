import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const reasons = ['Its spam', 'hate speech','scam or fraud'];

function SimpleDialog(props) {
  const { onClose,onClose1, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
    console.log("--*")
  };

  const handleListItemClick = (value) => {
    onClose(value);
   
  };

  return (
    <Dialog onClose={onClose1} open={open}>
      <DialogTitle>Choose Reason for Report</DialogTitle>
      <List sx={{ pt: 0 }}>
        {reasons.map((reason) => (
          <ListItem button onClick={() => handleListItemClick(reason)} key={reason}>
            {/* <ListItemAvatar>
              {/* <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon /> */}
              {/* </Avatar> */}
            {/* </ListItemAvatar> */} 
            <ListItemText primary={reason} />
          </ListItem>
        ))}

        {/* <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem> */}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ReportDialog({open,handleClose,handleClose1}) {
//   const [open, setOpen] = React.useState(false);
   const [selectedValue, setSelectedValue] = React.useState(reasons[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

// //   const handleClose = (value) => {
// //     setOpen(false);
// //     setSelectedValue(value);
// //   };

  return (
    <div>
      
      <br />
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        onClose1 = {handleClose1}
      />
    </div>
  );
}