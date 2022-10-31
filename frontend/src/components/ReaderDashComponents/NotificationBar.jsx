import Grid2 from '@mui/material/Unstable_Grid2';
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
const NotificationBar = ({notification})=>{
    return(
    <Grid2 container  alignItems={"center"}  sx = {{marginBottom:"10px",width:"95%",backgroundColor:"white",borderLeft:"5px solid #379863 ",boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}  >
        <Grid2 sx = {{marginLeft:"10px"}}>
        <Avatar alt={notification.info.name} src={notification.info.image} />
        </Grid2>
        <Grid2 sx ={{}}>
            
            <h4  style = {{paddingLeft :"10px"}}><span><Link to={`/ReaderDashboard/author-profile/${notification.info.ownerId}`}>{notification.info.name}</Link></span> Created new post <Link style={{color:"red"}} to={`/ReaderDashboard/full-post/${notification.info.postId}`}>{notification.info.postTitle}</Link>  </h4>
        </Grid2>
    </Grid2>
    )
}
export default NotificationBar;