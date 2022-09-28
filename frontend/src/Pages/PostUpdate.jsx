//import ReactQuill from 'react-quill'; // ES6
import { useState,useEffect } from 'react';
import BloggerSideBar from './../components/BloggerSidebar/BloggerSideBar';
//import Editor from './../components/UpdatePostComps/Add';
import { useParams } from "react-router-dom";

 import parse from "html-react-parser";
// import ReactHtmlParser from 'react-html-parser';
import axios from "axios";

const PostUpdate = ()=>{
    let   {PostId}   = useParams();
    console.log("//////",PostId)
    const [content, SetContent] = useState("");
    const [files,setFiles] = useState([]);
    const [blogPost,setBlogPost] = useState("");
    const [blogTitle,setBlogTitle] = useState("");
  //  const [blogId,setBlogId] = useState("");
    const onEditorChange = (value)=>{
        SetContent(value);
        console.log(value);
    }
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/bloggerDashboard/get/${PostId}`)
        .then((res)=>{
            console.log("--------",typeof(res.data._id))
          setBlogPost(res.data.post)
          setBlogTitle(res.data.title)  
       //   setBlogId(res.data._id)

            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])


    const onFilesChange = (files)=>{
        setFiles(files)
    }

    return(
        

        <div>
            Postupdate
            {/* <div>
            <BloggerSideBar/>
            </div>
            
            <div style={{marginLeft:"51px"}}>
             <Editor postContent={blogPost} postTitle = {blogTitle}  />  
            </div> */}
        </div>
    )
}
export default PostUpdate;