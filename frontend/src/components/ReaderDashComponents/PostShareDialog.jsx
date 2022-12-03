import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Grid2 from '@mui/material/Unstable_Grid2';
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  } from 'next-share';



export default function PostShareDialog({shareDialogOpen,handleShareDialogClose}) {
  
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  return (
    <Dialog  sx  = {{width:"100%"}} onClose={handleShareDialogClose} open={shareDialogOpen}  >
      <DialogTitle>Select to Share</DialogTitle>
      <DialogContent>
        <Grid2   container direction="row" spacing={4} justifyContent="space-between" >
            <Grid2>
                <WhatsappShareButton
                    url={'https://Iblogs.com'}
                    title={'An intelligent blogging platform'}
                    separator=":: ">
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </Grid2>
            <Grid2>
                <FacebookShareButton
                    url={'https://Iblogs.com'}
                    title={'An intelligent blogging platform.'}
                    separator=":: ">
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </Grid2>
            <Grid2>
                <TwitterShareButton
                url={'https://Iblogs.com'}
                title={'An intelligent blogging platform.'}
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
            </Grid2>
            <Grid2>
                <LinkedinShareButton url={'https://github.com/next-share'}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </Grid2>
        </Grid2>

        </DialogContent>
      
    </Dialog>
  );
}
