import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect,useState } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { confirmAlert } from 'react-confirm-alert'; // Import
import CssBaseline from "@mui/material/CssBaseline";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';

import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import Blogs from './../components/BlogComps/Blogs';
// import Backdrop from '@mui/material/Backdrop';
// import Typography from '@mui/material/Typography';
// import Fade from '@mui/material/Fade';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../components/BloggerSideBarMui/DrawerMui';

const BloggerHome = ({openModal,handleClose})=>{
    const [blogs,setBlogs]=useState([]);
  ////////////////////////////////////////////////////////////////////////////////
    const[blogTitle,setBlogTitle] = useState("");
    const[blogDescription,setBlogDescription] = useState("");
  /////////////////////////////////////////////////////////////////////////////////
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const myRef = document.querySelector('.scrollable-div')
    
    useEffect(()=>{
        // let value = JSON.parse(localStorage.getItem('token'));
        // let token = "value.token";
        let token = "something will be token here"
        // console.log("this is token",token)
        let response = axios.get('http://127.0.0.1:5000/me',{
            headers:{
              "Content-Type":"application/json",
              "Accept":"application/json",
              "Authorization": token 
            }
          }).then  ( function (response) {
            console.log("response",response.data.userInfo.id);
            toast( `Welcome: ${response.data.userInfo.username}`,
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });   




          })
          .catch(function (error) {
            console.log(error);
            
          });





         axios.get('http://127.0.0.1:5000/bloggerDashboard/get')
        .then((res)=>{
            console.log("----",res.data)
            setBlogs(res.data)

        }).catch((error)=>{
            console.log(error)
        })

    },[])

    const onClick = async (id) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do delete.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    handleDelete(id);
                }
              },
              {
                label: 'No',
                onClick: () => console.log("no is lcicked")
              }
            ]
          });
      };

 ////////////////////////////////////////////////////////////
      const blogFormSubmit = async()=>{
          const data = {
            title : blogTitle,
            description : blogDescription
          }

      

      }
 ////////////////////////////////////////////////////////////////////
    
    const handleDelete =async (id)=>{
        setBlogs(blogs.filter(blog=>blog._id!=id));

        await axios.delete(`http://127.0.0.1:5000/BloggerDashboard/deletePost/${id}`)
        .then(response=>console.log(response));

        

    }



    return(
        <>
        <div>
        <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        
      >
         <DialogTitle id="responsive-dialog-title">
          {"Blog Details!"}
        </DialogTitle>
        <DialogContent >
            
              <TextField
                sx = {{color:"white"}}
                margin="normal"
                required
                onChange={(e)=>{setBlogTitle(e.target.value)}}
                color = "secondary"
               
                variant="filled"  
                fullWidth
                id="title"
                label="Title"
                name="title"
                
                autoComplete="title"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                multiline
                rows={5}
                id="filled-multiline-static"
                onChange={(e)=>{setBlogDescription(e.target.value)}}
                fullWidth
                variant= "filled"
                color='secondary'
                name="Description"
                label="Description"
                type="Description"
                //id="Description"
                autoComplete="Description"
              />
              
              <Button
                type="submit"
                 onClick = {blogFormSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , backgroundColor:"black", color:"white" }}
              >
                Submit
              </Button>
              
              </DialogContent>       
      </Dialog>
    
      </div>
          
             <div>
           <ToastContainer 
                theme="dark"
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                
            />
           </div>
            
               
            
            {/* <div >
            <div style={{marginLeft:"110px",marginTop:"20px"}}>
                        <h2>All Posts</h2>    
                  </div>  
                <div style={{marginLeft:"100px",marginTop:"20px",display:"flex",flexWrap:"wrap"}}>

                < Blogs blogs = {blogs} handleDelete ={onClick}  />
                </div>
            </div> */}
            <Box>
             <h2>Your blogs</h2>
              
            </Box>
        </>
    )
}
export default BloggerHome;