import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Box from '@mui/material/Box';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function RecommendedChips() {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

 

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor:"none",
        flexWrap: 'wrap',
        background:"rgba(255, 255, 255,0)",
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
       

       

        return (
          <ListItem key={data.key}>
            <Chip
              //icon={icon}
              sx = {{backgroundColor:"#379683",color:"#05386b",fontWeight:"bold"}}
              label={data.label}
             
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
