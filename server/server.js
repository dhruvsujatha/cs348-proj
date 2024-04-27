const express = require('express');
const dbHelper = require('./dbHelper');
const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ "users": ["userOne", "userTwo"] });
});

app.get('/api/other', (req, res) => {
    res.json({ message: 'Hello from other endpoint!' });
});

// Create a new endpoint which will be used to create a new user. use the POST method and the function defined in dbHelper.js
app.post('/api/user', async (req, res) => {
    console.log(req.body);
    if (!req.body) {
        return res.sendStatus(400);
    }
    const { name, email, password } = req.body;
    const result = await dbHelper.createUser(name, email, password);
    if (result) {
        res.json({ message: 'User created successfully!' });
    } else {
        res.json({ message: 'User creation failed!' });
    }
});

// Create a new endpoint which will be used to get all users. Use the GET method and the function defined in dbHelper.js
app.get('/api/users', async (req, res) => {
    const users = await dbHelper.getUsers();
  // For the length of users, create a new array with name as the key and the user info as value.
  res.json(users);
});

app.get('/api/user/:id', async (req, res) => {
    const user = await dbHelper.getUser(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.json({ message: 'User not found!' });
    }
});

app.get('/api/events', async (req, res) => {
  const events = await dbHelper.getEvents();
  res.json(events);
});

app.post('/api/event', async (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    const { name, date, location, description } = req.body;
    const result = await dbHelper.createEvent(name, date, location, description);
    if (result) {
        res.json({ message: 'Event created successfully!' });
    } else {
        res.json({ message: 'Event creation failed!' });
    }
}
);

app.get('/api/event/:id', async (req, res) => {
    console.log(req.params.id);
    const event = await dbHelper.getEvent(req.params.id);
    if (event) {
        res.json(event);
    } else {
        res.json({ message: 'Event not found!' });
    }
}
);

app.put('/api/event/:id', async (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    const { name, date, location, description, completed } = req.body;
    const result = await dbHelper.modifyEvent(req.params.id, name, date, location, description, completed);
    if (result) {
        res.json({ message: 'Event modified successfully!' });
    } else {
        res.json({ message: 'Event modification failed!' });
    }
}  
);

app.get('/api/hard_reset_db', async (req, res) => {
    const result = await dbHelper.resetDB();
    if (result) {
        res.json({ message: 'Database reset successfully!' });
    } else {
        res.json({ message: 'Database reset failed!' });
    }
}
);


app.listen(3001, () => { console.log("Server on port 3001") });

