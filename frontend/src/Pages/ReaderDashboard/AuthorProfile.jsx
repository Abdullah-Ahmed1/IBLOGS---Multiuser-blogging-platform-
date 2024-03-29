import axios from "axios";
import {useState,useEffect,useContext} from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';    
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
//import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
 import ProfileInfoTabs from '../../components/ProfileComps/ProfileInfoTabs';
import { UserContext } from "./ReaderDashboard";

const AuthorProfile = ()=>{
    const location = useLocation()
    const navigate = useNavigate()
    const value = useContext(UserContext);
    const [profileData,setProfileData] = useState(null)
    const [userData,setUserData] =useState(null);
    const [followed,setFollowed,] =useState(false)
    
    let { userId } = useParams();
    //console.log("userId",userId)

//-----------------------------------------------------------------------------------
    const handleFollowClick = ()=>{
        
        console.log("on traget",followed)
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
                axios.get(`http://127.0.0.1:5000/readerDashboard/getUserData1/${userId}`,{
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: token,
                      },
                }).then(res=>{
                    console.log("*************************///",res.data[0])
                    // setUserData(res.data[0])
                    profileData && res.data[0].followers.includes(profileData._id)? setFollowed(true): setFollowed(false)
                    // isFollowed(res.data[0])
                    
                })
            })
        }else{
            setFollowed(true)
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
                axios.get(`http://127.0.0.1:5000/readerDashboard/getUserData1/${userId}`,{
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: token,
                      },
                }).then(res=>{
                   // console.log("*************************",res.data)
                    // setUserData(res.data);
                    console.log( "-*-*-*-",profileData && res.data.followers.includes(profileData._id))
                    profileData && res.data.followers.includes(profileData._id)? setFollowed(true): setFollowed(false)
                   
                    
                    // isFollowed(res.data[0])
                    
                })
            })
        }
          
    }

//-----------------------------------------------------------------------------------
   const isFollowed = (userData)=>{
    
    // console.log("reached**********************************************************")
    // let a = false
    // if( profileData && userData && userData.followers.length !== 0){
    //     console.log("+++++++++++++++++++++++++++++++++++++++++++---+")
    //     userData.followers.map(item=>{
    //         console.log("!!!!!!!!!!!!!!!!!!1",item)
    //         console.log(profileData._id)
    //         if(item === profileData._id){
    //             console.log("+++++++++++++++++++++++++++++++++++++++++++--")
    //         //    a = true
    //             setFollowed(true)
    //             return;
    //         }else{
    //             setFollowed(false)
    //             return;
    //         } 
    //     })
    // }else{
    //     setFollowed(false)
    //     return;
    // }
    
    // return a
   }
   
   
  // console.log( "a is  :",isFollowed())
    
//    useEffect(()=>{
//     let value = JSON.parse(localStorage.getItem("token"));
//         let token = value.token;
//     axios.get(`http://127.0.0.1:5000/readerDashboard/get-user-followers`,{
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: token,
//           }, 
//     }).then(res=>{
//         console.log(res.data)
//     })    
//    },[])


   useEffect(()=>{
    let value = JSON.parse(localStorage.getItem("token"));
    let token = value.token;
    axios.get(
        "http://127.0.0.1:5000/getProfile",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("Got Profile", res);
        setProfileData(res.data)
       
      })
      .catch((err) => console.log("errr", err));
   },[location])
    useEffect(()=>{
      console.log("caledd")
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
            console.log("111111",res.data)


        if(typeof(res.data)=="object"){
           setUserData(res.data)
            
        }else{
            console.log("data is not object")
            setUserData(" ")
        }
                
                    
                    // isFollowed(res.data[0]);
    })
//---------------------------------------------------------------------



    },[location])


    useEffect(()=>{
        let value = JSON.parse(localStorage.getItem("token"));
        let token = value.token;
        axios.get(`http://127.0.0.1:5000/readerDashboard/getUserData1/${userId}`,{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
        }).then(res=>{
            

            axios.get(
                "http://127.0.0.1:5000/getProfile",
                {
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: token,
                  },
                }
              )
              .then((profile) => {
                console.log("Got Profile", profile.data);
                setProfileData(profile.data)

                if(typeof(res.data)=="object"){
                    console.log("data is object",res.data.followers)
                    // console.log( "!-*-*-*-", res.data.followers.includes(profileData._id))
                    if(profile.data){
                        console.log("1111111122212121",profile.data._id,res.data.followers)
                        
                    }
                    console.log("//--//+",res.data.followers.includes(profile.data._id))
                    res.data.followers.includes(profile.data._id)? setFollowed(true): setFollowed(false)
                    // console.log("********************//--//*****",res.data[0].followers.includes())
                    // setUserData(res.data)
                    console.log("111111",res)
                    // console.log("123324242423",profileData.followers)
        
                }else{
                    console.log("data is not object")
                    // setUserData(" ")
                }


               
              })
        })
    },[Location])


    return(
        <>
        {
            userData  ? (
                typeof(userData)=="object"? (
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
                            <ProfileInfoTabs  userData = {userData} /> 
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
                            {
                                userData.followers.map(follower=>{
                                    return(
                                        
                                        <Grid2  onClick = {()=>navigate(`/ReaderDashboard/author-profile/${follower._id}`)}  container sx = {{cursor:"pointer"}} direction={"row"} alignItems={"center"} columnSpacing={2} >

                                            <Grid2>
                                                <Avatar sx= {{ width: 24, height: 24}} alt={follower.firstname} src={follower.profileImage} />
                                            </Grid2>
                                            <Grid2>
                                                <p style={{color:"#379863",fontSize:"12px"}}>{follower.firstname} {follower.lastname}</p>
                                            </Grid2>
                                        </Grid2>
                                        
                                    )
                                })
                            }
                             <h4 style={{color:"#379863"}}>Following</h4>
                             {
                                userData.following.map(following=>{
                                    return(
                                        <Grid2 onClick = {()=>navigate(`/ReaderDashboard/author-profile/${following._id}`)} container sx = {{cursor:"pointer"}} direction={"row"} alignItems={"center"} columnSpacing={2} >
                                            <Grid2>
                                                <Avatar sx= {{ width: 24, height: 24}} alt={following.firstname} src={following.profileImage} />
                                            </Grid2>
                                            <Grid2>
                                                <p style={{color:"#379863",fontSize:"12px"}}>{following.firstname} {following.lastname}</p>
                                            </Grid2>
                                        </Grid2>
                                        
                                    )
                                })
                            } 
                        </Grid2>
                    </Grid2>   
                       </Grid2>
                    </Grid2>
                    </>
                ):(
                    <Grid2 sx={{padding:0,margin:0,minHeight:"95vh"}}>
                        <div>User doesnot exist anymore </div>
                    </Grid2>
                )   
            
            ):(
                <Box sx={{ display: 'flex',margin:"auto" }}>
                <CircularProgress />
              </Box>   
            )
        }
            
        </>
    )
}
export default AuthorProfile;