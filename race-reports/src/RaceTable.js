import * as React from 'react';
import {
  AspectRatio,
  Avatar,
  Box,
  Link,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Table,
  Typography,
} from '@mui/joy';
import races from './assets/races.json';

export default function RaceTable({ statusFilter, yearFilter, minDistanceFilter }) {
  const [openImage, setOpenImage] = React.useState(null);

  const statusColorMap = {
    "Finish": "success",
    "DNF": "danger",
    "Upcoming": "neutral",
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && openImage) {
        setOpenImage(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openImage]);

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
              && (race.coveredDistance >= minDistanceFilter)
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
                      onClick={() => setOpenImage(`/race-reports/raceImages/${race.id}.png`)}
                    >
                      <Avatar size="lg" src={`/race-reports/raceImages/${race.id}_thumbnail.png`} />
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

      <Modal
        open={openImage !== null}
        onClose={() => setOpenImage(null)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalDialog layout="center">
          <ModalClose />
          <img src={openImage} />
        </ModalDialog>
      </Modal>
    </>
  );
}
