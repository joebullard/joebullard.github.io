import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';

const raceData = [
  {
    island: "_HONSHU_",
    region: "_KANTO_",
    prefecture: "_TOKYO_",
    name: "第11回 伊豆大島マラソン\n11th Izu Oshima Marathon",
    date: "2021-12-11",
    year: 2021,
    kmRace: 42.2,
    result: "5:32:24",
  },
  {
    island: "_OKINAWA_",
    region: "_OKINAWA_",
    prefecture: "_OKINAWA_",
    name: "第8回 石垣島ウルトラマラソン\n8th Ishigaki Island Ultramarathon",
    date: "2022-05-15",
    year: 2022,
    kmRace: 60,
    result: "9:27:29",
  },
  {
    island: "_OKINAWA_",
    region: "_OKINAWA_",
    prefecture: "_OKINAWA_",
    name: "第5回 沖縄100Kウルトラマラソン\n5th Okinawa 100K Ultramarathon",
    date: "2022-12-18",
    year: 2022,
    kmRace: 100,
    result: "DNF (timeout 85.5km)",
  },
  {
    island: "_HONSHU_",
    region: "_KANTO_",
    prefecture: "_KANAGAWA_",
    name: "第8回 横須賀・三浦100km・63kmみちくさウルトラマラソン\n8th Yokosuka Miura Michikusa Ultramarathon",
    date: "2023-05-27",
    year: 2023,
    kmRace: 63,
    result: "9:49:28",
  },
  {
    island: "_HONSHU_",
    region: "_CHUBU_",
    prefecture: "_SHIZUOKA_",
    name: "第10回南伊豆町100km78km66kmみちくさウルトラマラソン\n10th Minami Izu Town Michikusa Ultramarathon",
    date: "2023-11-11",
    year: 2023,
    kmRace: 66,
    result: "9:59:13",
  },
  {
    island: "_OKINAWA_",
    region: "_OKINAWA_",
    prefecture: "_OKINAWA_",
    name: "第6回 沖縄100Kウルトラマラソン\n6th Okinawa 100K Ultramarathon",
    date: "2023-12-17",
    year: 2023,
    kmRace: 100,
    result: "DNF (timeout 69km)",
  },
  {
    island: "_HONSHU_",
    region: "_KANTO_",
    prefecture: "_CHIBA_",
    name: "第8回南房総100km75kmみちくさウルトラマラソン\n8th Minami Boso Michikusa Ultramarathon",
    date: "2024-03-16",
    year: 2024,
    kmRace: 75,
    result: "DNF (bonk 52km)",
  },
  {
    island: "_HONSHU_",
    region: "_CHUBU_",
    prefecture: "_AICHI_",
    name: "第3回渥美半島ウルトラネイチャーラン\n3rd Atsumi Peninsula Ultra Nature Run",
    date: "2024-04-20",
    year: 2024,
    kmRace: 70,
    result: "DNF (bonk 53km)",
  },
  {
    island: "_HONSHU_",
    region: "_CHUBU_",
    prefecture: "_NAGANO_",
    name: "第30回 星の郷八ヶ岳野辺山高原100kmウルトラマラソン\n30th Nobeyama Ultramarathon",
    date: "2024-05-19",
    year: 2024,
    kmRace: 68,
    result: "DNF (bonk 54km)",
  },
  {
    island: "_HONSHU_",
    region: "_CHUBU_",
    prefecture: "_NIIGATA_",
    name: "“ROCKIN’ BEAR” 妙高トレイルランニングレース\nRockin' Bear Myoko Trail Race",
    date: "2024-06-15",
    year: 2024,
    kmRace: 48,
    result: "9:31:54",
  },
  {
    island: "_HONSHU_",
    region: "_KANTO_",
    prefecture: "_IBARAKI_",
    name: "第11回筑波連山天空ロード＆トレイルランinいしおか\n11th Tsukuba Mountain Range Sky Road & Trail Run in Ishioka",
    date: "2024-08-25",
    year: 2024,
    kmRace: 75,
    result: "DNF (off-course 28km)",
  },
  {
    island: "_KYUSHU_",
    region: "_KYUSHU_",
    prefecture: "_NAGASAKI_",
    name: "神々の島　壱岐ウルトラマラソン2024\nIsland of the Gods - Iki Ultramarathon 2024",
    date: "2024-10-19",
    year: 2024,
    kmRace: 100,
    result: "DNF (timeout 82.5km)",
  },
  {
    island: "_HONSHU_",
    region: "_KANTO_",
    prefecture: "_CHIBA_",
    name: "2024房総半島横断レース\nBoso Peninsula Coast to Coast 2024",
    date: "2024-12-22",
    year: 2024,
    kmRace: 72,
    result: "12:28:42",
  },
  {
    island: "_HONSHU_",
    region: "_KANTO_",
    prefecture: "_TOKYO_",
    name: "Tokyo Grand Trail 2025",
    date: "2025-05-30",
    year: 2024,
    kmRace: 160,
    result: "TBD",
  },
];

