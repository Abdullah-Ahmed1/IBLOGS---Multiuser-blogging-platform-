import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from '@mui/icons-material/Home';
//import ViewListIcon from '@mui/icons-material/ViewList';
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
            <HomeIcon sx={{ color: "#05386b",fontSize:"25px", marginBottom:"10px" }} />
          </ListItemIcon>
        </ListItemButton>
        </Link>
        </Tooltip>

        <Tooltip title="Saved" placement="right" arrow>
        <ListItemButton>
          <ListItemIcon>
            <BookmarksIcon sx={{ color: "#05386b",fontSize:"25px" , marginBottom:"10px"}} />
          </ListItemIcon> 
        </ListItemButton>
        </Tooltip>

        <Tooltip title="Liked" placement="right" arrow>
        <ListItemButton>
          <ListItemIcon>
            <ThumbUpAltIcon sx={{ color:"#05386b",fontSize:"25px", marginBottom:"50px" }} />
          </ListItemIcon> 
        </ListItemButton>
        </Tooltip>

        <Divider/>

        <Tooltip title="Switch to Bloggerdashboard" placement="right" arrow>
         <Link to ='/bloggerdashboard' >
        <ListItemButton>
          <ListItemIcon>
            <DriveFileRenameOutlineIcon sx={{ color:"#05386b",fontSize:"25px", marginBottom:"10px" }} />
          </ListItemIcon> 
        </ListItemButton>
        </Link>
        </Tooltip>
        
        </>
    )
}
export default  List_Items;