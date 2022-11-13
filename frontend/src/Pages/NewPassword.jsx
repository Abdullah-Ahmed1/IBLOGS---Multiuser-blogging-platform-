// import { useState } from "react";
// import {useNavigate} from "react-router-dom"

// import { useParams, Link } from "react-router-dom";
// import PasswordChecklist from "react-password-checklist"
// import axios from "axios"
// import "./RegisterForm.css"
// const NewPassword = ()=>{
//     const navigate = useNavigate();
//     const [validUrl, setValidUrl] = useState(true);
//     const [password,setPassword] = useState("");
//     const [confirmPassword,setConfirmPassword ] =useState("");
//     const [validation,setValidation] = useState(false)
//     const param = useParams();

//     const submit = async(e)=>{
//         e.preventDefault();
//         console.log("reached");

//         const data = {
//             password:password
//         }

//         try {
//             const url = `http://localhost:5000/${param.id}/forget/${param.token}`;
//             const res = await axios.post(url,data);
//             console.log(res);
//             setValidUrl(true);
//             navigate('/login')
//         } catch (error) {
//             console.log(error);
//             setValidUrl(false);
//         }
//     }

//     return(
//         <>
//         {validUrl ? (
//             <div >
//                 <div style={{backgroundColor:"white",width:"50%",padding:"10px",position:"absolute",right:"0px",top:"150px"}}>
                
//                 <label style={{fontWeight:"bold"}}   htmlFor="">Password</label><br />
//                 <input className="in1" value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:"500px",height:"35px",marginBottom:"7px"}} type="password" placeholder="Enter Password" required/>
                
//                 <br/>

//                 <label style={{fontWeight:"bold"}}   htmlFor="">Confirm Password</label><br />
//                 <input className="in1" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} style={{width:"500px",height:"35px"}} type="password" placeholder="Enter Password Again" required/><br/>
//                 <br />
//                 <div id="validate1" style={{position:"absolute"}}  >
//                 <PasswordChecklist id="validate1"
// 				rules={["minLength","specialChar","number","capital","match"]}
// 				minLength={5}
// 				value={password}
// 				valueAgain={confirmPassword}
// 				onChange={(isValid) => { setValidation(isValid)  }}
// 			/>
//             </div>
//                 <input style={{width:"500px",height:"40px",backgroundColor:"black",color:"white",cursor:"pointer",padding:"5px"}} type="submit"  onClick={submit} /><br/>
            
//                 </div>
//                 <div style={{height:"721px",width:"45%",backgroundColor:"black",display:"flex"}}>
//         <h1 style={{color:"white",margin:"auto",fontWeight:"bold",fontSize:"80px",fontFamily:"sans-serif"}} >IBlogs</h1><br />
        
//     </div>
//             </div>
            
//         ) : (
//             <h1>404 Not Found</h1>
//         )}
//     </>
    
//     )
// }
// export default NewPassword;



import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import TypeWriterEffect from 'react-typewriter-effect';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link,useParams} from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState,createContext, useContext  } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const theme = createTheme();

