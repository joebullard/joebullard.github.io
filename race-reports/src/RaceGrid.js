import React from 'react';
import { Grid } from '@mui/joy';
import RaceCard from './RaceCard';
import races from './assets/races.json';

export default function RaceGrid({ statusFilter, yearFilter, minDistanceFilter }) {
  return (
    <>
    <Grid
      container
      spacing={2}
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {races
        .filter(race => (
          (statusFilter === null || statusFilter === race.status)
          && (yearFilter === null || yearFilter === race.date.substring(0, 4))
          && (race.raceDistance >= minDistanceFilter)
        ))
        .map(race => (
          <Grid>
            <RaceCard
                id={race.id}
                prefecture={race.prefecture}
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
            />
          </Grid>
        ))}
    </Grid>
    </>
  );
}
