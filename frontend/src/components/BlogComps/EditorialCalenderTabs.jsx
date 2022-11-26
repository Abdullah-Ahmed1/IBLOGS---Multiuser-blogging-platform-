import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from "axios"
import { indexOf } from 'lodash';
import EditorialCalender from '../../Pages/EditorialCalender';
import Schedular from './../../Pages/Schedular';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    console.log("!!!1",index,value)
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

export default function TabsWrappedLabel({blogs,handleChange,value,handleChangeIndex}) {
  
    console.log("2222",value)
    const theme = useTheme();
    // useEffect(()=>{
    //     axios.get('http://127.0.0.1:5000/bloggerDashboard/get',{
    //         headers:{
    //           "Content-Type":"application/json",
    //           "Accept":"application/json",
    //           "Authorization": token 
    //         }
    //       })
    //       .then((res)=>{
    //           console.log("blogssss----",res.data.blogs)
    //           setValue(res.data.blogs[0]._id)
    //       }).catch((error)=>{
    //           console.log(error)
    //       })
    // },[])
  
  return (
    <>
    <Box sx={{backgroundColor:"white", width: '100%' }}>
        <AppBar position="static">
      <Tabs
      sx = {{backgroundColor:"white"}}
        value={value}
        onChange={handleChange}
        variant = "fullWidth" 
        aria-label="wrapped label tabs example"
      >
        {
            blogs.map(blog=>{
                return(
                    <Tab
                    key={blog._id}
                    // value={blog._id}
                    label={blog.title}
                    {...a11yProps(indexOf(blog))}
                    // wrapped
                  />
                )
            })
        }
       
        {/* <Tab value="two" label="Item Two" /> */}
        {/* <Tab value="three" label="Item Three" /> */}
      </Tabs>
      </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
      >
        {
            blogs.map(blog=>{
                console.log("----/",indexOf(blog))
                return(
                    <TabPanel key = {blog._id} value={indexOf(blog)} index={indexOf(blog)} dir={theme.direction}>
                        <EditorialCalender blogId={blog._id} />
                    </TabPanel>
                )
            })
        }
         
       
        </SwipeableViews>
    </Box>
  <div style={{backgroundColor:"white",padding:"20px",width:"100%"}}>
    <Schedular/>
  </div>
  </>
  );
}
