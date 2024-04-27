import React, { useState, useEffect } from 'react';
import './EventList.css';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
      });
  }, []);

  const handleCheckboxChange = (event, eventData) => {
    event.preventDefault();

    const updatedEventData = {
      ...eventData,
      completed: !eventData.completed,
    };

    fetch(`/api/event/${eventData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEventData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEvents((prevEvents) =>
          prevEvents.map((eventItem) =>
            eventItem.id === eventData.id ? updatedEventData : eventItem
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const handleEventClick = (eventId) => {
    window.open(`/event/${eventId}`, '_blank');
  };

  const currentDate = new Date();
  const upcomingEvents = events.filter((event) => new Date(event.date) >= currentDate);
  const pastEvents = events.filter((event) => new Date(event.date) < currentDate);

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      <div className="event-list">
        <div className="upcoming-events">
          <h3>Upcoming Events</h3>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`event-item ${event.completed ? 'completed' : ''}`}
              >
                <div className="event-details">
                  <h4 onClick={() => handleEventClick(event.id)}>{event.name}</h4>
                  <p>Due: {new Date(event.date).toLocaleString()}</p>
                </div>
                <div className="event-actions">
                  <input
                    type="checkbox"
                    checked={event.completed}
                    onChange={(e) => handleCheckboxChange(e, event)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No upcoming events.</p>
          )}
        </div>
        <div className="divider"></div>
        <div className="past-events">
          <h3>Past Events</h3>
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <div
                key={event.id}
                className={`event-item ${event.completed ? 'completed' : ''}`}
              >
                <div className="event-details">
                  <h4 onClick={() => handleEventClick(event.id)}>
                    {event.name}
                    {!event.completed && <span className="overdue">OVERDUE</span>}
                  </h4>
                  <p>Due: {new Date(event.date).toLocaleString()}</p>
                </div>
                <div className="event-actions">
                  <input
                    type="checkbox"
                    checked={event.completed}
                    onChange={(e) => handleCheckboxChange(e, event)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No past events.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventList;