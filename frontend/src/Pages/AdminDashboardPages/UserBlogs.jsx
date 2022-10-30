import * as React from 'react';
import axios from "axios"
import {useParams } from "react-router-dom"
import { useState,useEffect,useRef } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import "./../../components/PostComponentsMui/PostCardScroll.css";
import lottie from 'lottie-web';
import UsersCard from '../../components/AdminDashComps/UsersCard';
import AdminBlogCard from '../../components/AdminDashComps/AdminBlogCard';

const UserBlogs = ()=>{
  let { userId } = useParams();
  const container = useRef(null)
  const [test,setTest] = useState(null)
  const [blogs,setBlogs] = useState(null);
  useEffect(()=>{
      
    lottie.loadAnimation({
      container : container.current,
      renderer: 'svg',
      loop:true,
      autoplay:true,
      animationData:require('../../lottie/empty.json')

    })
    
  })
  const handleDeleteBlog = (blogId)=>{
    console.log("*********",blogId)
    let value = JSON.parse(localStorage.getItem("adminToken"));
        let token = value.adminToken;
    axios.delete(`http://127.0.0.1:5000/admin/deleteBlog/${blogId}`,{data:{userId}},{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    })
    .then(data =>{
      console.log(data);
      axios.get(`http://127.0.0.1:5000/admin/getAllBlogs-ofUser/${userId}`,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      })
      .then(res=>{
        console.log(res.data)
        setBlogs(res.data)
      })
    })
  }


  useEffect(()=>{
    let value = JSON.parse(localStorage.getItem("adminToken"));
        let token = value.adminToken;
    axios.get(`http://127.0.0.1:5000/admin/getAllBlogs-ofUser/${userId}`,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    })
    .then(res=>{
      console.log("----------",res.data)
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
       <h2 style = {{color:"#379863"}}  >All Blogs {blogs && blogs.length>0 ?  `for ${blogs[0].owner.firstname} ${blogs[0].owner.lastname}`: ""}  </h2>
       
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
export default UserBlogs;