import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import {isMobile} from 'react-device-detect';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import RaceGrid from './RaceGrid';
import RaceTable from './RaceTable';
import races from './assets/races.json';

function App() {
  const [view, setView] = React.useState(isMobile ? 'cards' : 'table');
  const [statusFilter, setStatusFilter] = React.useState(null);
  const [yearFilter, setYearFilter] = React.useState(null);
  const [minDistanceFilter, setMinDistanceFilter] = React.useState(0);
  const [eventType, setEventType] = React.useState(null);

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

        <ToggleButtonGroup
          exclusive
          value={eventType}
          onChange={(event, eventType) => {
            setEventType(eventType);
          }}
          variant="outlined"
        >
          <Button value="self-supported">Self-supported</Button>
          <Button value="organized">Organized</Button>
        </ToggleButtonGroup>

        <Switch
          color="neutral"
          startDecorator="Cards"
          endDecorator="Table"
          checked={view === 'table'}
          onChange={(event) =>
            setView(event.target.checked ? 'table' : 'cards')
          }
        />

        {view === 'cards' ? (
          <RaceGrid
            statusFilter={statusFilter}
            yearFilter={yearFilter}
            minDistanceFilter={minDistanceFilter}
            eventTypeFilter={eventType}
          />
        ) : (
          <RaceTable
            statusFilter={statusFilter}
            yearFilter={yearFilter}
            minDistanceFilter={minDistanceFilter}
            eventTypeFilter={eventType}
          />
        )}
      </Stack>
    </Router>
  );
}

export default App;
