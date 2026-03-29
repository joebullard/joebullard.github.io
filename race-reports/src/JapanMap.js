import * as React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import races from './assets/races.json';

const GEO_URL = `${process.env.PUBLIC_URL}/japan.topojson`;

// TopoJSON uses suffixes like "Tokyo To", "Kanagawa Ken", "Osaka Fu", "Hokkai Do"
const TOPO_SUFFIX_EXCEPTIONS = {
  'Tokyo':    'Tokyo To',
  'Osaka':    'Osaka Fu',
  'Kyoto':    'Kyoto Fu',
  'Hokkaido': 'Hokkai Do',
};

function toTopoName(name) {
  return TOPO_SUFFIX_EXCEPTIONS[name] || `${name} Ken`;
}

const racedPrefectures = new Set(races.map(r => toTopoName(r.prefecture)));

const COLOR_RACED    = '#4a90d9';
const COLOR_SELECTED = '#1a56a0';
const COLOR_UNRACED  = '#e0e0e0';
const COLOR_HOVER    = '#74b0e8';

export default function JapanMap({ selected, onSelect }) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: [136.5, 37], scale: 1500 }}
      width={800}
      height={650}
      style={{ width: '100%', maxWidth: 800, height: 'auto' }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const topoName = geo.properties.nam;
            const isRaced = racedPrefectures.has(topoName);
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
                    fill: isSelected ? COLOR_SELECTED : COLOR_HOVER,
                    outline: 'none',
                    cursor: isRaced ? 'pointer' : 'default',
                  },
                  pressed: { fill: COLOR_SELECTED, outline: 'none' },
                  default: { outline: 'none' },
                }}
                onClick={() => {
                  if (!isRaced) return;
                  // Strip the suffix back to the short name for the callback
                  const shortName = Object.entries(TOPO_SUFFIX_EXCEPTIONS)
                    .find(([, v]) => v === topoName)?.[0]
                    ?? topoName.replace(/ (Ken|Fu|Do|To)$/, '');
                  onSelect(selected === shortName ? null : shortName);
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
