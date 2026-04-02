import React from 'react';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import JapanMap from './JapanMap';
import RaceGrid from './RaceGrid';

function App() {
  const [selectedPrefecture, setSelectedPrefecture] = React.useState(null);
  const [showSelfSupported, setShowSelfSupported] = React.useState(false);

  return (
    <Stack spacing={2} sx={{ alignItems: 'center', px: { xs: 1, sm: 2 }, py: 3 }}>
      <Typography level="h2">Joe's Japan Races</Typography>
      <Typography level="body-sm" textColor="text.secondary">
        {selectedPrefecture
          ? `Races in ${selectedPrefecture} — click again to show all`
          : 'Click a highlighted prefecture to filter races'}
      </Typography>
      <JapanMap selected={selectedPrefecture} onSelect={setSelectedPrefecture} />
      <Switch
        size="sm"
        checked={showSelfSupported}
        onChange={e => setShowSelfSupported(e.target.checked)}
        endDecorator={
          <Typography level="body-xs" textColor="text.secondary">
            Include self-supported runs
          </Typography>
        }
      />
      <RaceGrid prefectureFilter={selectedPrefecture} showSelfSupported={showSelfSupported} />
    </Stack>
  );
}

export default App;
