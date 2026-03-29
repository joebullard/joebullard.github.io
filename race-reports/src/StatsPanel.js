import * as React from 'react';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import races from './assets/races.json';

const completed = races.filter(r => r.status !== 'Upcoming');
const finishes  = completed.filter(r => r.status === 'Finish');

const totalKm       = races.reduce((sum, r) => sum + r.coveredDistance, 0);
const totalAscent   = races.reduce((sum, r) => sum + Number(r.ascent), 0);
const prefectures   = new Set(races.map(r => r.prefecture)).size;
const finishRate    = Math.round((finishes.length / completed.length) * 100);

const stats = [
  { label: 'Races',           value: races.length },
  { label: 'Prefectures',     value: `${prefectures} / 47` },
  { label: 'Km covered',      value: `${totalKm.toLocaleString()} km` },
  { label: 'Total ascent',    value: `+${totalAscent.toLocaleString()} m` },
  { label: 'Finish rate',     value: `${finishRate}%` },
];

export default function StatsPanel() {
  return (
    <Stack
      direction="row"
      spacing={2}
      flexWrap="wrap"
      justifyContent="center"
      sx={{ mt: 1 }}
    >
      {stats.map(({ label, value }) => (
        <Card
          key={label}
          variant="soft"
          sx={{ minWidth: 120, alignItems: 'center', textAlign: 'center', py: 1.5 }}
        >
          <Typography level="h3">{value}</Typography>
          <Typography level="body-xs" textColor="text.secondary">{label}</Typography>
        </Card>
      ))}
    </Stack>
  );
}
