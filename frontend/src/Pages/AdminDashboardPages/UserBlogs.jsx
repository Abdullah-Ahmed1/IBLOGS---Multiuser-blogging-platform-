import * as React from 'react';
import axios from "axios"
import {useParams } from "react-router-dom"
import { useState,useEffect } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import "./../../components/PostComponentsMui/PostCardScroll.css";
import UsersCard from '../../components/AdminDashComps/UsersCard';
import AdminBlogCard from '../../components/AdminDashComps/AdminBlogCard';

const UserBlogs = ()=>{
  let { userId } = useParams();
  const [blogs,setBlogs] = useState(null);

  const handleDeleteBlog = (blogId)=>{
    console.log("*********",blogId)
    axios.delete(`http://127.0.0.1:5000/admin/deleteBlog/${blogId}`,{data:{userId}})
    .then(data =>{
      console.log(data);
      axios.get(`http://127.0.0.1:5000/admin/getAllBlogs-ofUser/${userId}`)
      .then(res=>{
        console.log(res.data)
        setBlogs(res.data)
      })
    })
  }


  useEffect(()=>{
    axios.get(`http://127.0.0.1:5000/admin/getAllBlogs-ofUser/${userId}`)
    .then(res=>{
      console.log(res.data)
      setBlogs(res.data)
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
       <h2 style = {{color:"#379863"}}  >All Blogs for Abdullah Ahmed</h2>
       
       <Grid2 container direction="row" columnSpacing={7} sx = {{margin:"0px",padding:"0px"}} >
       {
        blogs ? (
            blogs.length > 0 ? (
                
                    blogs.map(item=>{
                      return (
                        <Grid2  lg = {3.9} sx = {{marginBottom:"20px"}} key={item._id}>
                            <AdminBlogCard handleDeleteBlog={handleDeleteBlog} key={item._id}  item = {item}  />
                        </Grid2>
                      ) 
                    })
                
            ):(
                <h3>No Blogs so far</h3>
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
export default UserBlogs;