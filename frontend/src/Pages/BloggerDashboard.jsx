import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import BloggerHome from './BloggerHome';
import BloggerBlog from './BloggerBlog';
import AddPost from './AddPost';
import FullBlogView from './FullBlogView';
import PostUpdate from './PostUpdate';
import Box from "@mui/material/Box";
import ProfileUpdate from './ProfileUpdate';
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
const BloggerDashboard = ()=>{
    const mdTheme = createTheme({
        palette: {
          primary: {
            main: "#ffffff",
          },
          secondary: {
            main: "#000000",
          },
        },
        paper: {
          background: "black",
        },
      });

    return(
        <ThemeProvider theme ={ mdTheme}>
        <Box sx={{ display: "flex" }}>
             
            <Routes>
                <Route exact path="/" element={<BloggerHome />} />
                <Route exact path="/blogs" element={<BloggerBlog />} />
                <Route exact path="/addpost" element={<AddPost />} />
                <Route exact path="/full-blog/:blogId" element={<FullBlogView />} /> 
                <Route exact path="/update/:PostId" element={<PostUpdate />} /> 
                <Route exact path="/updateProfile" element={<ProfileUpdate />} />

            </Routes>
            
        </Box>
        </ThemeProvider>
    )
}
export default BloggerDashboard;