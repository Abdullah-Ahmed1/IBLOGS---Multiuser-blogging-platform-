import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import TypeWriterEffect from 'react-typewriter-effect';
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
  import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller } from "react-hook-form";
import { useState } from 'react';
import _ from 'lodash';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const theme = createTheme();

export default function SignUp() {
    const myRef = document.querySelector('.scrollable-div')
    //-----------------------------------------snackbar--------
    const [responseMsg,setResponseMsg] = useState(null)
    const [open,setOpen] = useState(false)
    const handleClose = ()=>{
        setOpen(false)
    }
    //--------------------------------------- firstname -------
    const [firstName,setFirstName] = useState("");
    const [firstNameError,setFirstNameError] = useState(false)
    const [firstNameErrorText,setFirstNameErrorText] = useState("")
   //------------------------------------------lastname--------------------- 
    const [lastName,setLastName] = useState("");
    const [lastNameError,setLastNameError] = useState(false)
    const [lastNameErrorText,setLastNameErrorText] = useState("")
//-----------------------------------------------email--------------------
const [email,setEmail] = useState("");
const [emailError,setEmailError] = useState(false)
const [emailErrorText,setEmailErrorText] = useState("")
//-----------------------------------------------------------------
const [password,setPassword] = useState("");
const [passwordError,setPasswordError] = useState(false)
const [passwordErrorText,setPasswordErrorText] = useState("")
//----------------------------------------------------------------
const [confirmPass,setConfirmPass] = useState("");
const [confirmPassError,setConfirmPassError] = useState(false)
const [confirmPassErrorText,setConfirmPassErrorText] = useState("")
const [validated,setValidated] = useState(false);

//--------------------------------------------------------------
    const firstnameValidate=()=>{
      console.log(firstName)
      const firstnameValidator1 = /^[A-Za-z]+$/;
     // const firstnameValidator2 = ;
      if(firstName===""  ){
        setFirstNameError(true)
        setFirstNameErrorText("first name is required")
        setValidated(false)
      }else if(!firstnameValidator1.test(firstName)){
        setFirstNameError(true)
        setFirstNameErrorText("first name should only include letters")
        setValidated(false)
      }else if(! /^[A-Z][a-z]*/.test(firstName)){
        setFirstNameError(true)
        setFirstNameErrorText("first letter should be capital ")
        setValidated(false)
      }
      else{
        setFirstNameError(false)
        setValidated(true)
      }
    }
    const lastnameValidate=()=>{
      console.log(lastName)
      const firstnameValidator1 = /^[A-Za-z]+$/;
     // const firstnameValidator2 = ;
      if(lastName===""  ){
        setLastNameError(true)
        setLastNameErrorText("first name is required")
        setValidated(false)
      }else if(!firstnameValidator1.test(lastName)){
        setLastNameError(true)
        setLastNameErrorText("first name should only include letters")
        setValidated(false)
      }else if(! /^[A-Z][a-z]*/.test(lastName)){
        setLastNameError(true)
        setLastNameErrorText("first letter should be capital ")
        setValidated(false)
      }
      else{
        setLastNameError(false)
        setValidated(true)
      }
    }
    const emailValidate = ()=>{
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;  
      if(email===""  ){
        setEmailError(true)
        setEmailErrorText("email is required")
        setValidated(false)
      }else if(!emailRegex.test(email)){
        setEmailError(true)
        setEmailErrorText("email is pattern is not correct")
        setValidated(false)
      }else{
        setEmailError(false)
        setValidated(true)
      }
    }

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
    firstnameValidate();
    lastnameValidate();
    emailValidate();
    validatePassword();
    confirmPassValidate();
    console.log("validated-------",validated)
    if(validated === true){
      const data = new FormData(event.currentTarget);
      const data2 ={ 
        firstname: data.get('firstname'),
        lastname: data.get('lastname'),
        email: data.get('email'),
        password: data.get('password'),
      }
      console.log("submitted",data2)
      axios.post('http://127.0.0.1:5000/register',data2)
          .then((res)=>{
              console.log("--->",res.data.message)  
              setResponseMsg({msg : res.data.message,status:"success"})
               setOpen(true) 
          }).catch((error)=>{
              console.log("-",error.response.data )
              setResponseMsg({msg:error.response.data.message,status:"error"})
              setOpen(true) 
          })    
    }
   
  };

  return (
    <ThemeProvider theme={theme}>
      {
        responseMsg? (
          <Snackbar open={open} autoHideDuration={6000}   key={"top" + "right"}  anchorOrigin={{ vertical:"top", horizontal:"right" }}  onClose={handleClose}>
          <Alert onClose={handleClose} severity={responseMsg.status} sx={{ width: '100%' }}>
            {responseMsg? responseMsg.msg: "this is dummy"}
          </Alert>
        </Snackbar>
        ):(<div>"</div>)
      }
      
      <Grid container component="main" sx={{ height: '100vh' }}>
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
        > <div  style={{padding: "100px",color:"yellow"}}>
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx= {{padding:"10px"}}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#5cdb95' }}>
            <LockOutlinedIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                sx = {{ '& label' :{color:"#05386b"},'& label.Mui-focused':{color:"#05386b"},'& .MuiOutlinedInput-root':{ '&.Mui-focused fieldset': {  borderColor:"#05386b"} }}}
              
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  error={firstNameError}
                  helperText={firstNameError? firstNameErrorText: ""}
                  onChange = {(e)=>setFirstName(e.target.value)}
                   onBlur={firstnameValidate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                sx = {{ '& label' :{color:"#05386b"},'& label.Mui-focused':{color:"#05386b"},'& .MuiOutlinedInput-root':{ '&.Mui-focused fieldset': {  borderColor:"#05386b"} }}}
              
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  error={lastNameError}
                  helperText={lastNameError? lastNameErrorText: ""}
                  onChange = {(e)=>setLastName(e.target.value)}
                  onBlur={lastnameValidate}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                sx = {{ '& label' :{color:"#05386b"},'& label.Mui-focused':{color:"#05386b"},'& .MuiOutlinedInput-root':{ '&.Mui-focused fieldset': {  borderColor:"#05386b"} }}}
              
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError}
                  helperText={emailError? emailErrorText: ""}
                  onChange = {(e)=>setEmail(e.target.value)}
                  onBlur={emailValidate}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                sx = {{ '& label' :{color:"#05386b"},'& label.Mui-focused':{color:"#05386b"},'& .MuiOutlinedInput-root':{ '&.Mui-focused fieldset': {  borderColor:"#05386b"} }}}
              
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordError}
                  helperText={passwordError? passwordErrorText: ""}
                  onChange = {(e)=>setPassword(e.target.value)}
                  onBlur={validatePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                sx = {{ '& label' :{color:"#05386b"},'& label.Mui-focused':{color:"#05386b"},'& .MuiOutlinedInput-root':{ '&.Mui-focused fieldset': {  borderColor:"#05386b"} }}}
              
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="new-password"
                  error={confirmPassError}
                  helperText={confirmPassError? confirmPassErrorText: ""}
                  onChange = {(e)=>setConfirmPass(e.target.value)}
                  onBlur={confirmPassValidate}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" sx = {{color:"#5cdb95",'&.Mui-checked':{color:"#5cdb95"}}} />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,bgcolor:"#5cdb95",'&:hover':{backgroundColor:"#05386b" }}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to ="/login" >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
