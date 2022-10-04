import { Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Route } from 'react-router';
import UsersProfilePage from './UsersProfilesPage';
import axios from 'axios';
import UserBlogs from './UserBlogs';

const Users = ()=>{

    const [userData,setUserData] = useState(null) 

    const handleUserDelete = (userId)=>{
        axios.delete(`http://127.0.0.1:5000/admin/deleteUser/${userId}`)
        .then(res=>{
            console.log(res)
        })
    }
//---------------------------------------------------------------------------

    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/admin/getAllUsers")
        .then(res=>{
          console.log("!!££££££",res.data)
          setUserData(res.data.data)
        })
    },[])

    return(
       <Routes>
              <Route exact path="/" element={<UsersProfilePage  userData = {userData} handleUserDelete={handleUserDelete} />} />
              <Route exact path="/blogs/:userId" element={<UserBlogs   />} />

        </Routes>
    )
}
export default Users