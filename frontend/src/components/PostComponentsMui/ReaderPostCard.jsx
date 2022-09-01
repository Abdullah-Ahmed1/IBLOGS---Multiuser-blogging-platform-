import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid";


const ReaderPostCard = ()=>{
    return(
       <Grid container direction="row" spacing = {0} sx = {{backgroundColor:"yellow", boxShadow:"1px 1px 3px 1px rgba(0,0,0,0.3)",borderRadius:"3px",height:"300px",backgroundColor:"white"}}>
         <Grid lg = {10} sm={12} sx= {{p:2}} item direction="column" spacing={1} container >
            <Grid item container sx = {{maxHeight:"45px"}} spacing={0} lg={8}  >
                <Grid item lg = {1}>
                    
                    <Avatar sx={{ width: 45, height: 45 }}>A</Avatar>
                </Grid>
                <Grid item container   direction="column" spacing={0} lg = {9}>
                    <Grid item   sx = {{fontSize:"14px",fontWeight:"bold",fontFamily: " Ubuntu, sans-serif"}}>
                        Abdullah Ahmed
                    </Grid>
                    <Grid item  sx = {{fontSize:"16px",fontFamily: " Ubuntu, sans-serif"}}>
                        From: Reactjs course
                    </Grid>
                </Grid>
                <Grid item lg ={2}>
                    {/* icons here */}
                </Grid>
                
            </Grid>
            <Grid item lg ={8} sx ={{padding:0,margin:0, fontFamily: "Lora, serif"}}>
                    <h3>All the fundamental React.js concepts, jammed into this one article</h3>
                    <div>
                    This article is not going to cover what React is or why you should learn it. Instead, this is a practical introduction to the fundamentals of React.js for those who are already familiar with JavaScript and know the basics of the DOM API.All code examples below are labeled for reference. They are purely intended to provide examples of concepts. Most of them can be written in a much better way.

                    </div>
            </Grid>
         </Grid>

         <Grid item container justifyContent="flex-end" alignItems={"center"} lg = {2} >
            <img  style={{height:"90px"}} src={"https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661858507/my-uploads/crxuibfslasaepf24mvp.png"} alt="image" />
        </Grid>       
       </Grid>
    )
}
export default ReaderPostCard;