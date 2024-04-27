import React, { useState, useEffect } from 'react';
import './ReportData.css';

const ReportData = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchEventData();
  }, []);

  const fetchUserData = () => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  const fetchEventData = () => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  };

  const totalUsers = users.length;
  const newestUser = users.length > 0 ? users[users.length - 1] : null;

  const totalEvents = events.length;
  const pastEvents = events.filter((event) => new Date(event.date) < new Date());
  const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date());
  const overdueEvents = pastEvents.filter((event) => !event.completed);
  const closestUpcomingEvent = upcomingEvents.length > 0 ? upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date))[0] : null;
  const latestEvent = events.length > 0 ? events[events.length - 1] : null;

  return (
    <div className="report-data-container">
      <h1 className="report-data-title">Database Report</h1>
      <div className="report-data-content">
        <div className="report-data-section">
          <h2 className="report-data-section-title">Users</h2>
          <p>Total Users: {totalUsers}</p>
          {newestUser && (
            <p>
              Newest User: {newestUser.name} ({newestUser.email})
            </p>
          )}
        </div>
        <div className="report-data-section">
          <h2 className="report-data-section-title">Events</h2>
          <p>Total Events: {totalEvents}</p>
          <p>Past Events: {pastEvents.length}</p>
          <p>Upcoming Events: {upcomingEvents.length}</p>
          <p>Overdue Events: {overdueEvents.length}</p>
          {closestUpcomingEvent && (
            <p>
              Closest Upcoming Event: {closestUpcomingEvent.name} (
              {new Date(closestUpcomingEvent.date).toLocaleString()})
            </p>
          )}
          {latestEvent && (
            <p>
              Latest Event: {latestEvent.name} ({new Date(latestEvent.date).toLocaleString()})
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportData;