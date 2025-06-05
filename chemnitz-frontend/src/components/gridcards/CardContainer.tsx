'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PinDropIcon from '@mui/icons-material/PinDrop';
import Button from '../Common/buttons/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarRating from '../Common/StarRating';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function CardContainer() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {

  };

  return (
    <Card sx={{ maxWidth: 345 }}>

      <CardMedia
        component="img"
        height="210"
        image="/assets/image/img4.png"
        alt="Paella dish"
        className='rounded-md min-h-[14rem]'
      />

      <CardContent>
        <Typography variant="body1" sx={{ color: 'text.primary', fontSize: "19px" }} className="font-medium">
          <div className='w-full flex justify-between'>
            This impressive paella
            <IconButton aria-label="map">
              <MoreVertIcon fontSize='small' />
            </IconButton>
          </div>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="map">
          <PinDropIcon className='text-[#152727]' fontSize='medium' />
        </IconButton>
        <IconButton aria-label="rate">
          <StarRating rating={3.5} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Button
            label="Learn More"
            bgColor="#df6c36"
            hoverColor="#aa4e23"
            textColor="#ffffff"
            onClick={() => console.log('Clicked')}
          />
        </ExpandMore>
      </CardActions>

    </Card>
  );
}