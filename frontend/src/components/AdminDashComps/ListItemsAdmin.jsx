import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from '@mui/icons-material/Home';
//import ViewListIcon from '@mui/icons-material/ViewList';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
//import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {Link} from 'react-router-dom' 
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import EmailIcon from '@mui/icons-material/Email';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useNavigate } from "react-router-dom";
const List_ItemsAdmin = ()=>{
    let navigate = useNavigate();
    const handleLogOut = ()=>{
      localStorage.removeItem("adminToken");
      navigate("/admin");
    }

    return(
        <>
        <Tooltip title="Home" placement="right" arrow>
          <Link to="/admin/home">
         <ListItemButton>
          <ListItemIcon>
            <HomeIcon sx={{ color: "#5cdb95",fontSize:"25px", marginBottom:"10px" }} />
          </ListItemIcon>
        </ListItemButton>
        </Link>
        </Tooltip>

        <Tooltip title="People" placement="right" arrow>
        <Link to="/admin/users">   
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltIcon sx={{ color: "#5cdb95",fontSize:"25px" , marginBottom:"10px"}} />
            </ListItemIcon> 
          </ListItemButton>
        </Link>    
        </Tooltip>

        <Tooltip title="Responses" placement="right" arrow>
        <Link to ='/admin/notifications' >
        <ListItemButton>
          <ListItemIcon>
            <NotificationsActiveIcon sx={{ color:"#5cdb95",fontSize:"25px", marginBottom:"10px" }} />
          </ListItemIcon> 
        </ListItemButton>
        </Link>
        </Tooltip>
        <Tooltip title="Emailing" placement="right" arrow>
        <Link to ='/admin/email' >
        <ListItemButton>
          <ListItemIcon>
            <EmailIcon sx={{ color:"#5cdb95",fontSize:"25px", marginBottom:"10px" }} />
          </ListItemIcon> 
        </ListItemButton>
        </Link>
        </Tooltip>

        <Tooltip title="Weekly Reports" placement="right" arrow>
         <Link to ='/admin/weeklyReports' >
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon sx={{ color:"#5cdb95",fontSize:"25px", marginBottom:"10px" }} />
          </ListItemIcon> 
        </ListItemButton>
        </Link>
        </Tooltip>
        <Tooltip title="logout" placement="right" arrow>
         
        <ListItemButton onClick = {handleLogOut} >
          <ListItemIcon>
            <LogoutIcon sx={{ color:"#5cdb95",fontSize:"25px", marginBottom:"10px" }} />
          </ListItemIcon> 
        </ListItemButton>
        
        </Tooltip>
        
        </>
    )
}
export default  List_ItemsAdmin;