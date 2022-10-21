import { useState,useEffect } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const SavedListComponent =({list})=>{
    const [listName,setListName] = useState();
    const [checked,setChecked] = useState(false);
    const handleChange = (event)=>{
        console.log("---",event.target.checked)
    }
    return(
        <>
           <Checkbox    onChange = {handleChange}   inputProps={{ 'aria-label': 'controlled' }}  />
            {list.listName}           
        </>
    )
}
export default SavedListComponent;