import "./UsersCard.css";
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import UserDeleteDialog from "./UserDeleteDialog";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const UsersCard = ({item,handleUserDelete})=>{
  //  console.log("-------------",item)
  const navigate = useNavigate();
//-------------------------------------------------------
    const [userDeleteDialogOpen,setUserDeleteDialogOpen] = useState(false)
    const handleUserDeleteDialogClose = ()=>{
        setUserDeleteDialogOpen(false)
    }
//------------------------------------------------------


    return(
        <>
        <UserDeleteDialog open = {userDeleteDialogOpen} handleClose={handleUserDeleteDialogClose} userId={item._id}  handleUserDelete={handleUserDelete}  />
        <div className="card_item" >
            <div style={{display:"flex"}}>
            <Tooltip title="Delete">
            <CloseIcon  onClick ={()=>setUserDeleteDialogOpen(true)}  sx = {{color:"red",position: "absolute",margin:"3px"}}/>
            </Tooltip>
            
            <div className="card_inner">
            
                <img src={item.profileImage? item.profileImage: "https://res.cloudinary.com/dlgwvuu5d/image/upload/v1663106838/my-uploads/ppp_rufoeg.png"} alt="3453353" />
                <div className="userName">{item.firstname} {item.lastname}</div>
                <div className="userUrl">{item.profession} @ {item.organization}</div>
                <div className="detail-box">

                    <div className="gitDetail"><span>Articles</span>2</div>
                    <div className="gitDetail"><span>Following</span>3</div>
                    <div className="gitDetail"><span>Followers</span>3</div>
                </div>
                <button className="seeMore" onClick={()=> navigate(`/admin/users/blogs/${item._id}`)} >View Blogs</button>
                
            </div>
            </div>

        </div>
        </>
    )
}
export default UsersCard