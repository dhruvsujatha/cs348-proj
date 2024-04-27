import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './CreateUser.css'; // Import CSS file

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = { name, email, password };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(data));

    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setName("");
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="create-user-container">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className="create-user-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Create User
        </button>
      </form>
    </div>
  );
}

export default CreateUser;