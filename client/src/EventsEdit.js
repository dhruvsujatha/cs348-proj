import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventsEdit.css';

const EventsEdit = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  useEffect(() => {
    fetchEventData();
  }, [id]);

  const fetchEventData = () => {
    fetch(`/api/event/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setFormData(data);
      })
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/event/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Event updated:', data);
        setEvent(data);
        setFormData(data);
        setIsEditingTitle(false);
        setIsEditingDescription(false);
        setIsEditingDate(false);
        setIsEditingLocation(false);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-edit-container">
      <div className="event-header">
        {isEditingTitle ? (
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            className="event-title-input"
          />
        ) : (
          <h1 onDoubleClick={() => setIsEditingTitle(true)}>{event.name}</h1>
        )}
      </div>
      <div className="event-details">
        <div className="event-date">
          {isEditingDate ? (
            <input
              type="datetime-local"
              name="date"
              value={formData.date || ''}
              onChange={handleInputChange}
              className="event-date-input"
            />
          ) : (
            <p onDoubleClick={() => setIsEditingDate(true)}>
              {new Date(event.date).toLocaleString()}
            </p>
          )}
        </div>
        <div className="event-description">
          <h2>Description</h2>
          {isEditingDescription ? (
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              className="event-description-input"
            />
          ) : (
            <p onDoubleClick={() => setIsEditingDescription(true)}>{event.description}</p>
          )}
        </div>
        <div className="event-location">
          <h2>Location</h2>
          {isEditingLocation ? (
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleInputChange}
              className="event-location-input"
            />
          ) : (
            <p onDoubleClick={() => setIsEditingLocation(true)}>{event.location}</p>
          )}
        </div>
      </div>
      {(isEditingTitle || isEditingDescription || isEditingDate || isEditingLocation) && (
        <button type="button" onClick={handleSubmit} className="save-button">
          Save Changes
        </button>
      )}
    </div>
  );
};

export default EventsEdit;