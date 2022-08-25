import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
const List_Items = ()=>{
    return(
        <>
         <ListItemButton>
          <ListItemIcon>
            <HomeIcon sx={{ color: "#05386b",fontSize:"35px" }} />
          </ListItemIcon>
         
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ViewListIcon sx={{ color: "#05386b",fontSize:"35px" }} />
          </ListItemIcon>
         
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ThumbUpAltIcon sx={{ color:"#05386b",fontSize:"35px" }} />
          </ListItemIcon>
         
        </ListItemButton>
        </>
    )
}
export default  List_Items;