import React from 'react';
import Box from '@mui/joy/Box';
import RaceCard from './RaceCard';
import races from './assets/races.json';

export default function RaceGrid({ prefectureFilter }) {
  const filtered = races.filter(race => race.prefecture === prefectureFilter);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {filtered.map(race => (
        <RaceCard
          key={race.id}
          nameJa={race.nameJa}
          nameEn={race.nameEn}
          date={race.date}
          distance={race.raceDistance}
          ascent={race.ascent}
          result={race.result}
          status={race.status}
          itraPoints={race.itraPoints}
          itraLink={race.itraLink}
          report={race.report}
          googlePhotosLink={race.googlePhotosLink}
          coverPhoto={race.coverPhoto}
        />
      ))}
    </Box>
  );
}
