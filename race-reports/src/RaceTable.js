import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import races from './assets/races.json';

export default function RaceTable({ statusFilter, yearFilter, minDistanceFilter }) {
  const statusColorMap = {
    "Finish": "success",
    "DNF": "danger",
    "Upcoming": "neutral",
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Race</th>
            <th>Date</th>
            <th>Distance</th>
            <th>Ascent</th>
            <th>iTRA Points</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {races
            .filter(race => (
              (statusFilter === null || statusFilter === race.status)
              && (yearFilter === null || yearFilter === race.date.substring(0, 4))
              && (race.raceDistance >= minDistanceFilter)
            ))
            .map(race => (
              <tr>
                <td>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                        cursor: "pointer",
                      }}
                    >
                      <a href={race.googlePhotosLink} target="_blank" rel="noreferrer">
                        <Avatar size="lg" src={race.coverPhoto} />
                      </a>
                    </Box>
                    <Box>
                      <Typography level="body-md">{race.nameEn}</Typography>
                      <Typography level="body-xs">{race.nameJa}</Typography>
                    </Box>
                  </Stack>
                </td>
                <td>{race.date}</td>
                <td>{race.raceDistance}km</td>
                <td>+{race.ascent}m</td>
                <td>
                  {race.itraPoints ? (
                    <Link href={race.itraLink} target="_blank">
                      <img src={`/race-reports/iTRA${race.itraPoints || 0}.svg`} />
                    </Link>
                    ) : (
                    <img src="/race-reports/iTRA0.svg" />
                  )}
                </td>
                <td>
                  <Typography color={statusColorMap[race.status] || "neutral"}>
                    {race.status}
                  </Typography>
                  {race.result}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
