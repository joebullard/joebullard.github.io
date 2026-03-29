import React from 'react';
import { Grid } from '@mui/joy';
import RaceCard from './RaceCard';
import races from './assets/races.json';

export default function RaceGrid({ prefectureFilter }) {
  const filtered = races.filter(race => race.prefecture === prefectureFilter);

  return (
    <Grid
      container
      spacing={2}
      sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      {filtered.map(race => (
        <Grid key={race.id}>
          <RaceCard
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
        </Grid>
      ))}
    </Grid>
  );
}
