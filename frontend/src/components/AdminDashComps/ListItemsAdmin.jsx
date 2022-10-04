import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from '@mui/icons-material/Home';
//import ViewListIcon from '@mui/icons-material/ViewList';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
//import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {Link} from 'react-router-dom' 
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
const List_ItemsAdmin = ()=>{
    return(
        <>
        <Tooltip title="Home" placement="right" arrow>
          <Link to="/admin">
         <ListItemButton>
          <ListItemIcon>
            <HomeIcon sx={{ color: "#379863",fontSize:"25px", marginBottom:"10px" }} />
          </ListItemIcon>
        </ListItemButton>
        </Link>
        </Tooltip>

        <Tooltip title="People" placement="right" arrow>
        <Link to="/admin/users">   
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltIcon sx={{ color: "#379863",fontSize:"25px" , marginBottom:"10px"}} />
            </ListItemIcon> 
          </ListItemButton>
        </Link>    
        </Tooltip>

        <Tooltip title="Responses" placement="right" arrow>
        <Link to ='/readerdashboard/responses' >
        <ListItemButton>
          <ListItemIcon>
            <NotificationsActiveIcon sx={{ color:"#379863",fontSize:"25px", marginBottom:"50px" }} />
          </ListItemIcon> 
        </ListItemButton>
        </Link>
        </Tooltip>

        <Divider/>

        {/* <Tooltip title="Switch to Bloggerdashboard" placement="right" arrow>
         <Link to ='/bloggerdashboard' >
        <ListItemButton>
          <ListItemIcon>
            <DriveFileRenameOutlineIcon sx={{ color:"#379863",fontSize:"25px", marginBottom:"10px" }} />
          </ListItemIcon> 
        </ListItemButton>
        </Link>
        </Tooltip>
         */}
        </>
    )
}
export default  List_ItemsAdmin;