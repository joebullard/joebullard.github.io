import React from 'react';
import RaceCard from './RaceCard';
import {
  Grid,
} from '@mui/joy';
import races from './assets/races.json';

export default function RaceGrid() {
  const [statusFilter, setStatusFilter] = React.useState('All');

  return (
    <>
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {races
        .filter(race => statusFilter === 'All' || race.status === statusFilter)
        .map(race => (
          <Grid>
            <RaceCard
                id={race.id}
                prefecture={race.prefecture}
                nameJa={race.nameJa}
                nameEn={race.nameEn}
                date={race.date}
                distance={race.distance}
                ascent={race.ascent}
                result={race.result}
                status={race.status}
                itraPoints={race.itraPoints}
                itraLink={race.itraLink}
                report={race.report}
            />
          </Grid>
        ))}
    </Grid>
    </>
  );
}
