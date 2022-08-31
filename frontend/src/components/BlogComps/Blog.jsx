// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { MdDelete, MdPublish } from "react-icons/md";
// import { AiFillEye } from "react-icons/ai";
// import parse from "html-react-parser";
// import "./BlogBox.css";
// import Aos from "aos";
// const Blog = ({ blog,handleDelete }) => {
 

//   useEffect(() => {
//     Aos.init({ duration: 2000 });
//     console.log(".....", blog);
//   }, []);
//   return (
//     <div
//       style={{ backgroundColor: "grey" }}
//       data-aos="fade-left"
//       className="blog-box"
//     >
//       <div
//         style={{
//           position: "absolute",
//           right: "5px",
//           bottom: "0px",
//           height: "50%",
//           width: "10%",
//         }}
//         className="options"
//       >
//         <MdDelete
//           style={{ cursor: "pointer" }}
//           size="35px"
//           onClick={()=>{handleDelete(blog._id)}}
//         />
//         <MdPublish size="35px" />
//         <Link  style={{color:"black"}} target={"_blank"}
//           to={`/bloggerdashboard/full-blog/${blog._id}`}>
//         <AiFillEye size="35px"  />
//         </Link>
//       </div>
//       <div>
//         <Link  style={{color:"black",textDecoration:"none"}}  to={`/bloggerdashboard/update/${blog._id}`} >
//           <div
//             style={{
//               height: "250px",
//               backgroundColor: "white",
//             }}
//           >
//             <div style={{padding:"10px"}} >
//               <h2>{blog.title}</h2>
//             </div>
//             {/* <div>{parse(blog.post)}</div> */}
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };
// export default Blog;
