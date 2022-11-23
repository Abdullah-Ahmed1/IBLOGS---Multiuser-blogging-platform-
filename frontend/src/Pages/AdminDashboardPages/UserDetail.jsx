import CssBaseline from '@mui/material/CssBaseline';
import Grid2 from '@mui/material/Unstable_Grid2';
import {useParams } from "react-router-dom"
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom'
// import Divider from '@mui/material/Divider';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
 import { useNavigate } from 'react-router-dom';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState,useEffect } from 'react';
import axios from "axios";

const UserDetail = ()=>{
    const navigate = useNavigate();
    const [user,setUser] = useState(null) 
    const [dum,setDum]  =useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus omnis hic, dicta molestiae commodi at porro laboriosam reiciendis accusantium quod quo saepe corporis, consequatur, sequi nobis temporibus animi ea mollitia?") 
    let { userId } = useParams();

useEffect(()=>{
    let value = JSON.parse(localStorage.getItem("adminToken"));
    let token = value.adminToken;
    axios.get(`http://127.0.0.1:5000/admin/get-one-user/${userId}`,{
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
    })
    .then(res=>{
        console.log("---->",res.data)
        setUser(res.data)
    })

},[])


    return(
        <>
        <CssBaseline />
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 lg ={11} spacing={0} sx = {{minHeight:"90vh",marginTop:"50px",marginLeft:"30px"}}  >  
       {/* ----------------------------------------------------------------------------------- */}
        <div style={{marginTop:"70px"}}>

        </div> 
       {/* <h3>User Details will be shown here</h3> */}
        {
            user ? (
                <Grid2 container spacing={3} >
                <Grid2 lg = {6} container direction={"column"} sx = {{justifyContent:"center",alignItems:"center"}} >
                   <Grid2 >
                   <img style={{width:"150px",borderRadius:"50%"}} src={user.profileImage} alt="" />
                   </Grid2>
                   <Grid2 lg = {12}>
                   <Paper sx = {{padding:"20px"}}>
                        <h2 style={{margin:0,padding:0}}>{user.firstname} {user.lastname}</h2>
                        <h3 style={{margin:0,padding:0}}>{user.email}</h3>
                        <h4 style={{margin:0,padding:0}}>{user.profession} @ {user.organization}</h4>
                        <p style={{maxHeight:"100px" ,overflow:"auto"}} >{user.about ==="" || !user.about ? "No about Info Provided" : user.about }</p>
                        <Button   onClick={()=> navigate(`/admin/users/blogs/${userId}`)}  fullWidth variant="contained"  sx = {{backgroundColor:"#379863",color:"white",'&:hover':{backgroundColor:"#05386b"}}}>View Blogs</Button>
                        <Grid2 container direction={"row"} justifyContent={"space-between"} sx = {{margin:"20px 60px"}} >
                            <Grid2 >
                                <h4>Total Blogs</h4>
                                <h4>Total Posts</h4>
                                <h4>Total Followers</h4>
                                <h4>Total Following</h4>
                            </Grid2>
                            <Grid2>
                                <h4>{user.your_blogs.length}</h4>
                                <h4>50</h4>
                                <h4>{user.followers.length}</h4>
                                <h4>{user.following.length}</h4>
                            </Grid2>
                            
                        </Grid2>
                    </Paper>
                   </Grid2>
                    
                </Grid2>
                <Grid2 lg = {6}>
                    <Paper sx ={{padding:"20px"}} >
                        <h4 style = {{padding:0,margin:0}}>Followers</h4>
                        
                        <Grid2 container sx = {{padding:"30px"}}  direction={"column"}>
                        {
                            user.followers.length>0?( user.followers.map(follower=>{
                                return(
                                    // <Link  key={follower._id} to = {`/admin/users/detail/${follower._id}`}>
                                    <Grid2 onClick={()=> navigate(`/admin/users/detail/${follower._id}`)}  container spacing={1}  alignItems={"center"} sx = {{fontSize:"18px", marginBottom:"5px"}}>
                                    <Grid2>
                                    <Avatar alt={follower.firstname} src={follower.profileImage} />
                                    </Grid2>
                                    <Grid2>
                                        {follower.firstname} {follower.lastname}
                                    </Grid2>
                                  </Grid2>
                                //   </Link>
                                )
                            })):(
                                <h5>No Follower</h5>
                            )
                        }
                       </Grid2>
                     

                       <h4 style = {{padding:0,margin:0}}>Following</h4>
                       <Grid2 container sx = {{padding:"30px"}}  direction={"column"}>
                        {
                            user.following.length>0?( user.followers.map(follower=>{
                                return(
                                    <Grid2 container spacing={1}  alignItems={"center"} sx = {{fontSize:"18px", marginBottom:"5px"}}>
                                    <Grid2>
                                    <Avatar alt={follower.firstname} src={follower.profileImage} />
                                    </Grid2>
                                    <Grid2>
                                        {follower.firstname} {follower.lastname}
                                    </Grid2>
                                  </Grid2>
                                )
                            })):(
                                <h5>Following no one</h5>
                            )
                        }
                       </Grid2>
                        {/* <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                         >
                        <Typography>Followers</Typography>
                       
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem similique sapiente, veritatis tenetur labore dignissimos architecto sint voluptas, beatae laboriosam nobis aut. Ad, soluta. Iste nisi in consequatur commodi vero.
                           
                            </Typography>
                        </AccordionDetails>
                        </Accordion>
                        <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                         >
                        <Typography>Following</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem similique sapiente, veritatis tenetur labore dignissimos architecto sint voluptas, beatae laboriosam nobis aut. Ad, soluta. Iste nisi in consequatur commodi vero.
                            </Typography>
                        </AccordionDetails>
                        </Accordion> */}

                    </Paper>
                </Grid2>
            </Grid2>
            ):(
                <h2>Loading </h2>
            )
        }
       
       
     
        {/* ---------------------------------------------------------------- */}
        </Grid2>
      
      </Grid2>

        </>
    )
}
export default UserDetail