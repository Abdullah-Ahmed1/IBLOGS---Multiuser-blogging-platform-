import Dialog from '@mui/material/Dialog';
import React from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useEffect,useState } from 'react';
import {Link} from "react-router-dom"
import axios from "axios";
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from "@mui/material/Box";
 import Grid from "@mui/material/Grid";
 import Typography from '@mui/material/Typography';
// import Fade from '@mui/material/Fade';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import BlogCard from './../components/BlogComps/BlogCardMui';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

function BasicBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/bloggerDashboard">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
         to= "/bloggerDashboard"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </div>
  );
}



const BloggerHome = ({openModal,handleClose,token,blogs,refreshBlogs})=>{
  const [snack, setSnack] =useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
    
  ////////////////////////////////////////////////////////////////////////////////
    const[blogTitle,setBlogTitle] = useState("");
    const[blogDescription,setBlogDescription] = useState("");
    const [blogImage,setBlogImage] = useState("");
    const [uploadedFile,setUploadedFile] = useState(null);
  /////////////////////////////////////////////////////////////////////////////////
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const myRef = document.querySelector('.scrollable-div')
    
   

    useEffect(()=>{
         let value = JSON.parse(localStorage.getItem('token'));
         let token = value.token
         console.log("token",token)
        //let token = "something will be token here"
        // setSnack(true);
        // console.log("this is token",token)
          axios.get('http://127.0.0.1:5000/me',{
            headers:{
              "Content-Type":"application/json",
              "Accept":"application/json",
              "Authorization": token 
            }
          }).then  ( function (response) {
            console.log("response",response.data.userInfo.id);
           
          })
          .catch(function (error) {
            console.log(error);
            
          });





        

        return()=>{
          setSnack(false)
        }

    },[])

    // const onClick = async (id) => {
    //     confirmAlert({
    //         title: 'Confirm to Delete',
    //         message: 'Are you sure to do delete.',
    //         buttons: [
    //           {
    //             label: 'Yes',
    //             onClick: () => {
    //                 handleDelete(id);
    //             }
    //           },
    //           {
    //             label: 'No',
    //             onClick: () => console.log("no is lcicked")
    //           }
    //         ]
    //       });
    //   };

 ////////////////////////////////////////////////////////////
const handleImage = async(e)=>{
  setUploadedFile(e.target.files[0]);
  console.log("imageeeeeeeeeee--",e.target.files[0])
 
}

const blogFormSubmit =  ()=>{
  handleClose();
  setOpenBackDrop(true)
  if (uploadedFile){
    console.log("uploaded file",uploadedFile);

    const body = new FormData();
    body.append('file', uploadedFile);
    body.append('upload_preset',"my-uploads")
  
     axios(
      {
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/dlgwvuu5d/image/upload",
        data: body,
      }
    ).then(res=> {
      console.log("-----",res.data.secure_url)
      // setBlogImage(res.data.secure_url)
      // console.log("ghnlnmlogImage",blogImage)
      const info=  JSON.parse(atob(token.token.split(".")[1]))
    const data = {
        title : blogTitle,
        description : blogDescription,
        image : res.data.secure_url,
        owner : info.id
      }
      console.log(info)
          axios.post(`http://127.0.0.1:5000/BloggerDashboard/add/${info.id}`,data)
        .then(response=>{console.log(response)
  
          refreshBlogs();
          setOpenBackDrop(false)
          
        
    })    
  
    }).catch(err =>  console.log(err) )
   
  }else{
    const info=  JSON.parse(atob(token.token.split(".")[1]))
    const data = {
        title : blogTitle,
        description : blogDescription,
        image : "",
        owner : info.id
      }
      console.log(info)
          axios.post(`http://127.0.0.1:5000/BloggerDashboard/add/${info.id}`,data)
        .then(response=>{console.log(response)
  
          refreshBlogs();
          setOpenBackDrop(false)
          
        
    })    
  }
  
 // console.log("ghnlnmlogImage------------------",blogImage)
 // console.log(res.secure_url)
 // console.log("65464654687132411584",blogImage)
  // const info=  JSON.parse(atob(token.token.split(".")[1]))
  // const data = {
  //     title : blogTitle,
  //     description : blogDescription,
  //     image : blogImage,
  //     owner : info.id
  //   }
  //   console.log(info)
  //     await axios.post(`http://127.0.0.1:5000/BloggerDashboard/add/${info.id}`,data)
  //     .then(response=>{console.log(response)
  //     // axios.get('http://127.0.0.1:5000/bloggerDashboard/get')
  //     // .then((res)=>{
  //     //     console.log("----",res.data.blogs)
  //     //     setBlogs(res.data.blogs)

  //     // }).catch((error)=>{
  //     //     console.log(error)
  //     // })

  //     }
  //     ).catch(err=> console.log(err))
      

     
    // setBlogImage("")
  }
 ////////////////////////////////////////////////////////////////////

 ////////////////////////////////////////////////////////////////
    
    // const handleDelete =async (id)=>{
    //     setBlogs(blogs.filter(blog=>blog._id!=id));

    //     await axios.delete(`http://127.0.0.1:5000/BloggerDashboard/deletePost/${id}`)
    //     .then(response=>console.log(response));

        

    // }



    return(
        <>
          <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
       
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        
         <Snackbar
        anchorOrigin={{vertical:"top",horizontal:"right"}}
        open={snack}
        onClose={()=>setSnack(false)}
        TransitionComponent={Slide}
        autoHideDuration={3000}
        message={ "Welcome"+"   "+JSON.parse(atob((JSON.parse(localStorage.getItem('token'))).token.split(".")[1])).username }
        key={"top"+ "right"}
      />
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
          
              <TextField
                id="outlined-full-width"
                label="Image Upload"
                style={{ margin: 8 }}
                name="upload-photo"
                type="file"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onChange={ handleImage}
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
             <div  style={{maxHeight:"10px",maxWidth:"10px"}}>
              <img src={blogImage} style={{maxHeight:"100px", maxWidth:"100px" }} alt="image" />
             </div>
              </DialogContent>       
      </Dialog>
    
      </div>
      <Grid2 container direction ={"column"} sx= {{margin:0,padding:0,width:"100%"}} >
        <Grid2>
           {/* <BasicBreadcrumbs />   */}
        </Grid2>
        <Grid2>
        <Box sx={{ flexGrow: 1 }}>
             <h2 stlye = {{color:"#05386b"}}>Your blogs</h2>
              <Grid container direction="row"  rowSpacing = {1} columnSpacing={5}     >
                 {
                  // !blogs ? ( <h5>You have not created any blog yet</h5>)
                  // :
                  
                  // blogs.map((item)=>{
                  //   return (
                  //     <Grid item lg={3.5} md = {6}  key = {item._id}  xs = {12} >
                  //       <BlogCard  item = {item}  key = {item._id} />
                  //     </Grid>
                  //   )
                  // })
                  
                  blogs? (
                    blogs.length> 0 ? (
                      blogs.map((item)=>{
                          return (
                            <Grid item lg={3.5} md = {6}  key = {item._id}  xs = {12} >
                              <BlogCard  item = {item}  key = {item._id} />
                            </Grid>
                          )
                        })
                    ):(
                      <h2 style ={{margin:"auto"}}>No blogs to show</h2>
                    ) 
                  ):(
                    <h2>Loading</h2>
                  )
                 }         

                {/* <Grid item lg={4} md = {6}  xs = {12} >
                  
                 <BlogCard/>
                  
                </Grid>
                <Grid item lg={4} md = {6}   xs = {12} >
                  
                  <BlogCard/>
                   
                 </Grid>
                 <Grid item lg={4}  md = {6} xs = {12} >
                  
                  <BlogCard/>
                   
                 </Grid>
                 <Grid item lg={4} md = {6}  xs = {12} >
                  
                  <BlogCard/>
                   
                 </Grid>
                 <Grid item lg={4} md = {6}  xs = {12} >
                  
                  <BlogCard/>
                   
                 </Grid> */}
                 </Grid>
              </Box>
          </Grid2>        
      </Grid2>
                   

      
          
        </>
    )
}
export default BloggerHome;