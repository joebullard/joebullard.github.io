import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import {
  Button,
  Stack,
  ToggleButtonGroup,
 } from '@mui/joy';
import RaceGrid from './RaceGrid';
import races from './assets/races.json';

function App() {
  const [statusFilter, setStatusFilter] = React.useState(null);
  const [yearFilter, setYearFilter] = React.useState(null);
  const [minDistanceFilter, setMinDistanceFilter] = React.useState(0);
  const [minDistanceCoveredFilter, setMinDistanceCoveredFilter] = React.useState(true);

  return (
    <Router basename="/race-reports">
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <ToggleButtonGroup
          exclusive
          value={statusFilter}
          onChange={(event, status) => {
            setStatusFilter(status);
          }}
          variant="outlined"
        >
          {[...new Set(races.map(({ status }) => status))].map(status => (
            <Button value={status}>{status}</Button>
          ))}
        </ToggleButtonGroup>

        <ToggleButtonGroup
          exclusive
          value={yearFilter}
          onChange={(event, year) => {
            setYearFilter(year);
          }}
          variant="outlined"
        >
          {[...new Set(races.map(({ date }) => date.substring(0,4)))].map(year => (
            <Button value={year}>{year}</Button>
          ))}
        </ToggleButtonGroup>

        <ToggleButtonGroup
          exclusive
          value={minDistanceFilter}
          onChange={(event, minDistance) => {
            setMinDistanceFilter(minDistance);
          }}
          variant="outlined"
        >
          <Button value={50}>50K+</Button>
          <Button value={100}>100K+</Button>
          <Button value={160}>100Mi+</Button>
        </ToggleButtonGroup>

        <RaceGrid
          statusFilter={statusFilter}
          yearFilter={yearFilter}
          minDistanceFilter={minDistanceFilter}
        />
      </Stack>
    </Router>
  );
}

export default App;
