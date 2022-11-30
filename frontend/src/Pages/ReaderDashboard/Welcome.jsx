import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from '@mui/styles';
import { useState,useEffect ,useRef} from 'react';
import axios from "axios";
import lottie from 'lottie-web';
import Button from '@mui/material/Button';
import WelcomeTagsArray from './../../components/ReaderDashComponents/WelcomeTagsArray';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    root:{
     // height :'100vh',
     width:"100%",
      backgroundImage: 'url(https://res.cloudinary.com/dlgwvuu5d/image/upload/v1667135496/my-uploads/bgEdited_czexlr.png)',
      backgroundRepeat : "repeat",
      backgroundAttachment:"fixed",
       backgroundSize:"contain",
     
    }
  }))
const Welcome = ()=>{
    const navigate = useNavigate()
    const container = useRef(null)
      const classes = useStyles();
        const [tags,setTags] = useState([])
        const [selected,setSelected] = useState([])    
    //-------------------------------------------------------
        const[profession,setProfession] = useState("")
        const[organization,setOrganization] = useState("")
        const[about,setAbout] = useState("")
         
       const handleChipClick = (tag)=>{
        console.log("!!",tag)
        if(selected.includes(tag)){
            setSelected(selected.filter(item=>{
              return  item !== tag
            }))
        }else{
            setSelected([...selected,tag])
        }
        
       }        

       const handleNext = ()=>{

        const data = {
            profession:profession,
            organization:organization,
            about:about,
            tags:selected.map(item=> {
                return(
                    item.label
                )
            })
        }
        let value = JSON.parse(localStorage.getItem("token"));
        let token = value.token;
            axios.post('http://127.0.0.1:5000/add-profile-info',{data},{
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: token,
                  }, 
            }).then(res=>{
                navigate("/readerDashboard")
            })
       }


       useEffect(()=>{
    
        lottie.loadAnimation({
          container : container.current,
          renderer: 'svg',
          loop:true,
          autoplay:true,
          animationData:require('../../lottie/welcome.json')
      
        })
        
      },[])   
    useEffect(()=>{
        let value = JSON.parse(localStorage.getItem("token"));
        let token = value.token;
        axios.post(`http://127.0.0.1:5000/update-lastLogin-date`,{},{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
        })            
    },[])

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/get-tags`).
        then(res=>{
            setTags(res.data.map((item,index)=>{
                return(
                    {
                        key:index,
                        label: item 
                    }
                )
            }))
        })

    },[])

return(
    <Box className={classes.root}>
    <Grid2 container direction={"column"} sx={{padding:"12px",minHeight:"100vh",background:"rgba(92, 219, 149,0.95)",}} >
        <Grid2 sx ={{height:"100px",marginLeft:"30px"}}>
          <h2 style={{color:"#05386b"}}>IBlogs</h2>  
        </Grid2>
    <Grid2  container  justifyContent = {"center"}  direction = {"row"}  spacing = {3} sx = {{padding:"10px 20px"}}>
            <Grid2 container direction={"column"} columnSpacing={3}  lg={5} sx = {{backgroundColor:"white",padding:"25px",borderRadius:"10px",boxShadow:"0 4px 8px 0 rgba(0,0,0, 0.9), 0 6px 20px 0 rgba(0,0,0, 0.9)"  }}  >
                <h3 style = {{color:"#05386b"}}>Tell us about yourself!</h3>
                <TextField  value={organization} onChange={(e)=> setOrganization(e.target.value)} id="standard-basic" label="Organization" variant="standard" />
                <TextField value={profession} onChange={(e)=> setProfession(e.target.value)} sx = {{marginTop:"15px"}} id="standard-basic" label="Profession" variant="standard" />
                <TextField value={about} onChange={(e)=> setAbout(e.target.value)} sx = {{marginTop:"15px"}} id="standard-basic" multiline rows = {4} label="About" variant="standard" />
                <h3 style = {{color:"#05386b"}}>
                    Select tags you are interested in!   
                </h3>
                <div style={{maxHeight:"150px",overflow:"auto"}}>
                    <WelcomeTagsArray tags={tags} handleChipClick={handleChipClick} selected={selected} />
                </div>
            </Grid2>
            <Grid2 lg={4}  >
                <Grid2>
                <div className='container' ref={container} style={{width:"350px"}}  ></div>    
                </Grid2>
                
                
            </Grid2 >
        
    </Grid2>
    <div style = {{padding:"0px 30px", display:"flex", justifyContent:"flex-end"}}>
    <Button  onClick = {handleNext} sx = {{backgroundColor:"#05386b"}} variant="contained" endIcon={<SendIcon />}>Next</Button>
    </div>
    </Grid2>
    
    </Box>
)

}
export default Welcome