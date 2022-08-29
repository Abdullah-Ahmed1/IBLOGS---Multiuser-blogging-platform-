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

export default function PostCardMui() {
  return (
    <Card sx={{ display: 'flex' }}>
    <CardContent sx={{ flex: 1 }}>
      <Typography component="h2" variant="h5">
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {post.date}
      </Typography>
      <Typography variant="subtitle1" paragraph>
        {post.description}
      </Typography>
      <Typography variant="subtitle1" color="primary">
        Continue reading...
      </Typography>
    </CardContent>
    <CardMedia
      component="img"
      sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
      image={post.image}
      alt={post.imageLabel}
    />
  </Card>
  );
}
