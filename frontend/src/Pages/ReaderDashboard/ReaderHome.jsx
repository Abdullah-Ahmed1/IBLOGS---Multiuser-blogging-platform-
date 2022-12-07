import * as React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import "../../components/PostComponentsMui/TrendPostCard.css"
//import Box from '@mui/material/Box';
//import Grid from "@mui/material/Grid";
import Grid2 from '@mui/material/Unstable_Grid2';
//import List from '@mui/material/List';
import { CircularProgress} from '@mui/material';
//import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
//import { createStyles, makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
//import List_Items from '../../components/ReaderDashComponents/ListItems2';
import SearchBar from "../../components/ReaderDashComponents/Searchbar"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
//------------
//import ThumbUpIcon from '@mui/icons-material/ThumbUp';
//import ShareIcon from '@mui/icons-material/Share';
//import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
//import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import "./../../components/PostComponentsMui/PostCardScroll.css";
//import Avatar from '@mui/material/Avatar';
//import Grid from "@mui/material/Grid";
//import Box from "@mui/material/Box";
//import MoreVertIcon from '@mui/icons-material/MoreVert';
import RecommendedChips from './../../components/PostComponentsMui/RecommendChips';
import TrendPostCard from './../../components/PostComponentsMui/TrendPostCard';
//import AccountMenu from './../../components/Avatar/AccountAvatar';
//import CreateListMenu from './../../components/ReaderDashComponents/CreateSavedListMenu';
import ReaderPostCard from './ReaderPostCard';
import PostCardMobile from './../../components/PostComponentsMui/PostCardMobile';
import Searching from '../../components/ReaderDashComponents/Searching';



const ReaderHome = ()=>{
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.down('lg'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const [trendingPosts,setTrendingPosts] = useState(null)
  const [posts,setPosts] = useState(null)
    const [added,setAdded] = useState(false) 
    const handleSaveIconClick =()=>{
      setAdded(true)
    } 

    const handleChipClick = (label)=>{
      console.log("66666",label)
      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      axios.get(`http://127.0.0.1:5000/readerDashboard/filter-with-tags/${label}`,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }).then(res=>{
        setPosts(res.data)
      })
     }

    const handleLikeClick = (postId)=>{
      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      console.log("click with postid",postId)
      
      axios.post(`http://127.0.0.1:5000/readerDashboard/add-like/${postId}`,{},{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }).then(res => {
        console.log(res)
        axios.get('http://127.0.0.1:5000/readerDashboard',{
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        })
        .then(res =>{
          console.log("res--------",res.data    ) 
          setPosts(res.data)
          
         
        }).catch(err=> console.log(err))
      
      } )
    


    }
//--------------------not interested handle--------------------------------
    const handleNotInterested = (id)=>{

      setPosts(posts.filter(item=>{
        return item._id != id
      }))

      console.log("!!!qqq",id)
    }
//----------------------------------------------    
    useEffect(()=>{
      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      axios.get('http://127.0.0.1:5000/readerDashboard',{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      })
      .then(res =>{
        console.log("res--------",res.data    ) 
        setPosts(res.data)

        
       
      }).catch(err=> console.log(err))
    },[])

    useEffect(()=>{
      let value = JSON.parse(localStorage.getItem("token"));
      let token = value.token;
      axios.get('http://127.0.0.1:5000/readerDashboard',{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      })
      .then(res =>{
        console.log("res--------",res.data    ) 
        

        res.data.sort((a,b)=>{
          if(a.likes.length> b.likes.length) return 1;
          if(a.likes.length< b.likes.length) return -1;
          return 0 ;
        })
        setTrendingPosts(res.data)
        
       
      }).catch(err=> console.log(err))
    },[])

    return(
        <>
        <CssBaseline />
        <div style={{marginTop:"30px",marginBottom:"30px",display:"flex",justifyContent:"flex-start",width:"50%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}>
          {/* <h2 style = {{color:"#379863"}}>IBlogs</h2> */}
          <img style={{width:"180px",marginRight:"50px"}} src={'/logo2.png'} alt="iblogs" />
          {/* <SearchBar/> */}
          <Searching borderColor={"black"} width = {'495px'} height = {'550px'}/>
        </div>
        {/* <Divider variant="middle"/> */}
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 xs={12} sm={12} md={5} lg={7} spacing={0} 
          // sx = {}
          sx = {small? {minHeight:"80vh",marginTop:"40px",marginLeft:"5px", marginRight:"5px"}  : {minHeight:"80vh",marginTop:"20px",marginLeft:"30px"} }
          >  
       {/* ----------------------------------------------------------------------------------- */}
       {/* <Posts  posts = {posts}/> */}
       {

      posts !==null ? (
        posts.length > 0 ? (
         
        
          posts.map(item =>{
           
            return (
              <ReaderPostCard   key = {item._id} item ={item}  handleLikeClick={handleLikeClick} handleNotInterested={handleNotInterested} />
        
            )
          })
        ):(
          <h2>No data to show </h2>
        )
      ):(
        <CircularProgress/>
      )

}
{/* <PostCardMobile/> */}
         
    
        {/* ---------------------------------------------------------------- */}
        </Grid2>
        <Divider orientation='vertical' sx={{width:"29px"}} flexItem/>
        <Grid2 
        className="sideScroll" 
        xs={12} sm={12} md={5} lg={3.3 }   
        // sx = {{ position:"fixed",bottom:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"20px"} } 
        sx ={small?{paddingLeft:"20px"} : { position:"fixed",bottom:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"20px"} }
        >
       
        {/* <Divider /> */}
        <h4 style={{color:"#5cdb95"}} > Recommended Topics</h4>
        <RecommendedChips  handleChipClick ={handleChipClick} />
        <div>
        <h4 style={{color:"#5cdb95"}}>Trending Posts</h4>
          {
            trendingPosts !== null? (
              trendingPosts.length > 0?(
                trendingPosts.map(item=>{
                  return (
                    <TrendPostCard  key={item._id}  item = {item}/>
                  )
                })
              ):(
                <h3>No trending right now</h3>
              )
            ):(
              <CircularProgress/>
            )
          }
          {/* <TrendPostCard/>
          <TrendPostCard/>
          <TrendPostCard/>
          <TrendPostCard/>
          <TrendPostCard/> */}
          </div>
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
export default ReaderHome