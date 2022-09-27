import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';
import { red } from '@mui/material/colors';
import axios from "axios"
import { useParams } from 'react-router-dom';
import { useContext,useState } from 'react';
//import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { UserContext } from "../../Pages/ReaderDashboard/ReaderDashboard";
import CardActions from '@mui/material/CardActions';
//import Collapse from '@mui/material/Collapse';

const CommentReplyCard = ()=>{
    let { id } = useParams();
  const [comment,setComment] = useState("");   
  const value = useContext(UserContext)
    console.log("yeeeeeeeeee",value)
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
        <TextField  value={comment} onChange={(e)=>setComment(e.target.value)}  size='small' rows={4} placeholder="whats on your mind?" multiline fullWidth/>
      </CardContent>
    
      <CardActions>
        <Button    variant = "contained">Publish</Button>
      </CardActions>
    </Card>
    )
}
export default CommentReplyCard