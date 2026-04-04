import React from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import JapanMap from './JapanMap';
import RaceGrid from './RaceGrid';

function App() {
  const [selectedPrefecture, setSelectedPrefecture] = React.useState(null);
  const [showSelfSupported, setShowSelfSupported] = React.useState(true);
  const [showMarathons, setShowMarathons] = React.useState(true);
  const [showUltras, setShowUltras] = React.useState(true);

  const filters = { showSelfSupported, showMarathons, showUltras };

  return (
    <Stack spacing={2} sx={{ alignItems: 'center', px: { xs: 1, sm: 2 }, py: 3 }}>
      <Typography level="h2">Joe's Japan Races</Typography>
      <Typography level="body-sm" textColor="text.secondary">
        {selectedPrefecture
          ? `Races in ${selectedPrefecture} — click again to show all`
          : 'Click a highlighted prefecture to filter races'}
      </Typography>
      <JapanMap
        selected={selectedPrefecture}
        onSelect={setSelectedPrefecture}
        filters={filters}
        showMarathons={showMarathons} setShowMarathons={setShowMarathons}
        showUltras={showUltras}       setShowUltras={setShowUltras}
        showSelfSupported={showSelfSupported} setShowSelfSupported={setShowSelfSupported}
      />
      <RaceGrid prefectureFilter={selectedPrefecture} filters={filters} />
    </Stack>
  );
}

export default App;
