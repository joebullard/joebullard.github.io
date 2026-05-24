import React from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import JapanMap from './JapanMap';
import RaceGrid from './RaceGrid';

function App() {
  const [selectedPrefecture, setSelectedPrefecture] = React.useState(null);
  const [showMarathon, setShowMarathon] = React.useState(true);
  const [show50K, setShow50K] = React.useState(true);
  const [show50M, setShow50M] = React.useState(true);
  const [show100K, setShow100K] = React.useState(true);
  const [show100M, setShow100M] = React.useState(true);

  const filters = { showSelfSupported: true, showMarathon, show50K, show50M, show100K, show100M };

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
        showMarathon={showMarathon} setShowMarathon={setShowMarathon}
        show50K={show50K}           setShow50K={setShow50K}
        show50M={show50M}           setShow50M={setShow50M}
        show100K={show100K}         setShow100K={setShow100K}
        show100M={show100M}         setShow100M={setShow100M}
      />
      <RaceGrid prefectureFilter={selectedPrefecture} filters={filters} />
    </Stack>
  );
}

export default App;
