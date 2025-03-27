import React from 'react';
import RaceCard from './RaceCard';
import {
  Button,
  ButtonGroup,
  Grid,
  Stack,
} from '@mui/joy';
import races from './assets/races.json';

export default function RaceGrid() {
  const [statusFilter, setStatusFilter] = React.useState(null);

  const toggleStatusFilter = (status) => {
    setStatusFilter(statusFilter === status ? null : status);
  }

  return (
    <>
    <Stack spacing={2}>
      <ButtonGroup>
        <Button variant={statusFilter === "Finish" ? "solid" : "outlined"} color="success" onClick={() => toggleStatusFilter('Finish')}>Finish</Button>
        <Button variant={statusFilter === "DNF" ? "solid" : "outlined"} color="danger" onClick={() => toggleStatusFilter('DNF')}>DNF</Button>
        <Button variant={statusFilter === "TBD" ? "solid" : "outlined"} color="primary" onClick={() => toggleStatusFilter('TBD')}>TBD</Button>
      </ButtonGroup>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {races
          .filter(race => statusFilter === null || race.status === statusFilter)
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
    </Stack>
    </>
  );
}
