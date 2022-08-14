import TypeWriterEffect from 'react-typewriter-effect';
import { useState } from 'react';
import axios from "axios";
const ForgetPassword = ()=>{
    const myRef = document.querySelector('.scrollable-div')
    const [email,setEmail] = useState("");

    const submit=(e)=>{
        e.preventDefault();
        const data = {
            email:email,
          
        }

        axios.post('http://127.0.0.1:5000/forget',data)
        .then((res)=>{
            console.log(res)
            if(res.status=="ok"){
                console.log("-------------->",res.message)

            }


      //  navigate('/bloggerdashboard')
        })
    }
    return(
        <div   >
        <div  style={{backgroundColor:"white",width:"50%",padding:"10px",position:"absolute",right:"0px",top:"150px"}} >

            <h2>Enter Your Email</h2>
            <input  value={email} onChange={(e)=>setEmail(e.target.value)}   style={{width:"500px",height:"40px",marginBottom:"5px"}} type="text" placeholder="Enter email"/><br/>
            <input style={{width:"500px",height:"40px",backgroundColor:"black",color:"white",cursor:"pointer",padding:"5px"}} type="submit"  onClick={submit} /><br/>
        </div>
         <div style={{height:"721px",width:"45%",padding:"00px",backgroundColor:"black",alignItems:"center",justifyContent:"center",display:"flex"}}>
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
export default ForgetPassword;