import "./RegisterForm.css"
import { Link } from "react-router-dom";
import axios from "axios";
import TypeWriterEffect from 'react-typewriter-effect';
import { useState,useEffect } from "react";
import PasswordChecklist from "react-password-checklist"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const Register = ()=>{
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [dob,setDob] = useState("");
    const [country,setCountry] = useState("");
    const [mobile,setMobile] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword ] =useState("");
    const [validation,setValidation] = useState(false)
    console.log("validation",validation)

    const myRef = document.querySelector('.scrollable-div')
    const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
    console.log(username)

    const submit = (e)=>{
        if(validation == true){
            e.preventDefault();
        const data = {
            username: username,
            email:email,
            dob:dob,
            country:country,
            mobile:mobile,
            password:password,

        }
        console.log(data)
        axios.post('http://127.0.0.1:5000/register',data)
        .then((res)=>{
            console.log("--->",res.data.message)
            setMsg(res.data.message)
            toast(res.data.message,
                {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        }).catch((error)=>{
            console.log("-",error)
            if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
                console.log("22",error.response.data.message)
				setError(error.response.data.message);
                toast(error.response.data.message,
                    {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
			}
        })
        }else{
            toast("please fill fields according to the rules and try again",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        }
        
       
    }
return(
    <div>
        <div style={{backgroundColor:"white",width:"50%",padding:"10px",position:"absolute",right:"0px",top:"50px"}}>
            <div>
            <ToastContainer 
                theme="dark"
                type = "info"
                
            />
            </div>
            <form>
                <label  style={{fontWeight:"bold"}} htmlFor="">Username</label><br />
                <input  value={username} onChange={(e)=>setUsername(e.target.value)}   style={{width:"500px",height:"35px",marginBottom:"7px"}} type="text" placeholder="Enter username" required /><br/>
                
                <label style={{fontWeight:"bold"}} htmlFor="">Email</label><br />
                <input  value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:"500px",height:"35px",marginBottom:"7px"}} type="text" placeholder="Enter email" required/><br/>
                
                <label  style={{fontWeight:"bold"}} htmlFor="">Date of birth</label><br />
                <input  value={dob} onChange={(e)=>setDob(e.target.value)} style={{width:"500px",height:"35px",marginBottom:"7px"}} type="date" placeholder="Select" required /><br/>
                
                <label style={{fontWeight:"bold"}}   htmlFor="">Country</label><br />
                <input value={country} onChange={(e)=>setCountry(e.target.value)} style={{width:"500px",height:"35px",marginBottom:"7px"}} type="text" placeholder="Enter Country"  required/><br/>
                
                <label style={{fontWeight:"bold"}}   htmlFor="">Mobile</label><br />
                <input value={mobile} onChange={(e)=>setMobile(e.target.value)} style={{width:"500px",height:"35px",marginBottom:"7px"}} type="text" placeholder="Enter Mobile Number"/><br/>
                
                <label style={{fontWeight:"bold"}}   htmlFor="">Password</label><br />
                <input className="in1" value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:"500px",height:"35px",marginBottom:"7px"}} type="password" placeholder="Enter Password" required/>
                
                <br/>

                <label style={{fontWeight:"bold"}}   htmlFor="">Confirm Password</label><br />
                <input className="in1" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} style={{width:"500px",height:"35px"}} type="password" placeholder="Enter Password Again" required/><br/>
                <div id="validate1" style={{position:"absolute"}}  >
                <PasswordChecklist id="validate1"
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={5}
				value={password}
				valueAgain={confirmPassword}
				onChange={(isValid) => { setValidation(isValid)  }}
			/>
            </div>
                <br />
                <input style={{width:"500px",height:"40px",backgroundColor:"black",color:"white",cursor:"pointer",padding:"5px"}} type="submit"  onClick={submit} /><br/>
            </form>
            <p>Already have an account?<Link to="/login" style={{textDecoration:"none",fontWeight:"bold"}}  >Login</Link></p>
            {/* {error && <div >{error}</div>}
			{msg && <div >{msg}</div>} */}
        </div>
        <div  className="side"  style={{height:"721px",width:"45%",padding:"00px",backgroundColor:"black",alignItems:"center",justifyContent:"center",display:"flex"}}>
           <div style={{maxWidth:"50%", backgroundColor:"black"}}>
           <TypeWriterEffect
            
            textStyle={{
                //fontFamily: 'Red Hat Display',
                color: 'White',
                fontWeight: 500,
                fontSize: '4.5em',
              }}
              startDelay={1000}
              cursorColor="#3F3D56"
              hideCursorAfterText = "true"
              multiText={[
                'IBlogs',
                'An Intelligent blogging platform',
                'Provides AI utilities',
                'Manage your content through Editorial Calender ',
                'IBlogs',
              ]}
              multiTextDelay={5000}
              typeSpeed={40}
            scrollArea={myRef}
          />
           </div>
    </div>
    </div>
)

}
export default Register ;