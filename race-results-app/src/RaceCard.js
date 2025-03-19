import * as React from 'react';
import {
  AspectRatio,
  Badge,
  Card,
  CardContent,
  CardCover,
  CardOverflow,
  Chip,
  Divider,
  Typography,
} from '@mui/joy';

export default function RaceCard({ children, id, nameJa, nameEn, date, distance, ascent, result, status, itraPoints, itraLink, prefecture }) {
  const colorMap = {
    "Finish": "success",
    "DNF": "danger",
    "TBD": "primary",
  };
  const [open, setOpen] = React.useState(false);

  const handleImageClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const images = [
    `race-results-app/races/${id}/image0.png`,
    `race-results-app/races/${id}/image1.png`,
    `race-results-app/races/${id}/image2.png`,
    // Add more images as needed
  ];

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      } else if (e.key === 'ArrowRight' && open) {
        handleNext(e);
      } else if (e.key === 'ArrowLeft' && open) {
        handlePrev(e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleNext, handlePrev]);

  return (
    <>
      <Card variant="outlined" sx={{ width: 400, minHeight: 460 }}>
        <Badge
          color={colorMap[status] || "neutral"}
          badgeContent={status}
        >
          <CardContent>
            <AspectRatio ratio="2">
              <img
                src={images[0]}
                loading="lazy"
                alt=""
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
              />
            </AspectRatio>
          </CardContent>
        </Badge>
        <CardContent>
          <Typography level="title-md">{nameEn}</Typography>
          <Typography level="body-sm">{nameJa}</Typography>
        </CardContent>
        <CardContent>
          <Typography level="body-xs" textColor="text.secondary">
            {children}
          </Typography>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography
              level="body-xs"
              textColor="text.secondary"
              sx={{ fontWeight: 'md' }}
            >
              {distance}km
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              textColor="text.secondary"
              sx={{ fontWeight: 'md' }}
            >
              +{ascent}m
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              textColor="text.secondary"
              sx={{ fontWeight: 'md' }}
            >
              {result}
            </Typography>
            {itraPoints ? (
              <>
                <Divider orientation="vertical" />
                <Typography
                  level="body-xs"
                  textColor="text.secondary"
                  sx={{ fontWeight: 'md' }}
                >
                  <a href={itraLink} target="_blank">
                    iTRA {itraPoints}
                  </a>
                </Typography>
              </>
            ) : null}
          </CardContent>
        </CardOverflow>
      </Card>
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={handleClose}
        >
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '10%',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
            }}
          >
            &#8249;
          </button>
          <img
            src={images[currentImageIndex]}
            alt=""
            style={{ maxWidth: '90%', maxHeight: '90%' }}
          />
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '10%',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
            }}
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
