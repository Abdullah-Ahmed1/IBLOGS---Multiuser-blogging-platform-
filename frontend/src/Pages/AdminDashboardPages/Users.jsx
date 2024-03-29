import { Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Route } from 'react-router';
import UsersProfilePage from './UsersProfilesPage';
import axios from 'axios';
import UserBlogs from './UserBlogs';
import UserDetail from './UserDetail';
import AdminBlogPosts from './AdminBlogPosts';
import AdminFullPostViewPage from './AdminFullPostViewPage';

const Users = ()=>{

    const [userData,setUserData] = useState(null) 

    const handleUserDelete = (userId)=>{
        let value = JSON.parse(localStorage.getItem("adminToken"));
        let token = value.adminToken;
        axios.delete(`http://127.0.0.1:5000/admin/deleteUser/${userId}`,{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
        })
        .then(res=>{
            console.log(res)
            let value = JSON.parse(localStorage.getItem("adminToken"));
        let token = value.adminToken;
            axios.get("http://127.0.0.1:5000/admin/getAllUsers",{
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: token,
                  },
            })
            .then(res=>{
              console.log("!!££££££",res.data)
              setUserData(res.data.data)
            })
        })
    }
//---------------------------------------------------------------------------------

    useEffect(()=>{
        let value = JSON.parse(localStorage.getItem("adminToken"));
    let token = value.adminToken;
        axios.get("http://127.0.0.1:5000/admin/getAllUsers",{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
        })
        .then(res=>{
          console.log("!!££££££",res.data)
          setUserData(res.data.data)
        })

    },[])

    return(
       <Routes>
              <Route exact path="/" element={<UsersProfilePage  userData = {userData} handleUserDelete={handleUserDelete} />} />
              <Route exact path="/detail/:userId" element={<UserDetail  userData = {userData} />} />
              <Route exact path="/blogs/:userId" element={<UserBlogs   />} />
              <Route exact path="/blog-posts/:blogId" element={<AdminBlogPosts  />} />
              <Route exact path="/full-postView/:postId" element={<AdminFullPostViewPage  />} />

        </Routes>
    )
}
export default Users