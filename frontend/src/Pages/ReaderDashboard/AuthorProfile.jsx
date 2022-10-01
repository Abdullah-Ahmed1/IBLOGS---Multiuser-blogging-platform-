import axios from "axios";
import {useState,useEffect} from "react";
import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';    
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import ProfileInfoTabs from '../../components/ProfileComps/ProfileInfoTabs';
const AuthorProfile = ()=>{
    const [userData,setUserData] =useState(null);
    let { userId } = useParams();
    console.log("userId",userId)

    useEffect(()=>{
        let value = JSON.parse(localStorage.getItem("token"));
        let token = value.token;
        axios.get(`http://127.0.0.1:5000/readerDashboard/getUserData/${userId}`,{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
        }).then(res=>{
            console.log("*************************",res.data)
            setUserData(res.data[0])
        })
    },[])


    return(
        <>
        {
            userData ? (
               <> 
            <CssBaseline />
            <Grid2 container spacing={0} justifyContent= "space-between"   >
            <Grid2 xs={12} md={5} lg={8} spacing={0} sx = {{minHeight:"100vh",marginTop:"20px",marginLeft:"30px"}}  >
                <Grid2   sx = {{fontFamily: '"Source Sans Pro",Arial,sans-serif',marginTop:"50px",boxShadow:"0 4px 8px 0 rgba(92,219,149, 0.2), 0 6px 20px 0 rgba(92,219,149, 0.19)"}}>
                    <Grid2 container direction="row" sx = {{backgroundColor:"white"}}  justifyContent="space-between">
                        <Grid2 sx = {{paddingLeft:"20px"}} >
                            <div>
                            <h1 style={{color:"#05386b",marginBottom:0,paddingBottom:0}} >{userData.firstname} {userData.lastname}</h1>
                            <h4 style={{margin:"0px",color:"grey"}} >{userData.email}</h4>
                            <h4 style={{margin:"0px",color:"grey"}}>{userData.profession} @ {userData.organization}</h4>
                            </div>
                        </Grid2>
                        <Grid2  sx = {{alignItems:"center",justifyContent:"center",paddingRight:"20px"}}    >
                            <img  style={{color:"#05386b",width:"150px",height:"150px",borderRadius:"100%",marginTop:"10%"}}  src={userData.profileImage} alt="" />
                            {/* <Avatar   alt="Travis Howard" src="https://res.cloudinary.com/dlgwvuu5d/image/upload/v1660686670/my-uploads/t3gssujtpbrgl1gzp97f.jpg"  sx = {{height:"100px",width:"100px",fontSize:"50px"}}  /> */}
                        </Grid2>
                    </Grid2>
                    <Grid2 sx = {{backgroundColor:"transparent"}}>
                    <ProfileInfoTabs/>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Grid2   xs={12} md={5} lg={3 }   sx = {{position:"fixed",top:"0px",right:"0px",height:"100vh",overflow:"auto", background:"#05386b",marginRight:"0px",paddingLeft:"12px" } }     >
            <Grid2 container direction="column" alignItems="center" >
            <Grid2>
                <img  style={{width:"150px",height:"150px",borderRadius:"100%",border:"2px solid #379863",marginTop:"30%"}}  src={userData.profileImage} alt="" />
            </Grid2>
            <Grid2>
                <h3 style={{color:"#379863",marginBottom:0,paddingBottom:0}}>{userData.firstname} {userData.lastname}</h3>
            </Grid2>
            <Grid2>
                <h4 style={{color:"#379863",margin:0,padding:0}}>{userData.email}</h4>
            </Grid2>
            <Grid2>
                <h4 style={{color:"#379863",margin:0,padding:0}}>{userData.profession}@{userData.organization}</h4>
            </Grid2>
            <Grid2>
            <Button sx = {{backgroundColor:"#379863",color:"#05386b",marginTop:"10px","&:hover":{backgroundColor:"#379863"}}} variant="contained">Follow</Button>
             </Grid2>
             
            </Grid2>
             <Grid2 container>
                <Grid2 sx = {{marginTop:"10px"}}>
                    <h4 style={{color:"#379863"}}>Others followers:</h4>
                </Grid2>
            </Grid2>   
               </Grid2>
            </Grid2>
            </>
            ):(
                <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>   
            )
        }
            
        </>
    )
}
export default AuthorProfile;