export default function SignInSide() {
  
    const myRef = document.querySelector('.scrollable-div')
    const navigate = useNavigate();
    const param = useParams();
    const [response,setResponse] = useState(null)

    const [password,setPassword] = useState("");
    const [passwordError,setPasswordError] = useState(false)
    const [passwordErrorText,setPasswordErrorText] = useState("")

    const [confirmPass,setConfirmPass] = useState("");
    const [confirmPassError,setConfirmPassError] = useState(false)
    const [confirmPassErrorText,setConfirmPassErrorText] = useState("")
    const [validated,setValidated] = useState(false);

    
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const validatePassword = ()=>{
      if(password===""  ){
        setPasswordError(true)
        setPasswordErrorText("password is required")
        setValidated(false)
      }else if(! /[*@!#%&()^~{}]+/.test(password) ){
      setPasswordError(true)
      setPasswordErrorText("atleast one special character is required") 
      setValidated(false)
    }else if(! /[0-9]+/.test(password) ){
      setPasswordError(true)
      setPasswordErrorText("atleast one integer is required")
      setValidated(false)
    }else if(! /[A-Z]+/.test(password)){
      setPasswordError(true)
      setPasswordErrorText("atleast one uppercase letter is required")
      setValidated(false)
   
    }else if(! /[a-z]+/.test(password)){
      setPasswordError(true)
      setPasswordErrorText("atleast one lowercase letter is required")
      setValidated(false)
   
    }else if(! /^.{6,}$/.test(password)){
      setPasswordError(true)
      setPasswordErrorText("atleast 6 character is required")
      setValidated(false)
   
    }
    else{
      setPasswordError(false)
      setValidated(true)
    }
  }
  const confirmPassValidate = ()=>{
    if( password !==confirmPass){
      setConfirmPassError(true)
      setConfirmPassErrorText("Password is not matched")
      setValidated(false)
    }else{
      setConfirmPassError(false)
      setValidated(true)
    }
  }

    
  const handleSubmit = (event) => {
    event.preventDefault();
    validatePassword();
    confirmPassValidate();
    if(validated === true){
      console.log("validated")
      const data = {
        password:password
      }
      axios.post(`http://localhost:5000/${param.id}/forget/${param.token}`,data)
      .then(res=>{
        console.log(res.data.message)
        setResponse({msg : res.data.message,status:"success"})
        setOpen(true) 
        setTimeout(navigate('/login'), 20000);
      }).catch(error=>{
        setResponse({msg:error.response.data.message,status:"error"})
        setOpen(true) 
        console.log(error)
      })

    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        {
          response?(
            <Snackbar open={open} autoHideDuration={6000}   key={"top" + "right"}  anchorOrigin={{ vertical:"top", horizontal:"right" }}  onClose={handleClose}>
            <Alert onClose={handleClose} severity={response.status} sx={{ width: '100%' }}>
              {response? response.msg: "this is dummy"}
            </Alert>
          </Snackbar>
          ):(
            <div></div>
          )
        }
      {/* <Snackbar open={open} autoHideDuration={6000}   key={"top" + "right"}  anchorOrigin={{ vertical:"top", horizontal:"right" }}  onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Invalid email or password!
        </Alert>
      </Snackbar> */}
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
             // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: "#5cdb95",
            backgroundSize: 'cover',
            display:{sm : "flex",xs:"none"},
            backgroundPosition: 'center',
            alignItems:"center",
            justifyContent:"center"
          }}
        >   <div  style={{padding: "100px"}}>
             <TypeWriterEffect
            
            textStyle={{
                //fontFamily: 'Red Hat Display',
                color: '#05386b',
                fontWeight: 500,
                fontSize: '4.5em',
              }}
              startDelay={1000}
              cursorColor="#3F3D56"
              hideCursorAfterText = "true"
              multiText={[
                'IBlogs',
                'An Intelligent blogging platform',
                'Provides AI utilities',
                'Manage your content through Editorial Calender ',
                'IBlogs',
              ]}
              multiTextDelay={5000}
              typeSpeed={40}
            scrollArea={myRef}
          />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#5cdb95' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx = {{color:"#05386b"}} >
              New Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
              sx = {{ '& label' :{color:"#5cdb95"},'& label.Mui-focused':{color:"#5cdb95"},'& .MuiOutlinedInput-root':{ '&.Mui-focused fieldset': {  borderColor:"#5cdb95"} }}}
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                error={passwordError}
                helperText={passwordError? passwordErrorText: ""}
                onChange = {(e)=>setPassword(e.target.value)}
                onBlur={validatePassword}
              />
              <TextField
               sx = {{ '& label' :{color:"#5cdb95"},'& label.Mui-focused':{color:"#5cdb95"},'& .MuiOutlinedInput-root':{ '&.Mui-focused fieldset': {  borderColor:"#5cdb95"} }}}
               margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={confirmPassError}
                helperText={confirmPassError? confirmPassErrorText: ""}
                onChange = {(e)=>setConfirmPass(e.target.value)}
                onBlur={confirmPassValidate}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , backgroundColor:"#5cdb95",'&:hover':{backgroundColor:"#05386b"} }}
              >
                Submit
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link to ="/forget  " >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link style={{cursor:"pointer", color:"#05386b"}}   to = "/register" >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
            
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
