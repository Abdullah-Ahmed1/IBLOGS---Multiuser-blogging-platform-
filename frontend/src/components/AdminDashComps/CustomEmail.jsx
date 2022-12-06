import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect,useState } from 'react';
import axios from 'axios';
import EmailSentSnack from './../../components/AdminDashComps/EmailSentSnack';
import EmailAccordion from './../../components/AdminDashComps/AdminEmailAccordion';

const CustomEmail = ()=>{
  const [email,setEmail] = useState("")
  const [subject,setSubject] = useState("")
  const [body,setBody]  = useState("")

  const [emailSentSnackOpen, setEmailSentSnackOpen] = useState(false);
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setEmailSentSnackOpen(false);
  };
  
  
  const handleSend =()=>{
    const data ={
      email : email,
      subject:subject,
      body: body

    }
    let value = JSON.parse(localStorage.getItem("adminToken"));
    let token = value.adminToken;
    axios.post(`http://127.0.0.1:5000/admin/send-email`,data,{
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
    }).then(res=>{
      setEmailSentSnackOpen(true)
      setEmail("")
      setSubject("")
      setBody("")   
    }) 


       

  }
    return(
        <div>
        <EmailSentSnack open = {emailSentSnackOpen} handleClose={handleSnackClose} />
        {/* <CssBaseline /> */}
        {/* <div style={{marginTop:"20px",display:"flex",width:"73%",flexDirection:"row" ,background:"rgba(237, 245, 225,0)",alignItems:"center",justifyContent:"space-between"}}> */}
          {/* <h2 style = {{color:"#379863"}}>IBlogs</h2> */}
          {/* <SearchBar/> */}
        {/* </div> */}
        {/* <Divider variant="middle"/> */}
      <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 lg ={11} spacing={0} sx = {{marginLeft:"30px"}}  >  
       {/* ----------------------------------------------------------------------------------- */}
        {/* <div style={{marginTop:"70px"}}>
        {/* <h2 style={{color:"#05386b"}}>Weekly Report</h2>
        <Paper sx = {{padding:"15px"}}>
       yReportsItems/> */}
        {/* </div>  */} 
        
        <Grid2 container flexDirection={"column"}>
          <div style={{display:"flex",flexDirection:"column",gap:"10px",backgroundColor:"white",padding:"20px"}}>
          <h3>Emailing</h3>
          <TextField   value ={email} onChange={(e)=>setEmail(e.target.value)} id="filled-basic" label="Email Address" variant="filled" />
          <TextField  value={subject} onChange={(e)=>setSubject(e.target.value)}  id="filled-basic" label="Subject" variant="filled" />

          <TextField  value={body} onChange={(e)=>setBody(e.target.value)}  id="filled-basic" multiline rows={4} label="Subject" variant="filled" />
          <Button  sx = {{backgroundColor:"#05386b"}} onClick={handleSend}  variant="contained">Send</Button>
          </div>

        </Grid2>
         
     
        {/* ---------------------------------------------------------------- */}
        </Grid2>
       
      </Grid2>

        </div>

    )
}
export default CustomEmail