import Grid2 from '@mui/material/Unstable_Grid2';
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import {useState} from 'react'

const AdminNotificationBar = ({notification,handleWarn,handleDiscard,handleDeleteNotification})=>{

    
    if(notification.notificationType==="report"){
        return(
          
        <Grid2 container  alignItems={"center"} justifyContent={"space-between"} sx = {notification.seen? {marginBottom:"10px",width:"95%",backgroundColor:"white",boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}:{marginBottom:"10px",width:"95%",backgroundColor:"white",borderLeft:"5px solid #379863 ",boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}  >
            <Grid2 container alignItems={"center"}  >
            <Grid2 sx = {{marginLeft:"10px"}}>
                <Avatar alt={notification.info.reporterName} src={notification.info.reporterImage} />
            </Grid2>
            <Grid2 sx ={{}}>
                
                <h4  style = {{paddingLeft :"10px"}}><span><Link style ={{textDecoration:"none"}} to={`/admin/users/detail/${notification.info.reporter}`}>{notification.info.reporterName}</Link></span> reported on <Link style={{textDecoration:"none"}} to={`/admin/users/full-postView/${notification.info.postId}`}>"{notification.info.postTitle}"</Link> as {notification.info.reason} </h4>
            </Grid2>
            </Grid2>
            <Grid2 container alignItems={"center"} columnSpacing={3} sx = {{marginRight:"20px"}}>
            <Button onClick={()=>handleWarn(notification._id)}  disabled={notification.seen} sx = {{marginRight:"10px"}} variant="contained">Warn</Button>
            <Button sx = {{marginRight:"20px"}}  onClick={()=>handleDiscard(notification._id)} disabled={notification.seen} variant="contained">Discard</Button>
            <CloseIcon  sx = {{cursor:"pointer"}} onClick={()=>handleDeleteNotification(notification._id)}/>
            </Grid2>
        </Grid2>
        )
    }
   
}
export default AdminNotificationBar;