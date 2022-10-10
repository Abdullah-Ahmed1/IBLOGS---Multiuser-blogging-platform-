import Grid2 from '@mui/material/Unstable_Grid2';
const BloggerNotificationBar = ({notification,handleNotificationClick})=>{
    return(
        <Grid2  onClick = {()=>handleNotificationClick(notification._id)}  container sx = {{cursor: "pointer",marginBottom:"10px",width:"95%",backgroundColor:"white",   borderLeft:`${notification.seen ? "none": "5px solid #379863"}`  ,borderRight:`${notification.seen ? "none": "5px solid #379863"}` ,boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}  >
        <Grid2 >
            <h4   style = {{paddingLeft :"10px"}}>{ notification ? notification.notificationText : "Abdullah Ahmed Commented on 'Intro To react js'"}</h4>
        </Grid2>
    </Grid2>
    )
}
export default BloggerNotificationBar;