const regionMapping = {
  "_OKINAWA_": "Okinawa",
  "_KYUSHU_": "Kyushu",
  "_KANTO_": "Kanto",
  "_CHUBU_": "Chubu",
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
  "_IBARAKI_": "Ibaraki",
  "_NAGASAKI_": "Nagasaki",
};

function App() {
  const [data, setData] = useState(raceData);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedResult, setSelectedResult] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPrefecture, setSelectedPrefecture] = useState('');

  useEffect(() => {
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
      setSelectedYear(value);

      let filtered;
      if (value === '') {
        filtered = [...data];
      } else {
        filtered = data.filter(item => item.year.toString() === value);
      }
      
      if (selectedResult !== '') {
        filtered = filtered.filter(item => item.result === selectedResult);
      }
      if (selectedRegion !== '') {
        filtered = filtered.filter(item => item.region === selectedRegion);
      }
      if (selectedPrefecture !== '') {
        filtered = filtered.filter(item => item.prefecture === selectedPrefecture);
      }
      
      const sortedData = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredData(sortedData);
    } else if (name === 'result') {
      setSelectedResult(value);

      let filtered;
      if (value === '') {
        filtered = [...data];
      } else if (value === 'Finished') {
        filtered = data.filter(item => item.result.indexOf('DNF') === -1 && item.result !== 'TBD');
      } else if (value === 'DNF') {
        filtered = data.filter(item => item.result.indexOf('DNF') !== -1);
      } else {
        filtered = data.filter(item => item.result === value);
      }
      
      if (selectedYear !== '') {
        filtered = filtered.filter(item => item.year.toString() === selectedYear);
      }
      if (selectedRegion !== '') {
        filtered = filtered.filter(item => item.region === selectedRegion);
      }
      if (selectedPrefecture !== '') {
        filtered = filtered.filter(item => item.prefecture === selectedPrefecture);
      }
      
      const sortedData = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredData(sortedData);      
    } else if (name === 'region') {
      setSelectedRegion(value);

      let filtered;
      if (value === '') {
        filtered = [...data];
      } else {
        filtered = data.filter(item => item.region === value);
      }
      
      if (selectedYear !== '') {
        filtered = filtered.filter(item => item.year.toString() === selectedYear);
      }
      if (selectedResult !== '') {
        filtered = filtered.filter(item => item.result === selectedResult);
      }
      if (selectedPrefecture !== '') {
        filtered = filtered.filter(item => item.prefecture === selectedPrefecture);
      }
      
      const sortedData = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredData(sortedData);
    } else if (name === 'prefecture') {
      setSelectedPrefecture(value);

      let filtered;
      if (value === '') {
        filtered = [...data];
      } else {
        filtered = data.filter(item => item.prefecture === value);
      }
      
      if (selectedYear !== '') {
        filtered = filtered.filter(item => item.year.toString() === selectedYear);
      }
      if (selectedResult !== '') {
        filtered = filtered.filter(item => item.result === selectedResult);
      }
      if (selectedRegion !== '') {
        filtered = filtered.filter(item => item.region === selectedRegion);
      }
      
      const sortedData = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredData(sortedData);
    }
  };

  const clearFilters = () => {
    setSelectedYear('');
    setSelectedResult('');
    setSelectedRegion('');
    setSelectedPrefecture('');

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredData(sortedData);
  };

  return (
    <Router basename="/race-results-app">
      <div className="App">
        <div className="filter-container">
          <label htmlFor="yearFilter">Year:</label>
          <select id="yearFilter" name="year" value={selectedYear} onChange={handleFilterChange}>
            <option value="">All</option>
            {Array.from(new Set(data.map(item => item.year))).map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>

          <label htmlFor="resultFilter">Result:</label>
          <select id="resultFilter" name="result" value={selectedResult} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Finished">Finished</option>
            <option value="DNF">DNF</option>
            <option value="TBD">TBD</option>
          </select>

          <label htmlFor="prefectureFilter">Prefecture:</label>
          <select id="prefectureFilter" name="prefecture" value={selectedPrefecture} onChange={handleFilterChange}>
            <option value="">All</option>
            {Object.keys(prefectureMapping).sort().map((key) => (
              <option key={key} value={key}>{prefectureMapping[key]}</option>
            ))}
          </select>

          <label htmlFor="regionFilter">Region:</label>
          <select id="regionFilter" name="region" value={selectedRegion} onChange={handleFilterChange}>
            <option value="">All</option>
            {Object.keys(regionMapping).sort().map((key) => (
              <option key={key} value={key}>{regionMapping[key]}</option>
            ))}
          </select>

          <button type="button" onClick={clearFilters}>Clear Filters</button>
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
              {/*<th onClick={() => sortTable('island')}>Island</th>*/}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Router>
  );
}

export default App;
