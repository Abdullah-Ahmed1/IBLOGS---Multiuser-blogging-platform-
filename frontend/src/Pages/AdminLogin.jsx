import * as React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme({
    palette:{
        background:{
            default:"#5cdb95"
        }
    }
});

export default function AdminLogin() {

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data1 = new FormData(event.currentTarget);
    console.log({
      username: data1.get('username'),
      password: data1.get('username'),
    });
    const data = {
      username: data1.get('username'),
      password: data1.get('password'),
    }

    axios.post("http://127.0.0.1:5000/admin/login",data)
    .then(res=>{
      console.log(res.data.status)
      if(res.data.status === "ok"){
        localStorage.setItem('adminToken',JSON.stringify({
          login:true,
          adminToken:res.data.data
          
      }));
        navigate("/admin/home")
      }else{
        setOpen(true)
      }
      
    })
  };

  return (
    <ThemeProvider theme={theme}>
       <Snackbar open={open} autoHideDuration={6000}   key={"top" + "right"}  anchorOrigin={{ vertical:"top", horizontal:"right" }}  onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Invalid username or password!
        </Alert>
      </Snackbar>
      <Container  sx = {{backgroundColor:"white",width:500,height:500,borderRadius:"10px"}} component={Paper} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
      
            
          }}
          
        >

          <Avatar sx={{ m: 1, bgcolor: ' #05386b' }}>
            <LockOutlinedIcon sx = {{color:"#5cdb95"}}/>
          </Avatar>
          <Typography component="h1" variant="h5" sx = {{color:" #05386b"}} >
            Admin
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
              autoFocus
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:"#05386b",'&:hover':{backgroundColor:"#5cdb95"}}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}