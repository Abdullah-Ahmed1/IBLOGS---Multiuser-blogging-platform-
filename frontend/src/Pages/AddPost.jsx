
import { useState } from 'react';
import BloggerSideBar from './../components/BloggerSidebar/BloggerSideBar';

import Paper from '@mui/material/Paper';


import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Grid3x3Outlined } from '@mui/icons-material';
import MyEditor from './../components/Editorjs/Editor';
//import Editor2 from './../components/Editorjs/Editor2';
const AddPost = ()=>{
    const [content, SetContent] = useState("");
    const [click ,setClick] = useState(false);
    const [data, setData] = useState({});
    const [files,setFiles] = useState([]);
    const onEditorChange = (value)=>{
        SetContent(value);
        console.log(value);
    }
    const onFilesChange = (files)=>{
        setFiles(files)
    }
    const handleClick = ()=>{

    }

    return(
        

        <Grid container spacing={3} direction="row">
           
          
        
           
           <Grid item xs={12} >
         
           <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' ,  maxWidth:{md :"90%"}}}>
             <MyEditor/> 
             </Paper>
            
             </Grid>
            
           
        </Grid>
    )
}
export default AddPost;