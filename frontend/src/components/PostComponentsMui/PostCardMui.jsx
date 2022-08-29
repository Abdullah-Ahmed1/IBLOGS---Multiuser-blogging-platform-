import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function PostCardMui({item}) {
  console.log("items",item)
  return (
    <Card sx={{ display: 'flex' }}>
    <CardContent sx={{ flex: 1 }}>
      <Typography component="h5" variant="h5">
       {item.postTitle}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
       
      </Typography>
      <Typography variant="subtitle1" paragraph>
        {item.postDescription}
      </Typography>
      <Typography variant="subtitle1" color="primary">
        Continue reading...
      </Typography>
    </CardContent>
    <CardMedia
      component="img"
      sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
      img = {''}
      alt={"post.imageLabel"}
    />
  </Card>
  );
}
