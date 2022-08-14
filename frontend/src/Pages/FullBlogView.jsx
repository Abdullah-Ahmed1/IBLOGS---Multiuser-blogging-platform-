import { useParams } from "react-router-dom";
import { useEffect,useState } from 'react';
 import parse from "html-react-parser";
// import ReactHtmlParser from 'react-html-parser';
import axios from "axios";
import { typeOf } from "react-crude-animated-tick";
const FullBlogView  =()=>{
    let  {blogId}   = useParams();
    const [blogPost,setBlogPost] = useState("");
    const [blogTitle,setBlogTitle] = useState("");
    console.log("*****",blogPost.post)
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/bloggerDashboard/get/${blogId}`)
        .then((res)=>{
            console.log("--------",typeof(res.data))
          setBlogPost(res.data.post)
          setBlogTitle(res.data.title)  
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])



    return(

        <div style={{padding:"20px",margin:"20px 40px"}} className="ql-editor" v-html="result"  >
            <h1>full blog view</h1>
            {/* <h2>{blogTitle}</h2>
            <div>
            {parse(blogPost)}
            </div> */}
        </div>
    )
}
export default FullBlogView;