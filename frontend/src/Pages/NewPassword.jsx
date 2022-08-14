import { useState } from "react";
import {useNavigate} from "react-router-dom"

import { useParams, Link } from "react-router-dom";
import PasswordChecklist from "react-password-checklist"
import axios from "axios"
import "./RegisterForm.css"
const NewPassword = ()=>{
    const navigate = useNavigate();
    const [validUrl, setValidUrl] = useState(true);
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword ] =useState("");
    const [validation,setValidation] = useState(false)
    const param = useParams();

    const submit = async(e)=>{
        e.preventDefault();
        console.log("reached");

        const data = {
            password:password
        }

        try {
            const url = `http://localhost:5000/${param.id}/forget/${param.token}`;
            const res = await axios.post(url,data);
            console.log(res);
            setValidUrl(true);
            navigate('/login')
        } catch (error) {
            console.log(error);
            setValidUrl(false);
        }
    }

    return(
        <>
        {validUrl ? (
            <div >
                <div style={{backgroundColor:"white",width:"50%",padding:"10px",position:"absolute",right:"0px",top:"150px"}}>
                
                <label style={{fontWeight:"bold"}}   htmlFor="">Password</label><br />
                <input className="in1" value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:"500px",height:"35px",marginBottom:"7px"}} type="password" placeholder="Enter Password" required/>
                
                <br/>

                <label style={{fontWeight:"bold"}}   htmlFor="">Confirm Password</label><br />
                <input className="in1" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} style={{width:"500px",height:"35px"}} type="password" placeholder="Enter Password Again" required/><br/>
                <br />
                <div id="validate1" style={{position:"absolute"}}  >
                <PasswordChecklist id="validate1"
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={5}
				value={password}
				valueAgain={confirmPassword}
				onChange={(isValid) => { setValidation(isValid)  }}
			/>
            </div>
                <input style={{width:"500px",height:"40px",backgroundColor:"black",color:"white",cursor:"pointer",padding:"5px"}} type="submit"  onClick={submit} /><br/>
            
                </div>
                <div style={{height:"721px",width:"45%",backgroundColor:"black",display:"flex"}}>
        <h1 style={{color:"white",margin:"auto",fontWeight:"bold",fontSize:"80px",fontFamily:"sans-serif"}} >IBlogs</h1><br />
        
    </div>
            </div>
            
        ) : (
            <h1>404 Not Found</h1>
        )}
    </>
    
    )
}
export default NewPassword;