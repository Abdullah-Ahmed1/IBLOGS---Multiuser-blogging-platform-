import Grid2 from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom";
const   BloggerNotificationBar = ({notification,handleNotificationClick})=>{
    console.log("-*-*-",notification)
    return(
        // <Grid2  onClick = {()=>handleNotificationClick(notification._id)}  container flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} sx = {{cursor: "pointer",marginBottom:"10px",width:"95%",backgroundColor:"white",   borderLeft:`${notification.seen ? "none": "5px solid #379863"}`  ,borderRight:`${notification.seen ? "none": "5px solid #379863"}` ,boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}  >
        <>
            {
                notification.notificationType =="follow"? (
                    <Grid2  onClick = {()=>handleNotificationClick(notification._id)}  container flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} sx = {{cursor: "pointer",marginBottom:"10px",width:"95%",backgroundColor:"white",   borderLeft:`${notification.seen ? "none": "5px solid #379863"}`  ,borderRight:`${notification.seen ? "none": "5px solid #379863"}` ,boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}  >
        
                    <>
                <Link to={`/readerDashboard/author-profile/${notification.info.followerId}`}>
                    <Grid2 container direction={"row"} alignItem={"center"}  lg = {10} sx = {{paddingRight:"40px"}}>
                    <Avatar
                            alt={notification.info.followerName}
                            src={notification.info.followerImage}
                            sx={{ width: 24, height: 24 ,marginRight:"10px",marginLeft:"10px" }}
                        />  
                        <h4   style = {{padding:0,margin:0}}><span>{notification.info.followerName}</span> started following you</h4>
                        
                    </Grid2>
                 </Link>
                 <Grid2 sx = {{marginRight:"10px"}} lg = {2} container flexDirection={"row"}  justifyContent={"flex-end"}  >
                    <h5>{new Date(notification.notificationDate).toLocaleString()}</h5>
                 </Grid2>
                 
                 </>
                 </Grid2>
                )  :(
                    null
                )
            
            }

</>
    )
}
export default BloggerNotificationBar;