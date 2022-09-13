import * as React from 'react';
import { useEffect,useState,useRef } from 'react';
import axios from "axios";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
// import Grid from "@mui/material/Grid";
// import Grid2 from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import { Link } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// //import Divider from '@mui/material/Divider';

// import Paper from '@mui/material/Paper';
// import Card from '@mui/material/Card';
// import parse from 'html-react-parser';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { createStyles, makeStyles } from '@mui/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import List_Items from '../../components/ReaderDashComponents/ListItems2';
// import SearchBar from "../../components/ReaderDashComponents/Searchbar"
// import ReaderPostCard from './../../components/PostComponentsMui/ReaderPostCard';
// //------------
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ShareIcon from '@mui/icons-material/Share';
// import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

// import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import "./../../components/PostComponentsMui/PostCardScroll.css";
// import Avatar from '@mui/material/Avatar';
// //import Grid from "@mui/material/Grid";
// //import Box from "@mui/material/Box";
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import RecommendedChips from './../../components/PostComponentsMui/RecommendChips';
// import TrendPostCard from './../../components/PostComponentsMui/TrendPostCard';
import AccountMenu from './../../components/Avatar/AccountAvatar';
//--------------Calling Components--------------------------
import ReaderHome from './ReaderHome';
import ReaderFullPostView from './ReaderFullPostView';
import AuthorProfile from './AuthorProfile';
import YourProfile from './../../components/ProfileComps/ProfileInfo';
//----------------------------------------------------------------
const drawerWidth = 70;



const useStyles = makeStyles((theme)=>({
  root:{
   // height :'100vh',
    backgroundImage: 'url(https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661960761/my-uploads/4665_zuak4h.jpg)',
    backgroundRepeat : "repeat",
    backgroundAttachment:"fixed",
     backgroundSize:"contain",
   
  }
}))

// const useIntersection = (element, rootMargin) => {
//   const [isVisible, setState] = useState(false);

//   useEffect(() => {
//       const observer = new IntersectionObserver(
//           ([entry]) => {
//               setState(entry.isIntersecting);
//           }, { rootMargin }
//       );

//       element.current && observer.observe(element.current);

//       return () => observer.unobserve(element.current);
//   }, []);

//   return isVisible;
// };


// const Posts = ({posts})=>{
//   console.log("!!!!!!!!!!!!!!!!!1",posts)
//   return(
    
//       posts.map(post=>{
//         return(
//           <ReaderDashboard key={post._id} post = {post}/>
//         )
//       })
    
//   )
// }

export default function ReaderDashboard() {
  const classes = useStyles();

  const [visible,setVisible] = useState(false);
  const [posts,setPosts] = useState([])
  
  // const ref = useRef();
 // const listInnerRef = useRef();  
  // const inViewport = useIntersection(ref, '0px'); // Trigger as soon as the element becomes visible
  // //const inViewport = useIntersection(ref, '-200px'); // Trigger if 200px is visible from the element

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight === scrollHeight) {
  //       console.log("reached bottom");
  //     }else{
  //       console.log("not reached bootom")
  //     }
  //   }
  // };
  console.log("post",posts  )

  useEffect(()=>{

    //console.log("post",posts  )
  //  console.log("called")
  //   if (inViewport) {
  //     console.log('in viewport:', ref.current);
  //     setVisible(true)
  // }else{
  //   console.log("no in view port")
  //   setVisible(false)
  // }
    axios.get('http://127.0.0.1:5000/readerDashboard')
    .then(res =>{
      console.log("res--------",res.data.data)
      setPosts(res.data.data)
      
     
    }).catch(err=> console.log(err))


    return () => {
      // will run on every unmount.
       console.log("component is unmounting");
      }
  },[])
  return (
    <Box sx={{ display: 'flex' }} 
    className={classes.root}
    >
      
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display:{sm :"flex",xs :"none"},
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
           
            backgroundColor:"#5cdb95"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        
        <Toolbar />
        <Divider />
        <List  sx ={{marginTop:"50px",marginLeft:"5px",overflow:"hidden"}}>
         <List_Items/>
        </List>
        {/* <Divider /> */}
        <List>
         
        </List>
        <AccountMenu sx = {{position :"absolute", bottom:"80px",left:"15px",backgroundColor:"#05386b",cursor:"pointer"}}/>
      </Drawer>
      <Box  
      
        component="main"
        sx={{ 
          flexGrow: 1,paddingLeft:"20px",background:"rgba(255, 255, 255,0.9)" }}
      >
       <Routes>
       <Route exact path="/" element={<ReaderHome  posts = {posts}/>} />
       <Route exact path="/full-post" element={<ReaderFullPostView posts = {posts} />} />
       <Route exact path="/author-profile" element={<AuthorProfile />} />
       <Route exact path="/your-profile" element={<YourProfile />} />         
       </Routes>
      </Box>
    </Box>
  );
}
