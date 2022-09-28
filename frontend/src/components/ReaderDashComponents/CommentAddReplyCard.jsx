import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { useContext,useState } from 'react';
//import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { UserContext } from "../../Pages/ReaderDashboard/ReaderDashboard";
import CardActions from '@mui/material/CardActions';
//import Collapse from '@mui/material/Collapse';

const CommentAddReplyCard = ({commentId})=>{
    let { id } = useParams();
  const [reply,setReply] = useState("");   
  const value = useContext(UserContext)
  //  console.log("yeeeeeeeeee",value)

    const HandleAddReply = ()=>{
      const data ={
        replyText : reply,
        uploadDate: new Date()
      }
      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      axios.post(
        `http://127.0.0.1:5000/readerDashboard/add-reply-to-comment/${commentId}`,data ,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      ).then(res =>{
          console.log(res)
        }).catch(err=> console.log(err))

    }
    return(
        <Card sx={{ maxWidth: 380, marginBottom:"10px" }}>
      <CardHeader sx = {{maxHeight:"50px",fontSize:"12px"}}
        avatar={
          <Avatar sx={{ bgcolor: red[500],height:"30px",width:"30px" }} aria-label="recipe"  src ={value.profileData.profileImage} />
            
        }
      
        title=  {`${value.profileData.firstname} ${value.profileData.lastname}`}
        subheader={new Date().toDateString()}
      />
     
      <CardContent>
        <TextField  value={reply} onChange={(e)=>setReply(e.target.value)}  size='small' rows={4} placeholder="whats on your mind?" multiline fullWidth/>
      </CardContent>
    
      <CardActions>
        <Button   
          disabled = { reply === ""? true : false}
          onClick = {HandleAddReply} 
          sx = {{backgroundColor:"#05386b"}}  
          variant = "contained">Reply
         </Button>
      </CardActions>
    </Card>
    )
}
export default CommentAddReplyCard