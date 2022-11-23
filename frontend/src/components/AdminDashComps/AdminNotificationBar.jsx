import Grid2 from '@mui/material/Unstable_Grid2';
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
const AdminNotificationBar = ({notification})=>{
    if(notification.notificationType==="report"){
        return(
          
        <Grid2 container  alignItems={"center"}  sx = {{marginBottom:"10px",width:"95%",backgroundColor:"white",borderLeft:"5px solid #379863 ",boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}  >
            <Grid2 sx = {{marginLeft:"10px"}}>
                <Avatar alt={notification.info.reporterName} src={notification.info.reporterImage} />
            </Grid2>
            <Grid2 sx ={{}}>
                
                <h4  style = {{paddingLeft :"10px"}}><span><Link to={`/admin/users/detail/${notification.info.reporter}`}>{notification.info.reporterName}</Link></span> reported on <Link style={{color:"red"}} to={`/admin/users/full-postView/${notification.info.postId}`}>{notification.info.postTitle}</Link>  </h4>
            </Grid2>
        </Grid2>
        )
    }
   
}
export default AdminNotificationBar;