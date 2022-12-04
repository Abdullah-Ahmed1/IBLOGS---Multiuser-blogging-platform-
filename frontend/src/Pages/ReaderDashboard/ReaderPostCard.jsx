import Box from '@mui/material/Box';
import * as React from "react";
import { useState } from 'react';
import axios from "axios";
import Grid from "@mui/material/Grid";
import Grid2 from '@mui/material/Unstable_Grid2';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import CreateListMenu from './../../components/ReaderDashComponents/CreateSavedListMenu';
import PostShareDialog from './../../components/ReaderDashComponents/PostShareDialog';
import { useEffect } from 'react';
import PostCardMenu from './../../components/PostComponentsMui/PostCardMenu';
const ReaderPostCard = ({item,handleLikeClick,handleNotInterested})=>{
    const [shareDialogOpen,setShareDialogOpen] = useState(false)
    const [liked,setLiked] = useState(false)
    //const [saved,setSaved] = useState(false)
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('xs'));
//------------------------------------------------------------------
    const [open, setOpen] = React.useState(false);
    const [checked,setChecked] = useState(false);
    const [customList,setCustomList] = useState(false)
    const anchorRef = React.useRef(null);

    const handleCustomChange = (customList)=>{
      setCustomList(customList=>!customList)
    }

    const handleChange = (event) => {
     // console.log(event.target)
       setChecked(event.target.checked);
      
      checked? (
        console.log("cheked")
      ):(
        console.log("not cheked")
      )


      if(event.target.checked){
        let value = JSON.parse(localStorage.getItem("token"));
          let token = value.token;
          console.log("token: ",token)
          axios.post(`http://127.0.0.1:5000/readerDashboard/add-to-reading-list/${item._id}`,{},{
            headers: {
              "Content-Type": "application/json", 
              Accept: "application/json",
              Authorization: token,
            },
          }).then(res => {
            console.log(res)
                 })
        }else{
          let value = JSON.parse(localStorage.getItem("token"));
            let token = value.token;
            axios.delete(`http://127.0.0.1:5000/readerDashboard/remove-from-readingList/${item._id}`,{
              headers: {
                "Content-Type": "application/json", 
                Accept: "application/json",
                Authorization: token,
              },
            }).then(res=>{
              console.log(res)
            }).catch(err=>{
              console.log(err)
            })
        }
  
    };
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
      //setChecked(true)

      
    };
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };


    
//-----------------------------------------------------------------    
      console.log("item is :  " ,item)
    const handleShareDialogClose = ()=>{
        setShareDialogOpen(false)
    }
    const handleLikeIconClick = ()=>{
      setLiked((liked)=>!liked)
      handleLikeClick(item._id)
    }

    useEffect(()=>{
      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      axios.get('http://127.0.0.1:5000/getProfile',{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }).then(res=>{
        console.log("/-/-/-/-/-/*/-",res.data)

          if(item){
            item.likes.includes(res.data._id) ? setLiked(true) : setLiked(false)
            console.log("aaaabbb//--//--/- :" ,res.data.ReadingList)
            console.log("item id",item._id)
             res.data.ReadingList.includes(item._id) ? setChecked(true): setChecked(false)
          }
          
          
        // item && item.likes.includes(res.data._id) ? console.log("liked") : console.log("not liked")
      })
    },[])

    return(
        <>
         <Box  className='postCard_item'  key ={item._id}  sx = {{ boxShadow:"1px 1px 3px 1px rgba(0,0,0,0.3)",borderRadius:"3px",minHeight:"350px",maxHeight:"350px",width:"98%",marginBottom:"30px",backgroundColor:"white", padding:"20px"}} >
         <Grid  container direction="row"   spacing = {0} >
           <Grid lg = {10} md = {12} sm={12} sx= {{p:2}} item direction="column" justifyContent="space-between" spacing={0} container >
              <Grid item container sx = {{maxHeight:"20px"}} spacing={0} lg={8} xs = {12}  >
                  <Grid item lg = {1} md = {1} sm = {1} xs={1}>
                      
                      <Avatar 
                      alt={item.parentBlog.owner.firstname} src={item.parentBlog.owner.profileImage} />
                  </Grid>
                  <Grid item container   direction="column" spacing={0} lg = {9}  md = {7} sm={8} xs = {9}>
                    <Link to = {`/ReaderDashboard/author-profile/${item.parentBlog.owner._id}`}  style = {{textDecoration:"none",color:"#05386b"}}>
                      <Grid item   sx = {{textDecoration:"none",fontSize:"14px",fontWeight:"bold",fontFamily: " Ubuntu, sans-serif"}}>
                        {/* {`${item.parentBlog.owner.firstname} ${item.parentBlog.owner.lastname}     ${item.publishDate.slice(0,10)}`} */}
                          {item.parentBlog.owner.firstname} {item.parentBlog.owner.lastname}   <span  style={small ?{marginLeft:"10px"}:{marginLeft:"50px"}}> {item.publishDate.slice(0,10)}</span>  
                      </Grid>
                    </Link>
                    <Link to = {`/ReaderDashboard/blog/${item.parentBlog._id}`}>
                      <Grid item  sx = {{fontSize:"16px",fontFamily: " Ubuntu, sans-serif",color:"#05386b"}}>
                          From: {item.parentBlog.title}
                      </Grid>
                    </Link>
                  </Grid>
                  <Grid item lg ={2} sm={1} xs = {1}>
                      {/* icons here */}
                      {/* <MoreVertIcon  sx ={{color:"#05386b"}}  /> */}
                      <PostCardMenu ownerId = {item.parentBlog.owner._id} postId={item._id}  handleNotInterested = {handleNotInterested}/>
                  </Grid>
                  
              </Grid>
           
              <Grid item lg ={8} sx ={{padding:0,margin:0, fontFamily: "Fjalla One, sans-serif"}}>
                      <Link to={`/ReaderDashboard/full-post/${item._id}`} style={{textDecoration:"none",color:"black"}} >
                      <h4 style = {{fontWeight:"bolder"}}>{item.postTitle}</h4>
                      </Link>
                      <Link to={`/ReaderDashboard/full-post/${item._id}`} style={{textDecoration:"none",color:"black"}} >
                      <div  className="scrollers" style= {{color:"#00000099",width:"98%",maxHeight:"60%",fontSize:"14px",minHeight:"60%",overflow:"auto"}}>
                        {item.postDescription}
                      </div>
                      </Link>
                     
              </Grid>
          
              <Grid container item sx = {{ width:"90%",maxHeight:"20px"}} >
              <Button onClick = {handleLikeIconClick}   sx = {{margin:"0px",padding:"0px"}} ><ThumbUpIcon sx=  {{cursor:"pointer",color:`${liked? "#379683":"#05386b"}`,margin:"0px 0px "}}  /></Button>
             <Button  sx = {{margin:"0px",padding:"0px"}} onClick = {()=>setShareDialogOpen(true) } ><ShareIcon sx=  {{   cursor:"pointer",color:"#05386b",margin:"0px 0px "}} /></Button>
             <Button
                sx = {{margin:"0px",padding:"0px"}}
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
              {checked ? <BookmarkAddedIcon sx = {{color:"#379863"}}/> : <BookmarkAddIcon sx = {{color:"#05386b"}}/>} 
             </Button>
             <CreateListMenu  customList={customList} handleCustomChange={handleCustomChange}  anchorRef={anchorRef}   handleChange={handleChange} handleClose={handleClose}  checked={checked} handleListKeyDown={handleListKeyDown} handleToggle={handleToggle} open={open}  item={item} postId = {item._id} /> 

              </Grid>
           </Grid>
  
            <Grid item container justifyContent="flex-end" sx = {{display:{lg :"flex",md:"none",sm:"none",xs:"none"},height:"300px"}}   lg = {2} >
                <img  style={{maxWidth:"160px",height:"90px"}} src={item.postCardImage ? item.postCardImage : "https://res.cloudinary.com/dlgwvuu5d/image/upload/v1662389730/my-uploads/download_1_efhm00.png" } alt="image" />
            </Grid>       
         </Grid>
         
         </Box>
         <PostShareDialog  shareDialogOpen={shareDialogOpen} handleShareDialogClose={handleShareDialogClose}/>
        </>
    )
}
export default ReaderPostCard