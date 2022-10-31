// import { FaFacebookF ,FaGoogle,FaTwitter} from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import TypeWriterEffect from 'react-typewriter-effect';
// import {useNavigate} from "react-router-dom"
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login =()=>{
//     const [email,setEmail] = useState("");
//     const [password,setPassword] = useState("");
//     const navigate = useNavigate();
//     const myRef = document.querySelector('.scrollable-div')
//     const submitHandle = (e)=>{
//         e.preventDefault();
//         const data = {
//             email:email,
//             password:password
//         }

//         axios.post('http://127.0.0.1:5000/login',data)
//         .then((res)=>{
//             console.log(res)
//             if(res.data.status=="ok"){
//                 console.log("-------------->",res.data.data)

//                 localStorage.setItem('token',JSON.stringify({
//                     login:true,
//                     token:res.data.data
                    
//                 }));
//                 navigate('/bloggerdashboard')

//             }else{
//                 toast("Wrong Email or Password",
//                     {
//                         position: "top-right",
//                         autoClose: 5000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                     });   
//             }


//       //  navigate('/bloggerdashboard')
//         })
       
//     }


  

//     return(
//         <div>
//             <div style={{backgroundColor:"white",width:"50%",padding:"10px",position:"absolute",right:"0px",top:"150px"}}>
//            <div>
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
//             <form>
//                 <label style={{fontWeight:"bold"}} htmlFor="">Email</label><br />
//                 <input  value={email} onChange={(e)=>setEmail(e.target.value)}   style={{width:"500px",height:"40px",marginBottom:"5px"}} type="text" placeholder="Enter email"/><br/>
//                 <label style={{fontWeight:"bold"}}   htmlFor="">Password</label><br />
//                 <input  value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:"500px",height:"40px",marginBottom:"5px"}} type="password" placeholder="Enter Password"/><br/>
//                 <Link to="/forget"  >
//                 <p>Forget Password?</p>
//                 </Link>
//                 <br />
//                 <input style={{width:"500px",height:"40px",backgroundColor:"black",color:"white",cursor:"pointer",padding:"5px"}} type="submit" onClick={submitHandle} /><br/>
//             </form><br />
//             <p>Do not have an account?<Link style={{fontWeight:"bold",textDecoration:"none"}}  to="/register" >Register</Link></p>
//             <br />

//             <hr />
//             <div style={{marginLeft:"0px",marginTop:"50px",display:"flex",flexDirection:"row"}}>
//                 <div style={{width:"100px",marginRight:"50px",cursor:"pointer"}}>
                   
//                 </div><br />
//                 <div style={{width:"50px",marginRight:"50px",cursor:"pointer"}}>
//                     <h3 style={{fontSize:"20px"}}  ><span  ><FaGoogle size="2em"  /></span></h3><br />
//                 </div>
//                 <div style={{width:"50px",marginRight:"50px",cursor:"pointer"}}>
//                     <h3 style={{fontSize:"20px"}}  ><span  ><FaTwitter size="2em"  /></span></h3><br />
//                 </div>
//                 <div>
//                 {/* <GoogleLogin
//                     clientId="287678460130-tqs1952f4mj3fstsm8583a7bnoiomnjl.apps.googleusercontent.com"
//                     buttonText="Login"
//                     render={renderProps => (
//                         <button style={{backgroundColor:"black",width:"250px",height:"55px",color:"white"}}  onClick={renderProps.onClick} disabled={renderProps.disabled}><span  ><FaGoogle size="2em"  /></span></button>
//                       )}
//                     onSuccess={responseSuccessGoogle}
//                     onFailure={responseErrorGoogle}
//                     cookiePolicy={'single_host_origin'}
//                 /> */}
//                 </div>
//             </div>
//         </div>
//         <div style={{height:"801px",width:"45%",padding:"00px",backgroundColor:"black",alignItems:"center",justifyContent:"center",display:"flex"}}>
//            <div style={{maxWidth:"50%", backgroundColor:"black"}}>
//            <TypeWriterEffect
            
//             textStyle={{
//                 //fontFamily: 'Red Hat Display',
//                 color: 'White',
//                 fontWeight: 500,
//                 fontSize: '4.5em',
//               }}
//               startDelay={1000}
//               cursorColor="#3F3D56"
//               hideCursorAfterText = "true"
//               multiText={[
//                 'IBlogs',
//                 'An Intelligent blogging platform',
//                 'Provides AI utilities',
//                 'Manage your content through Editorial Calender ',
//                 'IBlogs',
//               ]}
//               multiTextDelay={5000}
//               typeSpeed={40}
//             scrollArea={myRef}
//           />
//            </div>
            
            
//         </div>        </div>
//     )
// }
// export default Login