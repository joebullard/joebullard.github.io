import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import RaceGrid from './RaceGrid';
import {
  Sheet,
 } from '@mui/joy';

function App() {
  return (
    <Router basename="/race-reports">
      <Sheet sx={{ p: 4 }}>
        <RaceGrid />
      </Sheet>
    </Router>
  );
}

export default App;
