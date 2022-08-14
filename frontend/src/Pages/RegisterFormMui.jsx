import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
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


const theme = createTheme();

export default function SignUp() {
    const myRef = document.querySelector('.scrollable-div')
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const data2 ={ 
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      email: data.get('email'),
      password: data.get('password'),
    }


    axios.post('http://127.0.0.1:5000/register',data2)
        .then((res)=>{
            console.log("--->",res.data.message)
          
        
        }).catch((error)=>{
            console.log("-",error)
 
        })
        
        
  };

  return (
    <ThemeProvider theme={theme}>
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
            backgroundColor: "black",
            backgroundSize: 'cover',
            display:{sm : "flex",xs:"none"},
            backgroundPosition: 'center',
            alignItems:"center",
            justifyContent:"center"
          }}
        > <div  style={{padding: "100px"}}>
             <TypeWriterEffect
            
            textStyle={{
                //fontFamily: 'Red Hat Display',
                color: 'White',
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
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,bgcolor:"black" }}
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
