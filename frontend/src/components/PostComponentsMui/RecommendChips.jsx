import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { useState,useEffect } from 'react';

//import Paper from '@mui/material/Paper';
//import TagFacesIcon from '@mui/icons-material/TagFaces';
import Box from '@mui/material/Box';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function RecommendedChips({handleChipClick}) {
  // const [chipData, setChipData] = React.useState([
  //   { key: 0, label: 'Angular' },
  //   { key: 1, label: 'jQuery' },
  //   { key: 2, label: 'Polymer' },
  //   { key: 3, label: 'React' },
  //   { key: 4, label: 'Vue.js' },
  // ]);
  const [tags,setTags] = useState([])

 

 useEffect(()=>{
  
    axios.get(`http://127.0.0.1:5000/get-tags`).
    then(res=>{
        setTags(res.data.map((item,index)=>{
            return(
                {
                    key:index,
                    label: item 
                }
            )
        }))
    })

 },[])

  return (
    <Box
    className
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor:"none",
        flexWrap: 'wrap',
        height:"150px",
        overflow:"auto",
        background:"rgba(255, 255, 255,0)",
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {tags.map((data) => {
       

       

        return (
          
          <ListItem key={data.key}>
            <Chip
              //icon={icon}
              onClick = {()=>handleChipClick(data.label)}
              sx = {{backgroundColor:"#5cdb95",color:"#05386b",fontWeight:"bold"}}
              label={data.label}
             
            />
          </ListItem>
          
        );
      })}
    </Box>
  );
}
