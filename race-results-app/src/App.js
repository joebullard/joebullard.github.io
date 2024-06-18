import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';

const raceData = [
  {
    island: "_HONSU_",
    region: "_KANTO_",
    prefecture: "_TOKYO_",
    name: "第11回 伊豆大島マラソン\n\n11th Izu Oshima Marathon",
    date: "2021-12-11",
    year: 2021,
    kmRace: 42.2,
    result: "5:32:24",
  },
  {
    island: "_KYUSHU_AND_OKINAWA_",
    region: "_KYUSHU_AND_OKINAWA_",
    prefecture: "_OKINAWA_",
    name: "第8回 石垣島ウルトラマラソン\n\n8th Ishigaki Island Ultramarathon",
    date: "2022-05-15",
    year: 2022,
    kmRace: 60,
    result: "9:27:29",
  },
  {
    island: "_KYUSHU_AND_OKINAWA_",
    region: "_KYUSHU_AND_OKINAWA_",
    prefecture: "_OKINAWA_",
    name: "第5回 沖縄100Kウルトラマラソン\n\n5th Okinawa 100K Ultramarathon",
    date: "2022-12-18",
    year: 2022,
    kmRace: 100,
    result: "DNF (85.5km)",
  },
  {
    island: "_HONSU_",
    region: "_KANTO_",
    prefecture: "_KANAGAWA_",
    name: "第8回 横須賀・三浦100km・63kmみちくさウルトラマラソン\n\n8th Yokosuka Miura Michikusa Ultramarathon",
    date: "2023-05-27",
    year: 2023,
    kmRace: 63,
    result: "9:49:28",
  },
  {
    island: "_HONSU_",
    region: "_CHUBU_",
    prefecture: "_SHIZUOKA_",
    name: "第10回南伊豆町100km78km66kmみちくさウルトラマラソン\n\n10th Minami Izu Town Michikusa Ultramarathon",
    date: "2023-11-11",
    year: 2023,
    kmRace: 66,
    result: "9:59:13",
  },
  {
    island: "_KYUSHU_AND_OKINAWA_",
    region: "_KYUSHU_AND_OKINAWA_",
    prefecture: "_OKINAWA_",
    name: "第6回 沖縄100Kウルトラマラソン\n\n6th Okinawa 100K Ultramarathon",
    date: "2023-12-17",
    year: 2023,
    kmRace: 100,
    result: "DNF (69km)",
  },
  {
    island: "_HONSU_",
    region: "_KANTO_",
    prefecture: "_CHIBA_",
    name: "第8回南房総100km75kmみちくさウルトラマラソン\n\n8th Minami Boso Michikusa Ultramarathon",
    date: "2024-03-16",
    year: 2024,
    kmRace: 75,
    result: "DNF (52km)",
  },
  {
    island: "_HONSU_",
    region: "_CHUBU_",
    prefecture: "_AICHI_",
    name: "第3回渥美半島ウルトラネイチャーラン\n\n3rd Atsumi Peninsula Ultra Nature Run",
    date: "2024-04-20",
    year: 2024,
    kmRace: 70,
    result: "DNF (53km)",
  },
  {
    island: "_HONSU_",
    region: "_CHUBU_",
    prefecture: "_NAGANO_",
    name: "第30回 星の郷八ヶ岳野辺山高原100kmウルトラマラソン\n\n30th Nobeyama Ultramarathon",
    date: "2024-05-19",
    year: 2024,
    kmRace: 68,
    result: "DNF (54km)",
  },
  {
    island: "_HONSU_",
    region: "_CHUBU_",
    prefecture: "_NIIGATA_",
    name: "“ROCKIN’ BEAR” 妙高トレイルランニングレース\n\nRockin' Bear Myoko Trail Race",
    date: "2024-06-15",
    year: 2024,
    kmRace: 48,
    result: "9:31:54",
  },
  {
    island: "_HONSU_",
    region: "_KANTO_",
    prefecture: "_IBARAKI_",
    name: "第11回筑波連山天空ロード＆トレイルランinいしおか\n\n11th Tsukuba Mountain Range Sky Road & Trail Run in Ishioka",
    date: "2024-08-25",
    year: 2024,
    kmRace: 75,
    result: "TBD",
  },
  {
    island: "_HONSU_",
    region: "_KANTO_",
    prefecture: "_KANAGAWA_",
    name: "第27回 OverNight60km みちくさウルトラマラソン\n\n27th Overnight 60km Michikusa Ultramarathon",
    date: "2024-07-20",
    year: 2024,
    kmRace: 60,
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
  "_TOKYO_": "Tokyo",
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
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedResult, setSelectedResult] = useState('');

  useEffect(() => {
    // Initially set filteredData to sorted data by date ascending
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredData(sortedData);
  }, [data]);

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (key === 'date') {
        return (new Date(a[key]) - new Date(b[key])) * (direction === 'ascending' ? 1 : -1);
      } else {
        return (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0) * (direction === 'ascending' ? 1 : -1);
      }
    });

    setFilteredData(sortedData);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'year') {
      setSelectedYear(value); // Update selected year state

      let filtered;
      if (value === '') {
        filtered = [...data]; // Reset filter to all data
      } else {
        filtered = data.filter(item => item.year.toString() === value); // Filter by selected year
      }
      
      // Sort filtered data by date after filtering by year
      const sortedData = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredData(sortedData);
    } else if (name === 'result') {
      setSelectedResult(value); // Update selected result state

      let filtered;
      if (value === '') {
        filtered = [...data]; // Reset filter to all data
      } else if (value === 'Finished') {
        filtered = data.filter(item => item.result.indexOf('DNF') === -1 && item.result !== 'TBD');
      } else if (value === 'DNF') {
        filtered = data.filter(item => item.result.indexOf('DNF') !== -1);
      } else {
        filtered = data.filter(item => item.result === value);
      }
      
      // Sort filtered data by date after filtering by result
      const sortedData = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredData(sortedData);
    }
  };

  return (
    <Router basename="/race-results-app">
      <div className="App">
        <div className="filter-container">
          <label htmlFor="yearFilter">Year:</label>
          <select id="yearFilter" name="year" onChange={handleFilterChange}>
            <option value="">All</option>
            {Array.from(new Set(data.map(item => item.year))).map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>

          <label htmlFor="resultFilter">Result:</label>
          <select id="resultFilter" name="result" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Finished">Finished</option>
            <option value="DNF">DNF</option>
            <option value="TBD">TBD</option>
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
              <th onClick={() => sortTable('name')}>Name</th>
              <th onClick={() => sortTable('kmRace')}>Distance (km)</th>
              <th onClick={() => sortTable('result')}>Result</th>
              <th onClick={() => sortTable('prefecture')}>Prefecture</th>
              <th onClick={() => sortTable('region')}>Region</th>
              <th onClick={() => sortTable('island')}>Island</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td style={{ whiteSpace: 'pre-line' }}>{item.name}</td>
                <td>{item.kmRace}</td>
                <td style={{ color: item.result === 'TBD' ? 'blue' : item.result.indexOf('DNF') !== -1 ? 'red' : 'black' }}>{item.result}</td>
                <td>{prefectureMapping[item.prefecture]}</td>
                <td>{regionMapping[item.region]}</td>
                <td>{islandMapping[item.island]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Router>
  );
}

export default App;
