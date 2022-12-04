import { Link } from "react-router-dom"
const Home =()=>{
    return(
        <div style={{margin:0,padding:10,backgroundColor:"#5cdb95"}} >
            <div style={{height:"97vh"}}>
                <div style={{padding:"10px 5px" , display: "flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <img  style={{width:"150px",height:"40px",marginTop:"15px"}} src="/logo3.png" alt="/logo3.png" />
                    <div style={{marginRight:"20px",padding:0}} >
                    <ul style={{fontSize:"20px",fontWeight:"bold",color:"#05386b"}}>
                        <li style={{display : "inline",margin:"0px 20px"}}>
                            <Link to = {"/login"} style={{color:"#05386b",textDecoration:"none"}}>
                                Login
                            </Link>
                        </li>
                        <li style={{display : "inline"}}>
                        <Link to = {"/register"} style={{color:"#05386b",textDecoration:"none"}} > 
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
                </div>
               
            </div>
        </div>
    )
}
export default Home