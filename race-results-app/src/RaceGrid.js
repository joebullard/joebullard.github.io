import React from 'react';
import RaceCard from './RaceCard';
import Grid from '@mui/joy/Grid';

export default function RaceGrid() {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid>
        <RaceCard
            id="2021-12-izu-oshima"
            prefecture="Tokyo"
            nameJa="第11回 伊豆大島マラソン"
            nameEn="11th Izu Oshima Marathon"
            date="2021-12-11"
            distance={42.2}
            ascent="800"
            result="5:32:24"
            status="Finish"
        >
            First marathon, hotter than expected, overdressed in a grid-fleece on a sunny 15C day,
            went way too hard at the end trying to finish under 5h30m and learned the hard way
            what exercise-induced hypoxemia feels like (i.e. losing sensation in limbs and face
            while laying on the ground for 30 minutes thinking you're gonna die)
        </RaceCard>
      </Grid>
      <Grid>
        <RaceCard
            id="2022-05-ishigaki"
            prefecture="Okinawa"
            nameJa="第8回 石垣島ウルトラマラソン"
            nameEn="8th Ishigaki Island Ultramarathon"
            date="2022-05-15"
            distance={60}
            ascent={0}
            result="9:27:29"
            status="Finish"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
      </Grid>
      <Grid>
        <RaceCard
            id="2022-12-okinawa"
            prefecture="Okinawa"
            nameJa="第5回 沖縄100Kウルトラマラソン"
            nameEn="5th Okinawa 100K Ultramarathon"
            date="2022-12-18"
            distance={100}
            ascent={0}
            result="Timed out @ 85.5km"
            status="DNF"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
      </Grid>
      <Grid>
        <RaceCard
            id="2023-05-michikusa-miura"
            prefecture="Kanagawa"
            nameJa="第8回 横須賀・三浦100km・63kmみちくさウルトラマラソン"
            nameEn="8th Yokosuka Miura Michikusa Ultramarathon"
            date="2023-05-27"
            distance={63}
            ascent={0}
            result="9:49:28"
            status="Finish"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
      </Grid>
      <Grid>
        <RaceCard
            id="2023-11-michikusa-minami-izu"
            prefecture="Shizuoka"
            nameJa="第10回南伊豆町100km78km66kmみちくさウルトラマラソン"
            nameEn="10th Minami Izu Town Michikusa Ultramarathon"
            date="2023-11-11"
            distance={66}
            ascent={0}
            result="9:59:13"
            status="Finish"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
      </Grid>
      <Grid>
        <RaceCard
            id="2023-12-okinawa"
            prefecture="Okinawa"
            nameJa="第6回 沖縄100Kウルトラマラソン"
            nameEn="6th Okinawa 100K Ultramarathon"
            date="2023-12-17"
            distance={100}
            ascent={0}
            result="Timed out @ 69km"
            status="DNF"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
        </Grid>
      <Grid>
        <RaceCard
            id="2024-03-michikusa-minami-boso"
            prefecture="Chiba"
            nameJa="第8回南房総100km75kmみちくさウルトラマラソン"
            nameEn="8th Minami Boso Michikusa Ultramarathon"
            date="2024-03-16"
            distance={75}
            ascent={0}
            result="Bonk @ 52km"
            status="DNF"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
        </Grid>
      <Grid>
        <RaceCard
            id="2024-04-atsumi"
            prefecture="Aichi"
            nameJa="第3回渥美半島ウルトラネイチャーラン"
            nameEn="3rd Atsumi Peninsula Ultra Nature Run"
            date="2024-04-20"
            distance={70}
            ascent={0}
            result="Bonk @ 53km"
            status="DNF"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
        </Grid>
      <Grid>
        <RaceCard
            id="2024-05-nobeyama"
            prefecture="Nagano"
            nameJa="第30回 星の郷八ヶ岳野辺山高原100kmウルトラマラソン"
            nameEn="30th Nobeyama Ultramarathon"
            date="2024-05-19"
            distance={68}
            ascent={0}
            result="Bonk @ 54km"
            status="DNF"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
      </Grid>
      <Grid>
        <RaceCard
            id="2024-06-rockin-bear"
            prefecture="Niigata"
            nameJa="“ROCKIN’ BEAR” 妙高トレイルランニングレース"
            nameEn="Rockin' Bear Myoko Trail Race"
            date="2024-06-15"
            distance={48}
            ascent={0}
            result="9:31:54"
            status="Finish"
            itraPoints={2}
            itraLink="https://itra.run/Races/RaceDetails/90530"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
      </Grid>
      <Grid>
        <RaceCard
            id="2024-08-ishioka"
            prefecture="Ibaraki"
            nameJa="第11回筑波連山天空ロード＆トレイルランinいしおか"
            nameEn="11th Tsukuba Mountain Range Sky Road & Trail Run in Ishioka"
            date="2024-08-25"
            distance={75}
            ascent={0}
            result="off-course 28km"
            status="DNF"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
      </Grid>
      <Grid>
        <RaceCard
            id="2024-10-iki"
            prefecture="Nagasaki"
            nameJa="神々の島壱岐ウルトラマラソン2024"
            nameEn="Island of the Gods - Iki Ultramarathon 2024"
            date="2024-10-19"
            distance={100}
            ascent={0}
            result="Timed out @ 82.5km"
            status="DNF"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
      </Grid>
      <Grid>
        <RaceCard
            id="2024-12-boso-coast-to-coast"
            prefecture="Chiba"
            nameJa="2024房総半島横断レース"
            nameEn="Boso Peninsula Coast to Coast 2024"
            date="2024-12-22"
            distance={72}
            ascent={2000}
            result="12:28:42"
            status="Finish"
            itraPoints={3}
            itraLink="https://itra.run/Races/RaceDetails/100958"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
      </Grid>
      <Grid>
        <RaceCard
            id="2025-03-self-supported-okutama-50"
            prefecture="Tokyo"
            nameJa="Self-supported 50k (+3500m ascent) in Oku-tama"
            date="2025-03-14"
            distance={50}
            ascent={3500}
            result="11:32:00"
            status="Finish"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
      </Grid>
      <Grid>
        <RaceCard
            id="2025-05-tokyo-grand-trail"
            prefecture="Tokyo"
            nameJa="Tokyo Grand Trail 2025"
            date="2025-05-30"
            distance={160}
            ascent={0}
            result="TBD"
            status="TBD"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RaceCard>
      </Grid>
    </Grid>
  );
}
