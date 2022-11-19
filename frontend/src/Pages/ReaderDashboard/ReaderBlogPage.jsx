import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import RecommendedChips from './../../components/PostComponentsMui/RecommendChips';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArticleIcon from '@mui/icons-material/Article';
import { useTheme } from '@mui/material/styles';
import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const ReaderBlogPage = ()=>{
    const {blogId} = useParams();
    const theme = useTheme();
    const[blog,setBlog]=useState(null);
    const large = useMediaQuery(theme.breakpoints.down('lg'));
    const medium = useMediaQuery(theme.breakpoints.down('md'));
    const small = useMediaQuery(theme.breakpoints.down('sm'));
  


    useEffect(()=>{
        let value = JSON.parse(localStorage.getItem("token"));
        let token = value.token;
        axios.get(`http://127.0.0.1:5000/readerDashboard/get-blog-posts/${blogId}`,{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
        })
        .then(res=>{
            console.log("--------------------/",res.data)
            setBlog(res.data)
        })
    })
    return( 
        <>
        <CssBaseline />
        <div style={{marginTop:"30px",marginBottom:"30px",display:"flex",justifyContent:"flex-start",width:"50%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}>
          {/* <h2 style = {{color:"#379863"}}>IBlogs</h2> */}
          <img style={{width:"180px",marginRight:"50px"}} src={'/logo2.png'} alt="iblogs" />
          {/* <SearchBar/> */}
         
        </div>
        {/* <Divider variant="middle"/> */}
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 xs={12} sm={12} md={5} lg={7} spacing={0} 
          // sx = {}
          sx = {small? {minHeight:"80vh",marginTop:"40px",marginLeft:"5px", marginRight:"5px"}  : {minHeight:"80vh",marginTop:"20px",marginLeft:"30px"} }
          >  
       {/* ----------------------------------------------------------------------------------- */}
       {
                blog?(
       <Grid2 item container   sx = {{height:"410px",margin:0,fontSize: "25px",borderRadius:"10px", fontWeight:"bold" ,backgroundImage:`url('${blog.image}')`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover",position: "relative"}}  >
              
              
<div style={{padding:"0px 15px",margin:0,height:"410px",width:"100%",borderRadius:"10px",backgroundColor:"black",opacity:"80%",height:"100%"}} >
                
                <Grid2 container direction="row"  alignItems ={"center"} justifyContent ={"space-between"} >
                  <Grid2>
                  <h4  style={{color:"white"}}>{blog.title}</h4>
                  </Grid2>
                  <Grid2>
                  {/* <Tooltip title={"Edit Title"}>
                    <EditIcon  onClick={()=>setEditTitle(true)}  sx = {{color:"white",cursor:"pointer"}}/>
                  </Tooltip> */}
                  </Grid2>
                </Grid2>
          
                <Grid2 container direction = {"row"} alignItems = {"center"} justifyContent={"space-between"} >
                  <Grid2 sx = {{width:"90%",minHeight:"140px"}}>
                    <p style={{fontSize:"15px",color:"white"}}>
                      {blog.description}   
                    </p>
                  </Grid2>
                  {/* <Grid2> */}
                  {/* <Tooltip title={"Edit Description"}>
                    {/* <EditIcon  onClick={()=>setDescriptionEdit(true)}  sx = {{color:"white",cursor:"pointer"}}/> */}
                  {/* </Tooltip>  */}
                  {/* </Grid2> */}
                </Grid2>
          
              <h5 style={{color:"white"}}><span><ArticleIcon  sx = {{marginTop:"5px"}} /></span>Total posts : {blog.posts.length}</h5>

              </div>
              </Grid2>  
                ):(
                    null
                )
              }
                   
                  
                
             
                
              {/* <Grid  sx = {{Height:"400px" ,width:"100%"}}>
                <div style={{height:"200px",width:"100%",backgroundImage:"url('https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661858507/my-uploads/crxuibfslasaepf24mvp.png')"}}>
                sdjfdsnfkdsfnsdkjfn
                </div>
            </Grid> */}
            


        {/* ---------------------------------------------------------------- */}
        </Grid2>
        {/* <Divider orientation='vertical' sx={{width:"29px"}} flexItem/> */}
        <Grid2 
        className="sideScroll" 
        xs={12} sm={12} md={5} lg={3.3 }   
        // sx = {{ position:"fixed",bottom:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"20px"} } 
        sx ={small?{paddingLeft:"20px"} : { position:"fixed",bottom:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"20px"} }
        >
       
        {/* <Divider /> */}
        <h4 style={{color:"#5cdb95"}} > Recommended Topics</h4>
        <RecommendedChips/>
        <div>
        <h4 style={{color:"#5cdb95"}}>Trending Posts</h4>
          
         
          </div>
        
       
    
     

        </Grid2>
      </Grid2>

        </>
    )
}
export default ReaderBlogPage