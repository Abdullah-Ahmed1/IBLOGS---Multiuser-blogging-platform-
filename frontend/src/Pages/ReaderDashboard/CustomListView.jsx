import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import RecommendedChips from '../../components/PostComponentsMui/RecommendChips';
import { Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import ListIcon from '@mui/icons-material/List';
import Grid from "@mui/material/Grid";
import { Link } from 'react-router-dom';
import axios from "axios";
import {useParams} from "react-router-dom";
import { useEffect,useState } from 'react';

const ReadingListPostCard = ({item,handleRemovePostClick})=>{
  const [readingListPostRemoveDialogOpen,setReadingListPostRemoveDialogOpen] = useState(false)     
  const [added,setAdded] = useState(true)
  
  const handleReadingListPostRemoveDialogClose = ()=>{
      setReadingListPostRemoveDialogOpen(false)
     }
  
  return(
    <>
    {/* <ReadingListPostRemoveDialog open={readingListPostRemoveDialogOpen}  handleRemovePostClick={handleRemovePostClick} item = {item} handleClose = {handleReadingListPostRemoveDialogClose} /> */}
    <Box   sx = {{ boxShadow:"1px 1px 3px 1px rgba(0,0,0,0.3)",borderRadius:"3px",minHeight:"300px",width:"98%",marginBottom:"30px",backgroundColor:"white", padding:"20px"}} >
    <Grid container direction="row"   spacing = {0} >
      <Grid lg = {10} md = {12} sm={12} sx= {{p:2}} item direction="column" justifyContent="space-between" spacing={0} container >
         <Grid item container sx = {{maxHeight:"20px"}} spacing={0} lg={8}  >
             <Grid item lg = {1} md = {1} sm = {1}>
                 
                 <Avatar 
                 alt={item.parentBlog.owner.firstname} src={item.parentBlog.owner.profileImage} />
             </Grid>
             <Grid item container   direction="column" spacing={0} lg = {9}  md = {7} sm={5}>
               <Link to = "author-profile"  style = {{textDecoration:"none",color:"#05386b"}}>
                 <Grid item   sx = {{textDecoration:"none",fontSize:"14px",fontWeight:"bold",fontFamily: " Ubuntu, sans-serif"}}>
                   {/* {`${item.parentBlog.owner.firstname} ${item.parentBlog.owner.lastname}     ${item.publishDate.slice(0,10)}`} */}
                    
                     {item.parentBlog.owner.firstname} {item.parentBlog.owner.lastname}   <span  style={{marginLeft:"50px"}}> {item.publishDate.slice(0,10)}</span>  
                 </Grid>
               </Link>
                 <Grid item  sx = {{fontSize:"16px",fontFamily: " Ubuntu, sans-serif",color:"#05386b"}}>
                     From: {item.parentBlog.title}
                 
                 </Grid>
                
             </Grid>
             <Grid item lg ={2}>
                 {/* icons here */}
                 <MoreVertIcon  sx ={{color:"#05386b"}}  />
             </Grid>
             
         </Grid>
         {/* <Link to="/ReaderDashboard/full-post">       */}
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
         {/* </Link> */}
         <Grid container item sx = {{ width:"90%",maxHeight:"20px"}} >
           {/* <Button  sx = {{width:"20px",color:"#05386b"}} size="small"><ThumbUpIcon/></Button>
          <Button  sx = {{   width:"20px",color:"#05386b"}} size="small"> <ShareIcon/></Button>
          <Button sx = {{   width:"20px",color:"#05386b",display: `${!added ? "inline":"none"}`}} onClick ={()=>setAdded(true)} size="small"><BookmarkAddIcon/></Button>
          <Button sx = {{   width:"20px",color:"#05386b",display: `${!added ? "none":"inline"}`}} onClick ={()=>setAdded(false)}  ><BookmarkAddedIcon/></Button>   
            */}
        {/* <Button  sx = {{margin:"0px",padding:"0px"}} ><ThumbUpIcon sx=  {{cursor:"pointer",color:"#05386b",margin:"0px 0px "}}  /></Button> */}
        <Button  sx = {{margin:"0px",padding:"0px"}}><ShareIcon sx=  {{   cursor:"pointer",color:"#05386b",margin:"0px 0px "}} /></Button>
        {/* <BookmarkAddIcon  sx=  {{cursor:"pointer",color:"#05386b",margin:"0px 15px ",display: `${added ? "none":"inline"}`}} onClick ={handleSaveIconClick}  /> */}
        {/* <CreateListMenu  postId = {item._id} />  */}
        <Tooltip title="Remove from reading list">
          <BookmarkRemoveIcon sx=  {{cursor:"pointer",color:"#379683 ",margin:"0px 15px ",display: `${!added ? "none":"inline"}`}} onClick = {()=> setReadingListPostRemoveDialogOpen(true)}    />
        </Tooltip>    
         </Grid>
      </Grid>

       <Grid item container justifyContent="flex-end" sx = {{display:{lg :"flex",md:"none",sm:"none",xs:"none"},height:"300px"}}   lg = {2} >
           <img  style={{maxWidth:"160px",height:"90px"}} src={"https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661858507/my-uploads/crxuibfslasaepf24mvp.png"} alt="" />
       </Grid>       
    </Grid>
    
    </Box>
    </>
  )
}




const CustomListView = ()=>{
  const {listId} = useParams();
  const [list,setList] = useState(null)
    console.log("LostUD",listId) 

  const handleRemovePostClick = ()=>{
    console.log("reaxhed")
  }

    useEffect(()=>{
      axios.get(`http://127.0.0.1:5000/readerDashboard/get-customList-post/${listId}`)
      .then(res=>{
        console.log("**--**",res.data)
        setList(res.data)
      })
    },[])


    return(
        <>
        
          
         
            <CssBaseline />
            <div style={{marginTop:"5px",display:"flex",width:"73%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}>
              <h2 style = {{color:"#379863"}}>IBlogs</h2>
             
            </div>
           
            <div style={{marginLeft:"30px",display:"flex",flexDirection:"row"}}>
            <ListIcon sx = {{color:"#05386b",marginTop:"2px",marginRight:"5px"}}/>
                <h3  style = {{margin:"0px",padding:"0px",color:"#05386b"}} >{list ? list.listName:"----"}</h3>
            </div>
            {/* <Divider variant="middle"/> */}
          <Grid2 container spacing={0} justifyContent= "space-between"   >
            <Grid2 xs={12} md={5} lg={7} spacing={0} sx = {{minHeight:"100vh",marginTop:"50px",marginLeft:"30px"}}  >  
           {/* ----------------------------------------------------------------------------------- */}
            {
                list ? (
                    list.savedPosts.map(item=>{
                        return(
                       <ReadingListPostCard  key={item._id} item={item} handleRemovePostClick={handleRemovePostClick} />
                        )
                    })
                ):(
                    <CircularProgress />
                )
            }
            {/* ---------------------------------------------------------------- */}
            </Grid2>
            <Divider orientation='vertical' sx={{width:"29px"}} flexItem/>
            <Grid2 className="sideScroll" xs={12} md={5} lg={3.3 }   sx = {{ position:"fixed",bottom:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"20px"} }     >
           
            {/* <Divider /> */}
            <h4 style={{color:"#379683"}} > Recommended Topics</h4>
            <RecommendedChips/>
            <div>
            <h4 style={{color:"#379683"}}>Trending Posts</h4>
              {/* <TrendPostCard/>
              <TrendPostCard/>
              <TrendPostCard/>
              <TrendPostCard/>
              <TrendPostCard/> */}
              </div>
            <Typography paragraph>
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
            </Typography>
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
export default CustomListView