import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateUser from './CreateUser';
import EventList from './EventList';
import CreateEvent from './CreateEvent';
import EventsEdit from './EventsEdit';
import LandingPage from './LandingPage';
import ReportData from './ReportData';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Other Routes */}
        <Route path="/list" element={<EventList />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventsEdit />} />
        <Route path="/report" element={<ReportData />} />
      </Routes>
    </Router>
  );
}

export default App;