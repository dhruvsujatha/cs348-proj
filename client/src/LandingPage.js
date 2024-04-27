import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <h1 className="landing-page-title">CS348 Final Project</h1>
        <p className="landing-page-description">
          Use the links below to navigate to different pages. To edit an event, please click on an event in the list.
        </p>
        <div className="page-links-container">
          <div className="page-link">
            <Link to="/list" className="page-link-title">
              Event List
            </Link>
            <p className="page-link-description">View a list of events</p>
          </div>
          <div className="page-link">
            <Link to="/create" className="page-link-title">
              Create User
            </Link>
            <p className="page-link-description">Create a new user</p>
          </div>
          <div className="page-link">
            <Link to="/createevent" className="page-link-title">
              Create Event
            </Link>
            <p className="page-link-description">Create a new event</p>
          </div>
          <div className="page-link">
            <Link to="/report" className="page-link-title">
              User Report
            </Link>
            <p className="page-link-description">View an auto-generated report of the DB</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;