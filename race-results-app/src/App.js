import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';

const raceData = [
  {
    island: "_KYUSHU_AND_OKINAWA_",
    region: "_KYUSHU_AND_OKINAWA_",
    prefecture: "_OKINAWA_",
    name: "第8回 石垣島ウルトラマラソン",
    date: "2022-05-15",
    year: 2022,
    kmRace: 60,
    kmCovered: 60,
    result: "9:27:29",
  },
  {
    island: "_KYUSHU_AND_OKINAWA_",
    region: "_KYUSHU_AND_OKINAWA_",
    prefecture: "_OKINAWA_",
    name: "第5回 沖縄100Kウルトラマラソン",
    date: "2022-12-18",
    year: 2022,
    kmRace: 100,
    kmCovered: 85.5,
    result: "DNF",
  },
  {
    island: "_HONSU_",
    region: "_KANTO_",
    prefecture: "_KANAGAWA_",
    name: "第8回 横須賀・三浦100km・63kmみちくさウルトラマラソン",
    date: "2023-05-27",
    year: 2023,
    kmRace: 63,
    kmCovered: 63,
    result: "9:49:28",
  },
  {
    island: "_HONSU_",
    region: "_CHUBU_",
    prefecture: "_SHIZUOKA_",
    name: "第10回南伊豆町100km78km66kmみちくさウルトラマラソン",
    date: "2023-11-11",
    year: 2023,
    kmRace: 66,
    kmCovered: 66,
    result: "9:59:13",
  },
  {
    island: "_KYUSHU_AND_OKINAWA_",
    region: "_KYUSHU_AND_OKINAWA_",
    prefecture: "_OKINAWA_",
    name: "第6回 沖縄100Kウルトラマラソン",
    date: "2023-12-17",
    year: 2023,
    kmRace: 100,
    kmCovered: 69,
    result: "DNF",
  },
  {
    island: "_HONSU_",
    region: "_KANTO_",
    prefecture: "_CHIBA_",
    name: "第8回南房総100km75kmみちくさウルトラマラソン",
    date: "2024-03-16",
    year: 2024,
    kmRace: 75,
    kmCovered: 52,
    result: "DNF",
  },
  {
    island: "_HONSU_",
    region: "_CHUBU_",
    prefecture: "_AICHI_",
    name: "第3回渥美半島ウルトラネイチャーラン",
    date: "2024-04-20",
    year: 2024,
    kmRace: 70,
    kmCovered: 53,
    result: "DNF",
  },
  {
    island: "_HONSU_",
    region: "_CHUBU_",
    prefecture: "_NAGANO_",
    name: "第30回 星の郷八ヶ岳野辺山高原100kmウルトラマラソン",
    date: "2024-05-19",
    year: 2024,
    kmRace: 68,
    kmCovered: 54,
    result: "DNF",
  },
  {
    island: "_HONSU_",
    region: "_CHUBU_",
    prefecture: "_NIIGATA_",
    name: "“ROCKIN’ BEAR” 妙高トレイルランニングレース",
    date: "2024-06-15",
    year: 2024,
    kmRace: 48,
    kmCovered: 48,
    result: "9:31:54",
  },
  {
    island: "_HONSU_",
    region: "_KANTO_",
    prefecture: "_IBARAKI_",
    name: "第11回筑波連山天空ロード＆トレイルランinいしおか",
    date: "2024-08-25",
    year: 2024,
    kmRace: 75,
    kmCovered: "TBD",
    result: "TBD",
  },
  {
    island: "_HONSU_",
    region: "_KANTO_",
    prefecture: "_KANAGAWA_",
    name: "第27回 OverNight60km みちくさウルトラマラソン",
    date: "2024-07-20",
    year: 2024,
    kmRace: 60,
    kmCovered: "TBD",
    result: "TBD",
  }
];

// Mapping from underscored names to human-readable names
const islandMapping = {
  "_KYUSHU_AND_OKINAWA_": "Kyushu and Okinawa",
  "_HONSU_": "Honsu"
};

const regionMapping = {
  "_KYUSHU_AND_OKINAWA_": "Kyushu and Okinawa",
  "_KANTO_": "Kanto",
  "_CHUBU_": "Chubu"
};

const prefectureMapping = {
  "_OKINAWA_": "Okinawa",
  "_KANAGAWA_": "Kanagawa",
  "_SHIZUOKA_": "Shizuoka",
  "_CHIBA_": "Chiba",
  "_AICHI_": "Aichi",
  "_NAGANO_": "Nagano",
  "_NIIGATA_": "Niigata",
  "_IBARAKI_": "Ibaraki"
};

function App() {
  const [data, setData] = useState(raceData);
  const [filteredData, setFilteredData] = useState(raceData);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (key === 'date') {
        // Handle date sorting
        return (new Date(a[key]) - new Date(b[key])) * (direction === 'ascending' ? 1 : -1);
      } else {
        // Default alphanumeric sorting
        return (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0) * (direction === 'ascending' ? 1 : -1);
      }
    });

    setFilteredData(sortedData);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    let filtered;
    if (value === '') {
      filtered = data;
    } else {
      filtered = data.filter(item => item[name] === value);
    }
    setFilteredData(filtered);
  };

  return (
    <Router basename="/race-results-app">
      <div className="App">
        <div className="filter-container">
          <label htmlFor="dateFilter">Date:</label>
          <select id="dateFilter" name="date" onChange={handleFilterChange}>
            <option value="">All</option>
            {Array.from(new Set(data.map(item => `${item.date}`))).map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>

          <label htmlFor="islandFilter">Island:</label>
          <select id="islandFilter" name="island" onChange={handleFilterChange}>
            <option value="">All</option>
            {Object.keys(islandMapping).sort().map((key) => (
              <option key={key} value={key}>{islandMapping[key]}</option>
            ))}
          </select>

          <label htmlFor="regionFilter">Region:</label>
          <select id="regionFilter" name="region" onChange={handleFilterChange}>
            <option value="">All</option>
            {Object.keys(regionMapping).sort().map((key) => (
              <option key={key} value={key}>{regionMapping[key]}</option>
            ))}
          </select>

          <label htmlFor="prefectureFilter">Prefecture:</label>
          <select id="prefectureFilter" name="prefecture" onChange={handleFilterChange}>
            <option value="">All</option>
            {Object.keys(prefectureMapping).sort().map((key) => (
              <option key={key} value={key}>{prefectureMapping[key]}</option>
            ))}
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th onClick={() => sortTable('date')}>Date</th>
              <th onClick={() => sortTable('island')}>Island</th>
              <th onClick={() => sortTable('region')}>Region</th>
              <th onClick={() => sortTable('prefecture')}>Prefecture</th>
              <th onClick={() => sortTable('name')}>Race Name</th>
              <th onClick={() => sortTable('kmRace')}>Race Distance (km)</th>
              <th onClick={() => sortTable('kmCovered')}>Distance Covered (km)</th>
              <th onClick={() => sortTable('result')}>Result</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{islandMapping[item.island]}</td>
                <td>{regionMapping[item.region]}</td>
                <td>{prefectureMapping[item.prefecture]}</td>
                <td>{item.name}</td>
                <td>{item.kmRace}</td>
                <td>{item.kmCovered}</td>
                <td style={{ color: item.result === 'TBD' ? 'blue' : item.result === 'DNF' ? 'red' : 'black' }}>{item.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Router>
  );
}

export default App;
