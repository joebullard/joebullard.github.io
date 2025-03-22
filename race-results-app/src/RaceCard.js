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

export default function RaceCard({ id, nameJa, nameEn, date, distance, ascent, result, status, itraPoints, itraLink, report }) {
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

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: 420,
          minHeight: 500,
        }}
      >
        <Badge
          color={colorMap[status] || "neutral"}
          badgeContent={status}
        >
          <CardContent
            sx={{
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              position: 'relative',
            }}
          >
            <AspectRatio ratio="2">
              <img
                src={`race-results-app/raceImages/${id}_thumbnail.png`}
                loading="lazy"
                alt=""
                onClick={handleImageClick}
                style={{
                  cursor: 'pointer',
                  // objectFit: 'contain', // Ensures the image scales to fit without losing aspect ratio
                  width: '100%',
                  height: '100%',
                }}
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
            {report}
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
          <img
            src={`race-results-app/raceImages/${id}.png`}
            alt=""
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain', // Ensures the image scales to fit without losing aspect ratio
            }}
          />
        </div>
      )}
    </>
  );
}
