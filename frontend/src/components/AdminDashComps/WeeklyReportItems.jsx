import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2';
const WeeklyReportsItems = ({report})=>{
    return(
        <Grid2 sx = {{marginBottom:"10px"}}>
            <Paper sx = {{padding:"10px 20px"}}>
                <h5>Post Title : {report.postId.postTitle}</h5>
                <h5>Likes: {report.postLikes}</h5>
                <h5>Comments' Semantics: {report.commentsSemantics}</h5>
            </Paper>
        </Grid2>
    )

}
export default WeeklyReportsItems