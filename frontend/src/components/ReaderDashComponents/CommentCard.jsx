import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentAddReplyCard from './CommentAddReplyCard';
import ReplyCard from './ReplyCard';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function CommentCard({comment}) {

  const [expanded, setExpanded] = React.useState(false);
  const [replies, setReplies]= React.useState(null);

  
  const handleExpandClick = () => {
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
    axios.get(`http://127.0.0.1:5000/readerDashboard/get-allReplies-to-specific-comment/${comment._id}`,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    })
    .then(res=>{
      console.log("replies",res.data)
      setReplies(res.data)
    })
    
    setExpanded(!expanded);



  };
     //console.log("commenttttttt",props.comment)


  return (
    <Card sx={{ maxWidth: 380, marginBottom:"10px" }}>
      <CardHeader sx = {{maxHeight:"50px",fontSize:"12px"}}
        avatar={
          <Avatar sx={{ bgcolor: red[500],height:"30px",width:"30px" }} aria-label="recipe"  src = {comment.author.profileImage}/>
            
        }
      
         title={`${comment.author.firstname} ${comment.author.lastname}`}
        subheader={new Date(comment.uploadDate).toDateString()}
      />
     
      <CardContent>
        <Typography  sx = {{fontSize:"13px", color:"black"}} variant="body2" color="text.secondary">
            {comment.comment}
        </Typography>
      </CardContent>
    
      <CardActions  disableSpacing>
        {/* <p>View replies</p> */}
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <h4 style = {{margin:"0px",padding:"0px",color:"#05386b"}}>Reply :</h4>
          
          <CommentAddReplyCard commentId = {comment._id} />
          
            <h4 style={{margin:"0px",padding:"0px"}}>Previous replies :</h4>
            
              {
               replies ? (
                replies.length !== 0? (
                  replies.map(reply=>{
                    return(
                      <ReplyCard  reply ={reply}/>
                    )
                  })
                ):
                (
                  <h2>no replies yet</h2>
                )
               ):
               (
                  <CircularProgress />
               )
              }
          </CardContent>
      </Collapse>
    </Card>
  );
}
