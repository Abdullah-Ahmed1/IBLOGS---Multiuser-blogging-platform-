import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import {useEffect,useState} from 'react';
import parse from 'html-react-parser';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams,Link,useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AdminCommentCard from './../../components/AdminDashComps/AdminCommentCard';
import  Button  from '@mui/material/Button';
import AdminPostDeleteDialog from '../../components/AdminDashComps/AdminPostDeleteDialog';
function Progress() {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }     
const AdminFullPostViewPage = ()=>{
    const {postId} = useParams()
    const navigate = useNavigate()
    const [post,setPost] = useState(null);
    const [comments,setComments] = useState(null)
    const [adminPostDeleteDialogOpen,setAdminPostDeleteDialogOpen] = useState(false)

    const handlePostDelete = async(id)=>{
        console.log("reached handlePost Delete",id,post.parentBlog._id)
        await axios.delete(`http://127.0.0.1:5000/admin/deletePost/${id}`)

        navigate(`/admin/users/blog-posts/${post.parentBlog._id}`)
    }

    const handlePostDeleteDialogClose = ()=>{
        setAdminPostDeleteDialogOpen(false)
    }
    const handleDeletePostButtonClick = ()=>{
            setAdminPostDeleteDialogOpen(true)
    }

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/admin/get-fullPost/${postId}`)
        .then(res=>{
            //console.log(res.data.data[0])
            setPost(res.data.data[0])
        })
    },[])  

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/admin/get-post-comments/${postId}`)
        .then(res=>{
            console.log("--->",res.data)
            setComments(res.data)
        })
    },[])
    return(
        <>
        <AdminPostDeleteDialog open = {adminPostDeleteDialogOpen} item = {post} handleClose = {handlePostDeleteDialogClose} handlePostDelete = {handlePostDelete}  />
        <CssBaseline />
        <div style={{marginTop:"70px",marginBottom:"30px",display:"flex",justifyContent:"flex-start",width:"50%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}>
          {/* <h2 style = {{color:"#379863"}}>IBlogs</h2> */}
          {/* <img style={{width:"180px",marginRight:"50px"}} src={'/logo2.png'} alt="iblogs" /> */}
          {/* <SearchBar/> */}
          
        </div>
        {/* <Divider variant="middle"/> */}
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 xs={12} sm={12} md={5} lg={7} spacing={0} 
          // sx = {}
          sx = {{minHeight:"70vh",marginTop:"20px",marginLeft:"30px"} }
          >  
       {/* ----------------------------------------------------------------------------------- */}
       {/* <Posts  posts = {posts}/> */}

        {
            post?(
                <>
                <Grid2 container sx = {{marginBottom:"20px"}} flexDirection="row" columnSpacing={3}>
                <Grid2>
                <Avatar sx = {{height:"45px",width:"45px"}}  alt="Remy Sharp" src={post.parentBlog.owner.profileImage}/>   
            
                </Grid2>
                <Grid2 container  flexDirection="column" rowSpacing={0}  >
                  <Link to= {`/admin/users/detail/${post.parentBlog.owner._id}`}>
                    <Grid2 sx ={{fontSize:"14px",fontWeight:"bold"}}>
                       
                       { post.parentBlog.owner.firstname } { post.parentBlog.owner.lastname } 
                       
                    </Grid2>
                  </Link>  
                    <Grid2 sx ={{fontSize:"14px",fontWeight:"bold"}}>
                        {post.parentBlog.title}
                        
                    </Grid2>
                </Grid2>
            </Grid2>
            <Grid2 sx = {{backgroundColor:"white",padding:"10px"}} >
                {parse(post.postContent)}
            </Grid2>
            <Button   onClick={handleDeletePostButtonClick} variant="contained" startIcon={<DeleteIcon />} sx = {{marginBottom:"10px"}}>Delete Post</Button>
            </>


            ):(null)
        }

{/* <PostCardMobile/> */}
         
    
        {/* ---------------------------------------------------------------- */}
        </Grid2>
        <Divider orientation='vertical' sx={{width:"29px"}} flexItem/>
        <Grid2 
        className="sideScroll" 
        xs={12} sm={12} md={5} lg={3.3 }   
        // sx = {{ position:"fixed",bottom:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"20px"} } 
        sx ={ {position:"fixed",bottom:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"20px"} }
        >
       
        {/* <Divider /> */}
        {/* <h4 style={{color:"#5cdb95", marginTop:"60px"}} > Recommended Topics </h4> */}
        <div style={{marginTop:"70px"}}>
        <h4 style={{color:"#5cdb95"}}>Comments</h4>
          
         
          </div>
          {
                    comments ? (
                    comments.comments.map(item=>{
                         //console.log("a@@@",item)
                         return(
                          <AdminCommentCard  comment = {item} key={item._id} />
                         )
                          
                    })
                    ):(
                        <Progress/>
                    )
                }
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography> */}
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography> */}
        {/* <div  style={{backgroundColor:"green",maxWidth:"100px",overflowY: "auto"}} onScroll={onScroll}
        ref={listInnerRef} >Hello</div>

    
      */}

        </Grid2>
      </Grid2>

        </>
    )
}
export default AdminFullPostViewPage