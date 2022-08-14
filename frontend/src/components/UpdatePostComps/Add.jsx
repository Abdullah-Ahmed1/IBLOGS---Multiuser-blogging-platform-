// import React from "react";
// import {useEffect,useState} from 'react'
// import parse from 'html-react-parser';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";
// import {useNavigate} from "react-router-dom"

// import fetch from 'isomorphic-unfetch';

// import "quill/dist/quill.snow.css"; // Add css for snow theme
// // or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

//  const Editor=({postContent,postTitle}) => {
   
 
//   const [content,setContent] = useState(postContent);
//   const [title,setTitle] = useState(postTitle);
//   console.log("++++++",title)
//   const navigate = useNavigate();
//   const insertToEditor = (url) => {
//     const range = quill.getSelection();
//     quill.insertEmbed(range.index, 'image', url);
//   };

//   const saveToServer = async (file) => {
//     const body = new FormData();
//     body.append('file', file);
//     body.append('upload_preset',"my-uploads")

//     const res = await fetch('https://api.cloudinary.com/v1_1/dlgwvuu5d/image/upload', { method: 'POST', body }).then(r=>r.json());
//     console.log("-----",res.secure_url)
//     insertToEditor(res.secure_url);
    
//   };

//   const selectLocalImage = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = () => {
//       const file = input.files[0];
//       saveToServer(file);
//     };
//   };

//   const submitHandler =()=>{
//     const data = {
//       title: title,
//       post : content
//     }
//     axios.post('http://localhost:5000/bloggerDashboard/add',data)
//     .then((res)=>{
//         console.log("--",res.statusText)
//         if(res.statusText == 'OK'){


//           toast("Successfully Created",
//                     {
//                         position: "top-right",
//                         autoClose: 5000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                     }); 

//           setTimeout(function(){
//             navigate('/bloggerdashboard')    

//           }, 5100); 
          
//         }
//     }).catch((error)=>{
//         console.log(error)
//     })
//  } 



//   React.useEffect(() => {
//     setTitle(postTitle);
//     if (quill) {
//       quill.clipboard.dangerouslyPasteHTML(postContent);
//       quill.on('text-change', (delta, oldDelta, source) => {
//        // console.log('Text change!');
//         //console.log(quill.getText()); // Get text only
//         console.log(quill.getContents()); // Get delta contents
//         setContent(quill.root.innerHTML)
//         console.log(typeof(quill.root.innerHTML)); // Get innerHTML using quill
//         quill.getModule('toolbar').addHandler('image', selectLocalImage);
//         //console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
//       }); 
//     }
//   }, [quill]);

//   //console.log(quill); // undefined > Quill Object
//   //console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

//   return (
//     <div  style={{display:"flex",flexDirection:"column",marginTop:"20px"}} >
//       <div>
//            <ToastContainer 
//                 theme="dark"
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
                
//             />
//            </div>
//            <div style={{margin:"auto"}}>
//              <h3>Add title</h3>
//               <textarea  value={title} onChange={e=>{setTitle(e.target.value)}} style={{fontSize:"30px",fontFamily:"sans-serif"}} rows={2} cols={85}  ></textarea>
//            </div>
//       <div style={{ width: "90%",margin:"auto", height: 577,maxHeight:577 }} >
//         <div ref={quillRef} />
//       </div>
//         {/* <div  className="ql-editor" v-html="result"   >
//             {parse(content)}
//         </div> */}
//         <div style={{backgroundColor:"white",height:"50px",margin:"50px auto"}}>
//             <button style={{width:"100px",height:"50px",fontWeight:"bold",color:"white",backgroundColor:"black"}} onClick={submitHandler} >Submit</button>
//         </div>
//     </div>
    
//   )
// };
// export default Editor;