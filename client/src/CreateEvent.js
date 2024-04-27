import React, { useState } from 'react';
import './CreateEvent.css';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(eventData));

    fetch('/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Handle the response from the API
      });

    setEventData({
      name: '',
      description: '',
      location: '',
      date: '',
    });
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-group">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;