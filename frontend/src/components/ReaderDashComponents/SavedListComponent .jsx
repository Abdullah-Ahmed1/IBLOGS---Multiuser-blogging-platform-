import { useState,useEffect } from "react";
import axios from 'axios';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const SavedListComponent =({list,postId,refreshLists,customChecked,handleCustomChecked})=>{
    // const [listName,setListName] = useState();
    const [checked,setChecked] =useState( list.savedPosts.includes(postId))
    
    const handleChange = (e)=>{
        console.log("---reached")
        setChecked(e.target.checked)
        const values = {
                postId:postId,
                listId:list._id 
        }
        if (e.target.checked){
            console.log("add called")
            let value = JSON.parse(localStorage.getItem("token"));
            let token = value.token;
            axios.post(`http://127.0.0.1:5000/readerDashboard/add-to-customList`,values,{
              headers: {
                "Content-Type": "application/json", 
                Accept: "application/json",
                Authorization: token,
            },
            }).then(res=>{
                console.log(res)
                refreshLists()
            })
        }else{
            console.log("remove called")
            let value = JSON.parse(localStorage.getItem("token"));
            let token = value.token;
            axios.post(`http://127.0.0.1:5000/readerDashboard/remove-from-customList`,values,{
        headers: {
          "Content-Type": "application/json", 
          Accept: "application/json",
          Authorization: token,
          
      },
      }).then(res=>{
        console.log(res)
        refreshLists()
    })
        }
    }
  
    return(
        <>
           <Checkbox   checked={checked} onChange = {(event)=>handleChange(event,list._id)}   inputProps={{ 'aria-label': 'controlled' }}  />
            {list.listName}           
        </>
    )
}
export default SavedListComponent;