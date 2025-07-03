'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PinDropIcon from '@mui/icons-material/PinDrop';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarRating from '../Common/StarRating';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FeatureItem } from '@/types/FeatueType';
import { getFeatureProperties } from '@/utilities/FeaturreHelper';
import Button from '../Common/buttons/Button';
import MakeReview from '../Makereview';
import CustomPopover from '../Common/Popup';
import { addFavourite, removeFavourite } from '@/api/userApi';
import Alert from '../Common/Alerts/Alert';
import { User } from '@/types/User';
import { Favorite } from '@mui/icons-material';

interface CardContainerProps {
  feature: FeatureItem;
  category: string;
  activeFeatureId: string | null;
  setActiveFeatureId: (id: string) => void;
  user: User | null;
  setUser: (user: User) => void;
}

interface CardContainerProps {
  feature: FeatureItem;
  category: string;
  activeFeatureId: string | null;
  setActiveFeatureId: (id: string) => void;
  user: User | null;
  setUser: (user: User) => void;
  onReviewAdded: (featureId: string) => void; // <-- add this line
}

export default function CardContainer({
  feature,
  category,
  activeFeatureId,
  setActiveFeatureId,
  user,
  setUser,
  onReviewAdded
}: CardContainerProps) {
  const properties = getFeatureProperties(feature, category);

  const [favorited, setFavorited] = React.useState(false);
  const [showReview, setShowReview] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  // Menu for MoreVertIcon
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(menuAnchor);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  // FAVOURITE toggle handler
  const handleFavoriteClick = async () => {
    try {
      if (!user) return;

      if (favorited) {
        await removeFavourite(feature.id);
        setFavorited(false);
        // Remove from user's favourites in context
        setUser({
          ...user,
          favourites: user.favourites.filter((id) => id !== feature.id),
        });
      } else {
        await addFavourite(feature.id);
        setFavorited(true);
        // Add to user's favourites in context
        setUser({
          ...user,
          favourites: [...user.favourites, feature.id],
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setShowAlert(true);
      } else {
        console.log(error);
      }
    }
  };


  // Fix: Open the review modal!
  const handleGiveReview = () => {
    setShowReview(true);
    handleMenuClose();
  };

  const handleReviewModalClose = (submitted: boolean) => {
    setShowReview(false);
    if (submitted && onReviewAdded) {
      onReviewAdded(feature.id);
    }
  };

  // Name/desc truncation logic
  const [anchorElName, setAnchorElName] = React.useState<HTMLElement | null>(null);
  const [isNameTruncated, setIsNameTruncated] = React.useState(false);
  const nameRef = React.useRef<HTMLSpanElement>(null);

  const [anchorElDesc, setAnchorElDesc] = React.useState<HTMLElement | null>(null);
  const [isDescTruncated, setIsDescTruncated] = React.useState(false);
  const descRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const elName = nameRef.current;
    if (elName) setIsNameTruncated(elName.scrollWidth > elName.clientWidth + 2);
    const elDesc = descRef.current;
    if (elDesc) setIsDescTruncated(elDesc.scrollHeight > elDesc.clientHeight + 2);
  }, [properties.name, properties.description]);

  const handleNameClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isNameTruncated) setAnchorElName(event.currentTarget);
  };

  const handleDescClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isDescTruncated) setAnchorElDesc(event.currentTarget);
  };

  const handleCloseName = () => setAnchorElName(null);
  const handleCloseDesc = () => setAnchorElDesc(null);

  // Alert auto close
  React.useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 2000); // 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showAlert]);



  // FAVOURITE status effect (with debug)
  React.useEffect(() => {
    if (user && user.favourites) {
      const isFav = user.favourites.includes(feature.id);
      setFavorited(isFav);
    }
  }, [user, feature.id]);


  return (
    <Card sx={{ minWidth: 320, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <img
          src={feature.properties.image ? feature.properties.image : '/assets/image/noImg.png'}
          alt="Card visual"
          className="rounded-md shadow-[#868686] shadow-md h-[12rem] max-w-[95%] object-cover"
          style={{ aspectRatio: '16/9' }}
        />
      </Box>

      <CardContent sx={{ flex: '1 1 auto', pb: 1 }}>
        <Box className='w-full flex justify-between items-center mb-1'>
          <Typography
            variant="body1"
            ref={nameRef}
            onClick={handleNameClick}
            sx={{
              color: 'text.primary',
              fontSize: "19px",
              fontWeight: 500,
              maxWidth: '85%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: isNameTruncated ? 'pointer' : 'default',
              userSelect: isNameTruncated ? 'none' : 'text',
              transition: 'color 0.2s',
              '&:hover': isNameTruncated ? { color: '#df6c36' } : {},
            }}
            title={isNameTruncated ? "Click to view full name" : undefined}
          >
            {properties.name || "No name provided"}
          </Typography>
          <IconButton aria-label="more" onClick={handleMenuClick}>
            <MoreVertIcon fontSize='small' />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={openMenu}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { minWidth: 120 } }}
          >
            <MenuItem onClick={handleGiveReview}>Give a Review</MenuItem>
          </Menu>
        </Box>

        <CustomPopover open={Boolean(anchorElName)} anchorEl={anchorElName} onClose={handleCloseName}>
          <Typography sx={{ whiteSpace: 'pre-line', fontWeight: 500 }}>
            {properties.name}
          </Typography>
        </CustomPopover>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 0.5 }}>
          {properties.address || "No address provided"}
        </Typography>

        <Typography
          ref={descRef}
          variant="body2"
          onClick={handleDescClick}
          sx={{
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '2.6em',
            cursor: isDescTruncated ? 'pointer' : 'default',
            userSelect: isDescTruncated ? 'none' : 'text',
            transition: 'color 0.2s',
            '&:hover': isDescTruncated ? { color: '#df6c36' } : {},
          }}
          title={isDescTruncated ? "Click to read more" : undefined}
        >
          {properties.description || "No description provided"}
        </Typography>

        {showReview && (
          <MakeReview
            onClose={() => handleReviewModalClose(true)}
            featureId={feature.id}
          />
        )}

        <CustomPopover open={Boolean(anchorElDesc)} anchorEl={anchorElDesc} onClose={handleCloseDesc}>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {properties.description}
          </Typography>
        </CustomPopover>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{
          mt: 'auto',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
          px: 2,
          pb: 2
        }}
      >
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
        >
          <FavoriteIcon sx={{ color: favorited ? '#e63946' : '#bdbdbd' }} />
        </IconButton>

        <IconButton
          aria-label="map"
          onClick={() => setActiveFeatureId(feature.id)}
        >
          <PinDropIcon
            className='text-[#152727]'
            fontSize='medium'
            style={{
              color: activeFeatureId === feature.id ? '#df6c36' : undefined,
            }}
          />
        </IconButton>

        {typeof feature.averageRating === 'number' && (
          <StarRating rating={feature.averageRating} />
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button
          label="Learn More"
          bgColor="#df6c36"
          hoverColor="#aa4e23"
          textColor="#ffffff"
          disabled={!properties.website}
          onClick={() => {
            if (!properties.website) return;
            window.open(
              properties.website.startsWith('http')
                ? properties.website
                : `https://${properties.website}`,
              '_blank',
              'noopener,noreferrer'
            );
          }}
        />
      </CardActions>

      {showAlert && (
        <Alert
          title="Unauthorized"
          text="Please Login to add to favourite"
          color="#df6c36"
        />
      )}
    </Card>
  );
}
