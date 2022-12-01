import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CommentCard from './CommentCard';
import AddCommentCard from './AddCommentCard';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

function Progress() {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }      

export default function PostCommentDrawer() {
    let {id} = useParams();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [comments,setComments] = useState(null);



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  
  const refreshComments = ()=>{
    console.log("--------refresh reached*-----------------")
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
      axios.get(
        `http://127.0.0.1:5000/readerDashboard/get-comments/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      ).then(res=>{
        console.log("commentsssssssssss",res.data)
        setComments(res.data)
      })
  }

  useEffect(()=>{
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
      axios.get(
        `http://127.0.0.1:5000/readerDashboard/get-comments/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      ).then(res=>{
        console.log("commentsssssssssss",res.data)
        setComments(res.data)
      })
  },[])


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : "auto" }}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
        <Grid2 container  direction="column" sx = {{p:2}}>
            <Grid2>
                <h3 style={{color:"#5cdb95"}} >Add Comment:</h3>         
            </Grid2>
            <Grid2>
                <AddCommentCard  refreshComments = {refreshComments}/>         
            </Grid2>
            <Grid2>
                <h3 style={{color:"#5cdb95"}} >Comments:</h3>  
            </Grid2>
            <Grid2 >
                {
                    comments ? (
                    comments.comments.map(item=>{
                         //console.log("a@@@",item)
                         return(
                          <CommentCard  comment = {item} key={item._id} />
                         )
                          
                    })
                    ):(
                        <Progress/>
                    )
                }
             
            </Grid2>
       
        </Grid2>
      
    </Box>
  );

  return (
    <div>
      {[ 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><InsertCommentIcon  sx = {{marginLeft:"10px" ,  fontSize: "40px",color:"#5cdb95"}}/></Button>
          <Drawer
          variant='temporary'
          sx = {{
            "& .MuiDrawer-paper":{
              backgroundColor:"#05386b",
              width: {xs : "100%", sm: "100",md: 425,lg: 425 }
              // width: 425,
            }
          }}
          ModalProps={{
            keepMounted: true,
          }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
