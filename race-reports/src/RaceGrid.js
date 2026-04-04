import React from 'react';
import Box from '@mui/joy/Box';
import RaceCard from './RaceCard';
import races from './assets/races.json';

function applyFilters(races, { showSelfSupported, showMarathons, showUltras }) {
  return races.filter(race => {
    const dist = race.raceDistance;
    const isMarathon = dist >= 40 && dist < 45;
    const isUltra = dist >= 45;
    if (!showSelfSupported && race.eventType === 'self-supported') return false;
    if (!showMarathons && isMarathon) return false;
    if (!showUltras && isUltra) return false;
    return true;
  });
}

export default function RaceGrid({ prefectureFilter, filters }) {
  const filtered = applyFilters(
    prefectureFilter
      ? races.filter(race => race.prefecture === prefectureFilter)
      : [...races],
    filters,
  ).reverse();

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
