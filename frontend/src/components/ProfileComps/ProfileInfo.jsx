import { useEffect,useState } from 'react';
import { TiTick } from "react-icons/ti";
import {MdEdit} from "react-icons/md";


const ProfileInfo = ()=>{

    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [number, setNumber] = useState("");
    const [country, setCountry] = useState("");
    const [selectedImage,setSelectedImage] = useState(null);

    const [editName, setEditName] = useState(false);
    const [editDob, setEditDob] = useState(false);
    const [EditNumber, setEditNumber] = useState(false);
    const [EditCountry, setEditCountry] = useState(false);


    return(
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"40%",backgroundColor:"white",marginLeft:"15%"}} >
            <div>
                <h2>Personal Information</h2><br /><br />

                <div style={{maxHeight:"60px",minHeight:"60px"}} >
                    {
                        !editName
                        ?
                        <div   style={{display:"flex",justifyContent:"space-between"}}>
                            <div>
                                <h3>Username</h3>
                                <h4>{name}</h4> 
                        </div>
                        <div  style={{margin:"auto" ,cursor:"pointer"}}>
                                <MdEdit size={20}  onClick={()=>{setEditName(true)}} />
                        </div>
                        </div>
                        :
                        <div  style={{display:"flex", justifyContent:"space-between"}} >
                            <div>
                                <input type="text"  value={name} onChange={(e)=>{setName(e.target.value)}} style={{height:"25px",width:"150px"}}  placeholder='Enter Username here' />
                            </div>
                            <div  style={{margin:"auto" ,cursor:"pointer"}} >
                                <TiTick size={30}  onClick={()=>{setEditName(false)}}  />
                            </div>

                        </div> 
                    }
                </div>

                <div style={{maxHeight:"60px",minHeight:"60px"}} >
                    {
                        
                        
                        <div   style={{display:"flex",justifyContent:"space-between"}}>
                            <div>
                                <h3>Email</h3>
                                <h4>abdullah.ahmed10001@gmail.com</h4> 
                        </div>
                        
                        </div>
                    
                    }
                </div>



                <div  style={{maxHeight:"60px",minHeight:"60px"}} >
                    {
                        !EditNumber
                        ?
                        <div   style={{display:"flex",justifyContent:"space-between"}}>
                            <div>
                                <h3>Mobile</h3>
                                <h4>{number}</h4> 
                        </div>
                        <div  style={{margin:"auto" ,cursor:"pointer"}}>
                                <MdEdit size={20}  onClick={()=>{setEditNumber(true)}} />
                        </div>
                        </div>
                        :
                        <div  style={{display:"flex", justifyContent:"space-between"}} >
                            <div>
                                <input type="text" value={number} onChange={(e)=>{setNumber(e.target.value)}} style={{height:"25px",width:"150px"}}  placeholder='Enter mobile number ' />
                            </div>
                            <div  style={{margin:"auto" ,cursor:"pointer"}} >
                                <TiTick size={30}  onClick={()=>{setEditNumber(false)}}  />
                            </div>

                        </div> 
                    }
                </div>
                <div  style={{maxHeight:"60px",minHeight:"60px"}} >
                    {
                        !EditCountry
                        ?
                        <div   style={{display:"flex",justifyContent:"space-between"}}>
                            <div>
                                <h3>Country</h3>
                                <h4>{country}</h4> 
                        </div>
                        <div  style={{margin:"auto" ,cursor:"pointer"}}>
                                <MdEdit size={20}  onClick={()=>{setEditCountry(true)}} />
                        </div>
                        </div>
                        :
                        <div  style={{display:"flex", justifyContent:"space-between"}} >
                            <div>
                                <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}} style={{height:"25px",width:"150px"}}  placeholder='Enter Country here' />
                            </div>
                            <div  style={{margin:"auto" ,cursor:"pointer"}} >
                                <TiTick size={30}  onClick={()=>{setEditCountry(false)}}  />
                            </div>

                        </div> 
                    }
                </div>
                <div  style={{maxHeight:"60px",minHeight:"60px"}} >
                    {
                        !editDob
                        ?
                        <div   style={{display:"flex",justifyContent:"space-between"}}>
                            <div>
                                <h3>DOB</h3>
                                <h4>{dob}</h4> 
                        </div>
                        <div  style={{margin:"auto" ,cursor:"pointer"}}>
                                <MdEdit size={20}  onClick={()=>{setEditDob(true)}} />
                        </div>
                        </div>
                        :
                        <div  style={{display:"flex", justifyContent:"space-between"}} >
                            <div>
                                <input type="date" value={dob} onChange={(e)=>{setDob(e.target.value)}} style={{height:"25px",width:"150px"}}  placeholder='Enter Date' />
                            </div>
                            <div  style={{margin:"auto" ,cursor:"pointer"}} >
                                <TiTick size={30}  onClick={()=>{setEditDob(false)}}  />
                            </div>

                        </div> 
                    }
                </div>
            </div>
            <div style={{alignItems:"center"}}>
                    <img src = "" alt="dummy" />
                    <input type="file"   
                           name="myImage"
//                            onChange={(event) => {
// //console.log(event.target.files[0]);
//   //                         setSelectedImage(event.target.files[0]);
//                          }}
                     />
            </div>

        </div>
    )
}

export default ProfileInfo;