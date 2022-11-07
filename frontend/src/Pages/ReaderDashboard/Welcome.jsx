import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme)=>({
    root:{
     // height :'100vh',
     //width:"100%",
      backgroundImage: 'url(https://res.cloudinary.com/dlgwvuu5d/image/upload/v1667135496/my-uploads/bgEdited_czexlr.png)',
      backgroundRepeat : "repeat",
      backgroundAttachment:"fixed",
       backgroundSize:"contain",
     
    }
  }))
const Welcome = ()=>{
    
      const classes = useStyles();
return(
    <Box className={classes.root}>
    <Grid2 container direction={"column"} sx={{padding:"10px",minHeight:"90vh",background:"rgba(92, 219, 149,0.95)",}} >
        <Grid2>
          <h2 style={{color:"#05386b"}}>IBlogs</h2>  
        </Grid2>
    <Grid2  container justifyContent={"center"} direction = {"row"} sx = {{padding:"0px 20px"}}>
        <Grid2 lg={6}  >
            <Grid2>
            <h2>Which categories you are interested in?</h2>
            </Grid2>
            <Grid2 sx = {{backgroundColor:"white",padding:"15px",minHeight:"450px",borderRadius:"10px",boxShadow:"0 4px 8px 0 rgba(0,0,0, 0.9), 0 6px 20px 0 rgba(0,0,0, 0.9)"  }}>
                sdjfnskdfjnsdkfjsdnksnfsdjfnsdkfsnskdnffdskfnsdkfnk
            </Grid2>
            
        </Grid2 >
        <Grid2 lg={6}>

        </Grid2>
    </Grid2>
    </Grid2>
    </Box>
)

}
export default Welcome