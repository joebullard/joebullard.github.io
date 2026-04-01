import React from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import JapanMap from './JapanMap';
import RaceGrid from './RaceGrid';
import StatsPanel from './StatsPanel';

function App() {
  const [selectedPrefecture, setSelectedPrefecture] = React.useState(null);

  return (
    <Stack spacing={2} sx={{ alignItems: 'center', px: { xs: 1, sm: 2 }, py: 3 }}>
      <Typography level="h2">Race Reports</Typography>
      <Typography level="body-sm" textColor="text.secondary">
        {selectedPrefecture
          ? `Races in ${selectedPrefecture} — click again to show all`
          : 'Click a highlighted prefecture to filter races'}
      </Typography>
      <StatsPanel />
      <JapanMap selected={selectedPrefecture} onSelect={setSelectedPrefecture} />
      <RaceGrid prefectureFilter={selectedPrefecture} />
    </Stack>
  );
}

export default App;
