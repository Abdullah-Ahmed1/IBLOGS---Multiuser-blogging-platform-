import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BlogCard from './../BlogComps/BlogCardMui';
import Grid2 from '@mui/material/Unstable_Grid2';
import AuthorBlogCard from './../ReaderDashComponents/AuthorBlogCard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProfileInfoTabs({userData}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("!!!!",userData)

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} sx = {{backgroundColor:"white"}} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Blogs" {...a11yProps(0)} />
          <Tab label="Posts" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid2 container flexDirection={"row"} spacing ={2}>
        {
          userData.your_blogs.map(blog=>{

            return (
              <Grid2>
                <AuthorBlogCard  item={blog}  />
              </Grid2>
            )
          })
        }
        </Grid2>
      </TabPanel>
      <TabPanel value={value} index={1}>
        All posts will be shown here
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}
