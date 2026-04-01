import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

const statusColorMap = {
  'Finish':         'success',
  'Special Finish': 'warning',
  'DNF':            'danger',
  'Upcoming':       'neutral',
};

export default function RaceCard({
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
  return (
    <Card
      variant="outlined"
      sx={{
        width: { xs: '100%', sm: 380 },
        maxWidth: { xs: '100%', sm: 380 },
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 'md' },
      }}
    >
      {/* Photo with status chip overlay */}
      <CardOverflow sx={{ position: 'relative' }}>
        <AspectRatio ratio="16/9" sx={{ transition: 'transform 0.25s', '&:hover': { transform: 'scale(1.02)' } }}>
          <a href={googlePhotosLink || undefined} target="_blank" rel="noreferrer">
            <img
              src={coverPhoto}
              loading="lazy"
              alt={nameEn}
              style={{ width: '100%', height: '100%', cursor: googlePhotosLink ? 'pointer' : 'default' }}
            />
          </a>
        </AspectRatio>
        <Chip
          variant="solid"
          color={statusColorMap[status] || 'neutral'}
          size="sm"
          sx={{ position: 'absolute', top: '0.6rem', right: '0.6rem', zIndex: 2 }}
        >
          {status}
        </Chip>
      </CardOverflow>

      {/* Title */}
      <CardContent sx={{ pb: 0.5 }}>
        <Typography level="title-md">{nameEn}</Typography>
        <Typography level="body-xs" textColor="text.tertiary" sx={{ mt: 0.25 }}>
          {nameJa}
        </Typography>
      </CardContent>

      {/* Stats footer */}
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <CardContent sx={{ py: 1 }}>
          {/* Top row: date · distance · ascent */}
          <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap">
            <Typography level="body-xs" textColor="text.secondary">{date}</Typography>
            <Typography level="body-xs" textColor="text.tertiary">·</Typography>
            <Typography level="body-xs" textColor="text.secondary">{distance}km</Typography>
            <Typography level="body-xs" textColor="text.tertiary">·</Typography>
            <Typography level="body-xs" textColor="text.secondary">+{ascent}m</Typography>
          </Stack>

          {/* Bottom row: result + iTRA */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
            <Typography
              level="body-sm"
              fontWeight="lg"
              textColor={status === 'DNF' ? 'danger.500' : status === 'Upcoming' ? 'text.secondary' : status === 'Special Finish' ? 'warning.600' : 'success.600'}
            >
              {result}
            </Typography>
            {itraPoints ? (
              <Link href={itraLink} target="_blank" sx={{ ml: 'auto' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/iTRA${itraPoints}.svg`}
                  alt={`iTRA ${itraPoints} pts`}
                  style={{ height: '1.4rem' }}
                />
              </Link>
            ) : null}
          </Stack>
        </CardContent>

        {/* {report && (
          <>
            <Divider inset="context" />
            <CardContent sx={{ pb: 1 }}>
              <Typography level="body-xs" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                {report}
              </Typography>
            </CardContent>
          </>
        )} */}
      </CardOverflow>
    </Card>
  );
}
