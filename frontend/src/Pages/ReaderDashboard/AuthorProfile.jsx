import axios from "axios";
import {useState,useEffect,useContext} from "react";
import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';    
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams } from 'react-router-dom';
//import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import ProfileInfoTabs from '../../components/ProfileComps/ProfileInfoTabs';
import { UserContext } from "./ReaderDashboard";
const AuthorProfile = ({profileData})=>{
    const value = useContext(UserContext);
    console.log("profilevalue--",profileData)
    const [userData,setUserData] =useState(null);
    const [followed,setFollowed,] =useState(true)
    let { userId } = useParams();
    //console.log("userId",userId)

//-----------------------------------------------------------------------------------
    const handleFollowClick = ()=>{
        let value = JSON.parse(localStorage.getItem("token"));
        let token = value.token;
        
        if(followed){
            setFollowed(false)
            axios.post(`http://127.0.0.1:5000/readerDashboard/remove-follower/${userId}`,{},{
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: token,
                  },
            }).then(res =>{
                
                console.log(res)
                let value = JSON.parse(localStorage.getItem("token"));
                let token = value.token;
                axios.get(`http://127.0.0.1:5000/readerDashboard/getUserData/${userId}`,{
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: token,
                      },
                }).then(res=>{
                   // console.log("*************************",res.data)
                    setUserData(res.data[0])
                     
                    isFollowed(res.data[0])
                    
                })
            })
        }else{
            axios.post(`http://127.0.0.1:5000/readerDashboard/add-follower/${userId}`,{},{
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: token,
                  },
            }).then(res =>{
                console.log(res)
                let value = JSON.parse(localStorage.getItem("token"));
                let token = value.token;
                axios.get(`http://127.0.0.1:5000/readerDashboard/getUserData/${userId}`,{
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: token,
                      },
                }).then(res=>{
                   // console.log("*************************",res.data)
                    setUserData(res.data[0]);
                    isFollowed(res.data[0])
                    
                })
            })
        }
          
    }

//-----------------------------------------------------------------------------------
   const isFollowed = (userData)=>{
    console.log("reached**********************************************************")
    let a = false
    if( profileData && userData && userData.followers.length !== 0){
        console.log("+++++++++++++++++++++++++++++++++++++++++++---+")
        userData.followers.map(item=>{
            console.log("!!!!!!!!!!!!!!!!!!1",item)
            console.log(profileData._id)
            if(item === profileData._id){
                console.log("+++++++++++++++++++++++++++++++++++++++++++--")
            //    a = true
                setFollowed(true)
                return;
            }else{
                setFollowed(false)
                return;
            } 
        })
    }else{
        setFollowed(false)
        return;
    }
    
    return a
   }
   
   
  // console.log( "a is  :",isFollowed())
    
    useEffect(()=>{
      
        //    console.log("1121212121212112212122121",value)
        let value = JSON.parse(localStorage.getItem("token"));
        let token = value.token;
        axios.get(`http://127.0.0.1:5000/readerDashboard/getUserData/${userId}`,{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
        }).then(res=>{
           // console.log("*************************",res.data)
            setUserData(res.data[0])
            isFollowed(res.data[0]);
        })
//---------------------------------------------------------------------



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
            <Button   onClick = {handleFollowClick}   sx = {{backgroundColor:"#379863",color:"#05386b",marginTop:"10px","&:hover":{backgroundColor:"#379863"}}}  variant="contained">{followed? "Followed":"Follow"}</Button>
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