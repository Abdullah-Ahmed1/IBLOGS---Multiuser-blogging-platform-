import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams } from 'react-router-dom';
import { useEffect,useState,useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import lottie from 'lottie-web';
import AdminPostCard from './AdminPostCard';
const AdminBlogPosts = ()=>{
    const {blogId} = useParams();
    const container = useRef(null)
    const[posts,setPosts] = useState(null);

    const handlePostDelete=(postId)=>{
         console.log("postId",postId)
         console.log("reached handle Posr")
        let value = JSON.parse(localStorage.getItem("token"));
        let token = value.token;
        axios.delete(`http://127.0.0.1:5000/admin/deletePost/${postId}`,{
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }).then(res=>{
          console.log(res)
          axios.get(`http://127.0.0.1:5000/admin/getPosts-of-blog/${blogId}`)
          .then(res=>{
              console.log("--//",res.data)
              setPosts(res.data)
          })
        })
      }
    useEffect(()=>{
      
        lottie.loadAnimation({
          container : container.current,
          renderer: 'svg',
          loop:true,
          autoplay:true,
          animationData:require('../../lottie/empty.json')
    
        })
        
      },[])
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/admin/getPosts-of-blog/${blogId}`)
        .then(res=>{
            console.log("--//",res.data)
            setPosts(res.data)
        })
    },[])
    return(
        <>
        <CssBaseline />
        <div style={{marginTop:"20px",display:"flex",width:"73%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}>
          {/* <h2 style = {{color:"#379863"}}>IBlogs</h2> */}
          {/* <SearchBar/> */}
        </div>
        {/* <Divider variant="middle"/> */}
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2  lg ={11} spacing={0} sx = {{minHeight:"90vh",marginTop:"50px",marginLeft:"30px"}}  >  
       {/* ----------------------------------------------------------------------------------- */}
       {/* <h2 style = {{color:"#379863"}}  >All Blogs {blogs && blogs.length>0 ?  `for ${blogs[0].owner.firstname} ${blogs[0].owner.lastname}`: ""}  </h2> */}
       
       <Grid2 container direction="row" columnSpacing={7} sx = {{margin:"0px",padding:"0px"}} >
       {
        posts ? (
            posts.length > 0 ? (
                
                    posts.map(item=>{
                      return (
                        <Grid2  lg = {6} sx = {{marginBottom:"20px"}} key={item._id}>
                            <AdminPostCard  key={item._id}  item = {item} handlePostDelete={handlePostDelete}   />
                        </Grid2>
                      ) 
                    })
                
            ):(
              <div style={{margin:"auto"}}>
                <div className='container' ref={container} style={{width:"350px"}}  ></div>
                
              </div>
            )
        ):(
            <CircularProgress  sx = {{color:"green"}}/>
        )
       }
            {/* <AdminBlogCard/> */}

       </Grid2>
       {/* <Posts  posts = {posts}/> */}
    
        {/* ---------------------------------------------------------------- */}
        </Grid2>
       
       
      </Grid2>

        </>
    )
}
export default AdminBlogPosts