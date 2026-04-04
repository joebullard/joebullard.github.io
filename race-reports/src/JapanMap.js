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

// Tooltips only make sense on devices with a real pointer (not touch)
const SUPPORTS_HOVER =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const COLOR_RACED    = '#4a90d9';
const COLOR_SELECTED = '#1a56a0';
const COLOR_UNRACED  = '#d8d8d8';
const COLOR_HOVER    = '#74b0e8';

const STATUS_COLORS = { 'Finish': '#2e7d32', 'Special Finish': '#b45309', 'DNF': '#c62828', 'Upcoming': '#888' };

function PrefectureGeographies({ geographies, selected, onSelect, onHover, onHoverEnd, onMove, filterFn, noClick, racedPrefectures }) {
  return geographies.filter(filterFn).map((geo) => {
    const topoName   = geo.properties.nam;
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
          hover:   { fill: isSelected ? COLOR_SELECTED : isRaced ? COLOR_HOVER : '#c0c0c0', outline: 'none', cursor: isRaced ? 'pointer' : 'default' },
          pressed: { fill: COLOR_SELECTED, outline: 'none' },
          default: { outline: 'none' },
        }}
        onClick={noClick ? undefined : () => {
          if (!isRaced) return;
          const shortName = toShortName(topoName);
          onSelect(selected === shortName ? null : shortName);
        }}
        onMouseEnter={SUPPORTS_HOVER ? (evt) => onHover(toShortName(topoName), evt.clientX, evt.clientY) : undefined}
        onMouseMove={SUPPORTS_HOVER  ? (evt) => onMove(evt.clientX, evt.clientY) : undefined}
        onMouseLeave={SUPPORTS_HOVER ? onHoverEnd : undefined}
      />
    );
  });
}

function Tooltip({ tooltip, racesByPrefecture }) {
  if (!tooltip || !SUPPORTS_HOVER) return null;
  const { name, x, y } = tooltip;
  const prefRaces = racesByPrefecture[name] || [];
  const flipLeft = x > window.innerWidth - 220;

  return (
    <div style={{
      position: 'fixed',
      left: flipLeft ? x - 180 : x + 14,
      top: y - 10,
      background: 'white',
      border: '1px solid #ddd',
      borderRadius: 6,
      padding: '8px 12px',
      pointerEvents: 'none',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
      minWidth: 160,
      maxWidth: 220,
    }}>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: prefRaces.length ? 6 : 0 }}>{name}</div>
      {prefRaces.map(r => (
        <div key={r.id} style={{ fontSize: 12, display: 'flex', justifyContent: 'space-between', gap: 8, lineHeight: 1.6 }}>
          <span style={{ color: '#333' }}>{r.nameEn}</span>
          <span style={{ color: STATUS_COLORS[r.status] || '#888', fontWeight: 600, whiteSpace: 'nowrap' }}>{r.status}</span>
        </div>
      ))}
      {!prefRaces.length && <div style={{ fontSize: 12, color: '#999' }}>No races</div>}
    </div>
  );
}

function applyFilters(races, { showSelfSupported, showMarathons, showUltras }) {
  return races.filter(r => {
    const dist = r.raceDistance;
    const isMarathon = dist >= 40 && dist < 45;
    const isUltra = dist >= 45;
    if (!showSelfSupported && r.eventType === 'self-supported') return false;
    if (!showMarathons && isMarathon) return false;
    if (!showUltras && isUltra) return false;
    return true;
  });
}

export default function JapanMap({ selected, onSelect, filters }) {
  const [tooltip, setTooltip] = React.useState(null);

  const filteredRaces = React.useMemo(
    () => applyFilters(races, filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.showSelfSupported, filters.showMarathons, filters.showUltras]
  );

  const racedPrefectures = React.useMemo(
    () => new Set(filteredRaces.map(r => toTopoName(r.prefecture))),
    [filteredRaces]
  );

  const racesByPrefecture = React.useMemo(
    () => filteredRaces.reduce((acc, r) => {
      (acc[r.prefecture] = acc[r.prefecture] || []).push(r);
      return acc;
    }, {}),
    [filteredRaces]
  );

  const raceCount       = filteredRaces.length;
  const prefectureCount = new Set(filteredRaces.map(r => r.prefecture)).size;

  const handleHover    = (name, x, y) => setTooltip({ name, x, y });
  const handleMove     = (x, y) => setTooltip(t => t ? { ...t, x, y } : null);
  const handleHoverEnd = () => setTooltip(null);

  const sharedProps = { selected, onSelect, onHover: handleHover, onMove: handleMove, onHoverEnd: handleHoverEnd, racedPrefectures };
  const okinawaIsRaced = racedPrefectures.has('Okinawa Ken');

  return (
    <>
      <Tooltip tooltip={tooltip} racesByPrefecture={racesByPrefecture} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 860, overflow: 'hidden' }}>

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
                filterFn={geo => geo.properties.nam !== 'Okinawa Ken'}
                {...sharedProps}
              />
            )}
          </Geographies>
        </ComposableMap>

        {/* Stats overlay — sits in the right-side whitespace above the Okinawa inset */}
        <div style={{
          position: 'absolute',
          bottom: '27%',
          right: '2%',
          width: '24%',
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          {[
            { value: raceCount,                    label: 'races' },
            { value: `${prefectureCount} / 47`,    label: 'prefectures' },
          ].map(({ value, label }) => (
            <div key={label} style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: COLOR_RACED, lineHeight: 1.1 }}>
                {value}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#888', marginTop: 2 }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Okinawa inset — bottom right.
            The entire box is the click/tap target so small islands are easy to tap on mobile. */}
        <div
          onClick={() => {
            if (!okinawaIsRaced) return;
            onSelect(selected === 'Okinawa' ? null : 'Okinawa');
          }}
          style={{
            position: 'absolute',
            bottom: '3%',
            right: '2%',
            width: '24%',
            border: `1.5px solid ${selected === 'Okinawa' ? '#1a56a0' : '#aaa'}`,
            borderRadius: 4,
            background: selected === 'Okinawa' ? '#e8f0fb' : 'white',
            padding: 2,
            cursor: okinawaIsRaced ? 'pointer' : 'default',
            transition: 'border-color 0.15s, background 0.15s',
          }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [127.8, 26.3], scale: 3600 }}
            width={240}
            height={150}
            style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) => (
                <PrefectureGeographies
                  geographies={geographies}
                  filterFn={geo => geo.properties.nam === 'Okinawa Ken'}
                  noClick
                  {...sharedProps}
                />
              )}
            </Geographies>
          </ComposableMap>
          <div style={{ textAlign: 'center', fontSize: 9, color: '#666', paddingBottom: 2 }}>
            Okinawa
          </div>
        </div>

      </div>
    </>
  );
}
