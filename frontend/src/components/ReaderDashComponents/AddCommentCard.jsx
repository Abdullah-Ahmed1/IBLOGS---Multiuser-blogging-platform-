import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import axios from "axios"
import { useParams } from 'react-router-dom';
import { useContext,useState } from 'react';
//import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { UserContext } from "../../Pages/ReaderDashboard/ReaderDashboard";
import CardActions from '@mui/material/CardActions';
//import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
//import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';

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

export default function CommentCard({refreshComments}) {
//   const [expanded, setExpanded] = React.useState(false);

let { id } = useParams();
  const [comment,setComment] = useState("");   
  const value = useContext(UserContext)
    console.log("yeeeeeeeeee",value)

    const handleCommentPublish=()=>{
        let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      const data= {
        comment : comment
      }
        axios.post(
          `http://127.0.0.1:5000/readerDashboard/add-comment/${id}`,data ,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token,
            },
          }
        ).then(res=>{
            console.log(res);
            refreshComments()
        })
      refreshComments()
    }


//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

  return (
    <Card sx={{ maxWidth: 380, marginBottom:"10px" }}>
      <CardHeader sx = {{maxHeight:"50px",fontSize:"12px"}}
        avatar={
          <Avatar sx={{ bgcolor: red[500],height:"30px",width:"30px" }} aria-label="recipe"  src ={value.profileData.profileImage} />
            
        }
      
        title=  {`${value.profileData.firstname} ${value.profileData.lastname}`}
        subheader={new Date().toDateString()}
      />
     
      <CardContent>
        <TextField  value={comment} onChange={(e)=>setComment(e.target.value)}  size='small' rows={4} placeholder="whats on your mind?" multiline fullWidth/>
      </CardContent>
    
      <CardActions>
        <Button   onClick = {handleCommentPublish}   variant = "contained">Publish</Button>
      </CardActions>
    </Card>
  );
}
