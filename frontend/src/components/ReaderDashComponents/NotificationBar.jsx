
import Grid2 from '@mui/material/Unstable_Grid2';
const NotificationBar = ()=>{
    return(
    <Grid2 container sx = {{marginBottom:"10px",width:"95%",backgroundColor:"white",borderLeft:"5px solid #379863 ",boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}  >
        <Grid2 sx ={{}}>
            <h4  style = {{paddingLeft :"10px"}}>Abdullah Ahmed Commented on "Intro To react js"</h4>
        </Grid2>
    </Grid2>
    )
}
export default NotificationBar;