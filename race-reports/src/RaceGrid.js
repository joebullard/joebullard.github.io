import React from 'react';
import Box from '@mui/joy/Box';
import RaceCard from './RaceCard';
import races from './assets/races.json';

function applyFilters(races, { showSelfSupported, showMarathon, show50K, show50M, show100K, show100M }) {
  return races.filter(race => {
    const dist = race.raceDistance;
    if (!showSelfSupported && race.eventType === 'self-supported') return false;
    if (!showMarathon && dist >= 35 && dist < 45) return false;
    if (!show50K  && dist >= 45 && dist <  65) return false;
    if (!show50M  && dist >= 65 && dist <  90) return false;
    if (!show100K && dist >= 90 && dist < 130) return false;
    if (!show100M && dist >= 130)              return false;
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
