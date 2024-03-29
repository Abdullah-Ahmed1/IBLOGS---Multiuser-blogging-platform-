import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from '@mui/icons-material/Home';
//import ViewListIcon from '@mui/icons-material/ViewList';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {Link} from 'react-router-dom' 
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
const List_Items = ()=>{
    return(
        <>
        <Tooltip title="Home" placement="right" arrow>
          <Link to="/readerdashboard">
         <ListItemButton>
          <ListItemIcon>
            <HomeIcon sx={{ color: "#5cdb95",fontSize:"25px", marginBottom:"10px" }} />
          </ListItemIcon>
        </ListItemButton>
        </Link>
        </Tooltip>

        <Tooltip title="Saved" placement="right" arrow>
        <Link to="/readerdashboard/saved-lists">   
          <ListItemButton>
            <ListItemIcon>
              <BookmarksIcon sx={{ color: "#5cdb95",fontSize:"25px" , marginBottom:"10px"}} />
            </ListItemIcon> 
          </ListItemButton>
        </Link>    
        </Tooltip>

        <Tooltip title="Responses" placement="right" arrow>
        <Link to ='/readerdashboard/responses' >
        <ListItemButton>
          <ListItemIcon>
            <NotificationsActiveIcon sx={{ color:"#5cdb95",fontSize:"25px", marginBottom:"50px" }} />
          </ListItemIcon> 
        </ListItemButton>
        </Link>
        </Tooltip>

        <Divider/>

        <Tooltip title="Switch to Bloggerdashboard" placement="right" arrow>
         <Link to ='/Bloggerdashboard' >
        <ListItemButton>
          <ListItemIcon>
            <DriveFileRenameOutlineIcon sx={{ color:"#5cdb95",fontSize:"25px", marginBottom:"10px" }} />
          </ListItemIcon> 
        </ListItemButton>
        </Link>
        </Tooltip>
        
        </>
    )
}
export default  List_Items;