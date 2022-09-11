// import './BloggerSideBar.css'
// import React, { useState } from 'react';
// import {Dropdown} from 'react-bootstrap';
// import {FaRegUserCircle} from 'react-icons/fa';

// import {useNavigate} from "react-router-dom"
// import * as AiIcons from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import { SidebarData } from './SidebarData';

// import { IconContext } from 'react-icons';
// const BloggerSideBar2 = ()=>{
//   const navigate = useNavigate();
//     const [sidebar, setSidebar] = useState(true);

//     const showSidebar = () => setSidebar(!sidebar);
//     return(
//        <>
//              <IconContext.Provider value={{ color: 'white' }}>
//         <div className='navbar' style={{postion :"absolute",top:"0px"}}>
          
//           {/* <Link to='#' className='menu-bars'>
//             {/* <FaIcons.FaBars onClick={showSidebar} /> */}
//           {/* </Link> */}
//           <h2 style={{color:"black",marginLeft:"100px",fontWeight:"bold"}} >IBlogs</h2>
//            {/* */} 
//         </div>
//         <nav  className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//         <div   style={{position:"absolute",bottom:"60px",cursor:"pointer"}}  >
//           <Dropdown>
//               <Dropdown.Toggle id="dropdown-basic" variant="info"  style={{backgroundColor:"transparent",cursor:"pointer"}}  >
//               <FaRegUserCircle size = "20px"  />
//               </Dropdown.Toggle>

//               <Dropdown.Menu    style={{backgroundColor:"black",padding:"10px"}} >
//                 <Dropdown.Item  style={{color:"white",textDecoration:"none"}}  onClick = {()=>{navigate("/login")}} >LogOut</Dropdown.Item><br/>
//                 <Dropdown.Item  style={{color:"white",textDecoration:"none"}} onClick ={()=>{navigate("/bloggerdashboard/updateProfile")}}  >Profile</Dropdown.Item>
                
//               </Dropdown.Menu>
//           </Dropdown>
          
//           </div>
//           <ul className='nav-menu-items' >
//             <li className='navbar-toggle'>
//               <Link style={{color:"white"}} to='#' className='menu-bars'>
//                 {/* <AiIcons.AiOutlineClose /> */}
//                 {/* <FaIcons.FaBars onClick={showSidebar} /> */}
//                 {/* <h1 style={{color:"white",fontSize:"40px"}} >IBlogs</h1> */}
//               </Link>
//             </li>
            
//             {/* <h2 style={{marginLeft:"9px",padding:"0px",color:"white" }}>B</h2> */}
//             <hr color='white' />
//             {SidebarData.map((item, index) => {
//               return (
//                 <li key={index} className={item.cName}>
//                   <Link to={item.path}>
//                     {item.icon}
//                     {/* <span>{item.title}</span> */}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
         
//         </nav>
//       </IconContext.Provider>
//        </>
//     )
// }
// export default BloggerSideBar2;