// // import Card from '@mui/material/Card';
// // import CardActions from '@mui/material/CardActions';
// // import CardContent from '@mui/material/CardContent';
// // import CardMedia from '@mui/material/CardMedia';
// // import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ShareIcon from '@mui/icons-material/Share';
// import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
// import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
// import "./PostCardScroll.css";
// import Avatar from '@mui/material/Avatar';
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { useState } from 'react';


// const ReaderPostCard = ( )=>{
//     const [added,setAdded] = useState(false) 
//    // console.log("item",item)
//     return(
//         <Box sx = {{ padding:"20px",marginBottom:"20px",boxShadow:"1px 1px 3px 1px rgba(0,0,0,0.3)",borderRadius:"3px",maxHeight:"400px",width:"90%",backgroundColor:"white"}} >
//        <Grid container direction="row" spacing = {0} >
//          <Grid lg = {10} md = {12} sm={12} sx= {{p:2}} item direction="column" spacing={1} container >
//             <Grid item container sx = {{maxHeight:"45px"}} spacing={0} lg={8}  >
//                 <Grid item lg = {1} md = {1} sm = {1}>
                    
//                     <Avatar sx={{ width: 45, height: 45 }}>A</Avatar>
//                 </Grid>
//                 <Grid item container   direction="column" spacing={0} lg = {9}  md = {7} sm={5}>
//                     <Grid item   sx = {{fontSize:"14px",fontWeight:"bold",fontFamily: " Ubuntu, sans-serif"}}>
//                         Abdullah Ahmed -{" 27 April "}
//                     </Grid>
//                     <Grid item  sx = {{fontSize:"16px",fontFamily: " Ubuntu, sans-serif",color:"#05386b"}}>
//                         From: Reactjs - from begginer to expert
//                     </Grid>
                   
//                 </Grid>
//                 <Grid item lg ={2}>
//                     {/* icons here */}
//                     <MoreVertIcon  sx ={{color:"#05386b"}}  />
//                 </Grid>
                
//             </Grid>
//             <Grid item lg ={8} sx ={{padding:0,margin:0, fontFamily: "Lora, serif"}}>
//                     <h3>All the fundamental React.js concepts, jammed into this one article</h3>
//                     <div  className="scrollers" style= {{color:"#00000099",width:"98%",maxHeight:"50%",minHeight:"50%",overflow:"auto"}}>
//                       This article is not going to cover what React is or why you should learn it. Instead, this is a practical introduction to the fundamentals of React.js for those who are already familiar with JavaScript and know the basics of the DOM API.All code examples below are labeled for reference. They are purely intended to provide examples of concepts. Most of them can be written in a much better way.

//                     </div>
                   
//             </Grid>
//             <Grid item sx = {{}} >
//               {/* <Button  sx = {{width:"20px",color:"#05386b"}} size="small"><ThumbUpIcon/></Button>
//              <Button  sx = {{   width:"20px",color:"#05386b"}} size="small"> <ShareIcon/></Button>
//              <Button sx = {{   width:"20px",color:"#05386b",display: `${!added ? "inline":"none"}`}} onClick ={()=>setAdded(true)} size="small"><BookmarkAddIcon/></Button>
//              <Button sx = {{   width:"20px",color:"#05386b",display: `${!added ? "none":"inline"}`}} onClick ={()=>setAdded(false)}  ><BookmarkAddedIcon/></Button>   
//                */}
//            <ThumbUpIcon sx=  {{cursor:"pointer",color:"#05386b",margin:"0px 15px "}}  />
//            <ShareIcon sx=  {{   cursor:"pointer",color:"#05386b",margin:"0px 15px "}} />
//            <BookmarkAddIcon  sx=  {{cursor:"pointer",color:"#05386b",margin:"0px 15px ",display: `${added ? "none":"inline"}`}} onClick ={()=>setAdded(true)}  />
//            <BookmarkAddedIcon sx=  {{cursor:"pointer",color:"#379683 ",margin:"0px 15px ",display: `${!added ? "none":"inline"}`}}  onClick ={()=>setAdded(false)}  />
//             </Grid>
//          </Grid>

//          <Grid item container justifyContent="flex-end" sx = {{display:{lg :"flex",md:"none",sm:"none",xs:"none"}}}   lg = {2} >
//             <img  style={{height:"90px"}} src={"https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661858507/my-uploads/crxuibfslasaepf24mvp.png"} alt="image" />
//         </Grid>       
//        </Grid>
//        </Box>
//     )
// }
// export default ReaderPostCard;