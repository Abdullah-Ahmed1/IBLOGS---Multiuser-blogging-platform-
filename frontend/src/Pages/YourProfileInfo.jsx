import {useState,useEffect,useContext} from "react";
import axios from "axios";
import CssBaseline from '@mui/material/CssBaseline';
import Grid2 from '@mui/material/Unstable_Grid2';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CropEasy from './../components/ImageCrop/CropEasy';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import { UserContext } from "./ReaderDashboard/ReaderDashboard";

const YourProfile =()=>{
   // const [profileData,setProfileData]=  useState({});
    const [cropOpen, setCropOpen] = useState(false);
    const [nameEdit,setNameEdit] = useState(false);
    const [professionEdit,setProfessionEdit] = useState(false);
    const [aboutEdit,setAboutEdit] = useState(false)

    const value = useContext(UserContext);
    console.log("profilevalue--",value.profileData)
    //console.log("!!!!",profileData)
    const handleClickOpen = () => {
        setCropOpen(true);
      };
      const handleClose = () => {
        setCropOpen(false);
      };
    useEffect(()=>{
       
    },[])

    return (
        <>
        <CssBaseline/>
         <Grid2 container spacing={0} justifyContent= "space-between"   >
         <Grid2 xs={12} md={5} lg={7} spacing={0} sx = {{minHeight:"100vh",marginLeft:"30px"}}  >
         <Grid2   sx = {{fontFamily: '"Source Sans Pro",Arial,sans-serif',marginTop:"50px",boxShadow:"0 4px 8px 0 rgba(92,219,149, 0.2), 0 6px 20px 0 rgba(92,219,149, 0.19)"}}>
                    <Grid2 container direction="column" sx = {{backgroundColor:"white"}}  >
                    <Grid2  sx = {{paddingLeft:"20px",paddingTop:"30px"}}    >
                            <div>
                                <div  style = {{cursor:"pointer"}} >
                                <CropEasy cropOpen = {cropOpen} handleClickOpen={handleClickOpen} handleClose={handleClose}  />
                                <CameraAltIcon onClick ={handleClickOpen} sx = {{position:"absolute"}} />
                                
                                <img  style={{width:"150px",height:"150px",borderRadius:"100%"}}  src={value.profileData.profileImage? value.profileData.profileImage: "https://res.cloudinary.com/dlgwvuu5d/image/upload/v1663106838/my-uploads/ppp_rufoeg.png" } alt="" />
                                </div>
                            </div>
                            {/* <Avatar   alt="Travis Howard" src="https://res.cloudinary.com/dlgwvuu5d/image/upload/v1660686670/my-uploads/t3gssujtpbrgl1gzp97f.jpg"  sx = {{height:"100px",width:"100px",fontSize:"50px"}}  /> */}
                        </Grid2>
                        <Grid2 sx = {{paddingLeft:"20px",paddingBottom:"20px"}} >
                            <Grid2 container sx ={{paddingTop:"10px"}} columnSpacing={2} direction="row" alignItems={"center"}  >
                                <Grid2 >
                                    {
                                        nameEdit?(
                                            <TextField id="filled-basic" size="small" label="Username" variant="filled" /> 
                                        ):
                                        (
                                            <h1 style={{margin:"0px"}}>{value.profileData.firstname} {value.profileData.lastname}</h1>    
                                               
                                        )
                                    }
                                    
                                </Grid2>
                                <Grid2 alignItems={"center"} >
                                    {
                                        nameEdit ?(
                                        <DoneIcon  sx = {{cursor:"pointer"}}  onClick = {()=>setNameEdit(false)}   />            
                                        ):(
                                            <EditIcon  sx = {{cursor:"pointer"}}  onClick = {()=>setNameEdit(true)} />     
                                        )
                                    }
                                    
                                </Grid2>
                            </Grid2> 
                            <Grid2>
                                <Grid2>
                                <h4 style={{margin:"0px",color:"grey"}} >{value.profileData.email}</h4>
                                </Grid2>
                            </Grid2>   
                            <Grid2 container  columnSpacing={2} direction="row" alignItems={"center"}  >
                                <Grid2>
                                    {
                                        professionEdit?(
                                            <TextField id="filled-basic" size="small" label="Username" variant="filled" />
                                        ):(
                                            <h4 style={{margin:"0px",color:"grey"}}>software engineer @ Google</h4>
                                        )
                                    }
                              
                                </Grid2>
                                <Grid2>
                                    {
                                        professionEdit?(
                                            <DoneIcon sx = {{cursor:"pointer"}}  onClick = {()=>setProfessionEdit(false)}/>
                                        ):( 
                                            <EditIcon  sx = {{cursor:"pointer"}}  onClick = {()=>setProfessionEdit(true)}/>
                                        )
                                    }
                                   
                                </Grid2>
                            </Grid2>
                            <Grid2 container  columnSpacing={2} direction={"column"}   >
                                <Grid2 container direction={"row"}  alignItems={"center"} >
                                    <Grid2>
                                        <h4 style={{margin:"0px",paddingLeft:"10px"}}>About: </h4>
                                       
                                    </Grid2>
                                    <Grid2>
                                        {
                                            aboutEdit?(
                                                <DoneIcon sx = {{cursor:"pointer",fontWeight:"bold"}}  onClick = {()=>setAboutEdit(false)}/>
                                            ):(
                                                <EditIcon  sx = {{cursor:"pointer"}}  onClick = {()=>setAboutEdit(true)}/>
                                            )
                                        }
                                       
                                    </Grid2>

                                </Grid2>
                                <Grid2>
                                    {
                                        aboutEdit?(
                                            <TextField id="filled-basic" sx = {{width:"80%"}} multiline size="small" label="About" rows={5}  variant="filled" />
                                           
                                        ):(
                                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio voluptatum nobis aliquid sapiente corporis temporibus molestiae obcaecati, dolor aut, amet, quod consequatur? Ratione animi vero rem eum quasi ad consequatur. 
                                            </p>
                                        )
                                    }
                                </Grid2>
                                <Grid2 container direction="row" columnSpacing={10}>
                                    <Grid2>
                                        Total Blogs
                                    </Grid2>
                                    <Grid2>
                                        Total Posts
                                    </Grid2>
                                </Grid2>     
                               
                            </Grid2>
                               
                        </Grid2>
                       
                    </Grid2>
                    {/* <Grid2>
                        
                    </Grid2> */}
                    {/* <Grid2 sx = {{backgroundColor:"transparent"}}>
                    
                    </Grid2> */}
                </Grid2>
            </Grid2>
            <Grid2  xs={12} md={5} lg={3 }  sx = {{position:"fixed",top:"0px",right:"0px",height:"100vh",overflow:"auto", background:"rgba(92, 219, 149,1)",marginRight:"0px",paddingLeft:"12px" } }     >
       

            </Grid2>
         </Grid2>
           
        </>
    )

}
export default YourProfile;