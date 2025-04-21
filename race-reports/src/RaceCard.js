import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function RaceCard({
  id,
  nameJa,
  nameEn,
  date,
  distance,
  ascent,
  result,
  status,
  itraPoints,
  itraLink,
  report,
  googlePhotosLink,
  coverPhoto,
}) {
  const [open, setOpen] = React.useState(false);

  const statusColorMap = {
    "Finish": "success",
    "DNF": "danger",
    "Upcoming": "neutral",
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: 420,
          maxWidth: '80vw',
        }}
      >
        <CardOverflow
          sx={{
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.01)",
            },
            position: "relative",
          }}
        >
          <AspectRatio ratio="2">
            <a href={googlePhotosLink} target="_blank" rel="noreferrer">
              <img
                src={coverPhoto}
                loading="lazy"
                alt=""
                onClick={() => setOpen(true)}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              />
            </a>
          </AspectRatio>
        </CardOverflow>
        <CardOverflow>
          <Typography level="title-md">{nameEn}</Typography>
          <Typography level="body-sm">{nameJa}</Typography>
          <Chip
              variant="solid"
              color={statusColorMap[status] || "neutral"}
              size="sm"
              sx={{
                position: "absolute",
                zIndex: 2,
                right: "1rem",
              }}
            >
              {status}
            </Chip>
        </CardOverflow>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
            <Typography
              level="body-xs"
              textColor="text.secondary"
              sx={{ fontWeight: "md" }}
            >
              {date}
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              textColor="text.secondary"
              sx={{ fontWeight: "md" }}
            >
              {distance}km
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              textColor="text.secondary"
              sx={{ fontWeight: "md" }}
            >
              +{ascent}m
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              textColor="text.secondary"
              sx={{ fontWeight: "md" }}
            >
              {result}
            </Typography>
            {itraPoints ? (
              <>
                <Divider orientation="vertical" />
                <Link href={itraLink} target="_blank">
                  <img
                    style={{
                      height: "100%",
                      maxHeight: "1.5rem", // Bound the image height by CardContent height
                    }}
                    src={`/race-reports/iTRA${itraPoints || 0}.svg`}
                    alt={`iTRA Points: ${itraPoints}`}
                  />
                </Link>
              </>
            ) : null}
          </CardContent>
        </CardOverflow>
      </Card>
    </>
  );
}
