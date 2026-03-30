import * as React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import races from './assets/races.json';

const GEO_URL = `${process.env.PUBLIC_URL}/japan.topojson`;

const TOPO_SUFFIX_EXCEPTIONS = {
  'Tokyo':    'Tokyo To',
  'Osaka':    'Osaka Fu',
  'Kyoto':    'Kyoto Fu',
  'Hokkaido': 'Hokkai Do',
};

function toTopoName(name) {
  return TOPO_SUFFIX_EXCEPTIONS[name] || `${name} Ken`;
}

function toShortName(topoName) {
  return Object.entries(TOPO_SUFFIX_EXCEPTIONS).find(([, v]) => v === topoName)?.[0]
    ?? topoName.replace(/ (Ken|Fu|Do|To)$/, '');
}

const racedPrefectures = new Set(races.map(r => toTopoName(r.prefecture)));

const COLOR_RACED    = '#4a90d9';
const COLOR_SELECTED = '#1a56a0';
const COLOR_UNRACED  = '#d8d8d8';
const COLOR_HOVER    = '#74b0e8';

function PrefectureGeographies({ geographies, selected, onSelect, exclude }) {
  return geographies
    .filter(geo => exclude ? geo.properties.nam === exclude : geo.properties.nam !== 'Okinawa Ken')
    .map((geo) => {
      const topoName = geo.properties.nam;
      const isRaced    = racedPrefectures.has(topoName);
      const isSelected = selected && toTopoName(selected) === topoName;

      let fill = COLOR_UNRACED;
      if (isSelected) fill = COLOR_SELECTED;
      else if (isRaced) fill = COLOR_RACED;

      return (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          fill={fill}
          stroke="#ffffff"
          strokeWidth={0.5}
          style={{
            hover: {
              fill: isSelected ? COLOR_SELECTED : isRaced ? COLOR_HOVER : '#c8c8c8',
              outline: 'none',
              cursor: isRaced ? 'pointer' : 'default',
            },
            pressed: { fill: COLOR_SELECTED, outline: 'none' },
            default:  { outline: 'none' },
          }}
          onClick={() => {
            if (!isRaced) return;
            const shortName = toShortName(topoName);
            onSelect(selected === shortName ? null : shortName);
          }}
        />
      );
    });
}

export default function JapanMap({ selected, onSelect }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 860 }}>
      {/* Main map — all prefectures except Okinawa */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [137.5, 38.5], scale: 2100 }}
        width={860}
        height={680}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) => (
            <PrefectureGeographies
              geographies={geographies}
              selected={selected}
              onSelect={onSelect}
              exclude={null}
            />
          )}
        </Geographies>
      </ComposableMap>

      {/* Okinawa inset — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '3%',
          right: '2%',
          width: '18%',
          border: '1.5px solid #aaa',
          borderRadius: 4,
          background: 'white',
          padding: 2,
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [127.2, 26.2], scale: 1400 }}
          width={220}
          height={130}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) => (
              <PrefectureGeographies
                geographies={geographies}
                selected={selected}
                onSelect={onSelect}
                exclude="Okinawa Ken"
              />
            )}
          </Geographies>
        </ComposableMap>
        <div style={{ textAlign: 'center', fontSize: 9, color: '#666', paddingBottom: 2 }}>
          Okinawa
        </div>
      </div>
    </div>
  );
}
