import Grid2 from '@mui/material/Unstable_Grid2';
import {Link} from 'react-router-dom'
const NotificationBar = ({notification})=>{
    return(
    <Grid2 container sx = {{marginBottom:"10px",width:"95%",backgroundColor:"white",borderLeft:"5px solid #379863 ",boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}  >
        <Grid2 sx ={{}}>
            <h4  style = {{paddingLeft :"10px"}}><span><Link to={`/ReaderDashboard/author-profile/${notification.info.ownerId}`}>{notification.notificationText.slice(0,8)}</Link></span> {notification.notificationText.slice(9,25)} <Link style={{color:"red"}} to={`/ReaderDashboard/full-post/${notification.info.postId}`}>{notification.notificationText.slice(26,notification.notificationText.length)}</Link>  </h4>
        </Grid2>
    </Grid2>
    )
}
export default NotificationBar;