const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

// TODO: 
/**
 * Create indexes for date and id columns in the events table.
 * 
 * Show that 4/10 Db access methods are prepared statements and 6/10 are ORM
 * therefore fulfilling the requirement of at least 20%.
 * 
 * Try to deploy the app to heroku and show that it works.
 */



const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

    
// Create a model for a table called event which stores each event's name, date, location (Physical Address or URL), description (optional), and if it's completed or not.
// Also, include a column for the event's ID which is the primary key (auto-incrementing uuid).

const Event = sequelize.define('event', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

// Create a model for a table called user which stores each user's name, email, and password.

const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Create helper functions to interact with the database.

const defaultEvents = [
    {
        name: "CS 348 Project Demo",
        date: "2024-04-29 01:51:00.000 +00:00",
        location: "Online",
        description: "Demo of the CS 348 project."
    },
    {
        name: "CS 252 Final Exam",
        date: "2024-04-30 01:51:00.000 +00:00",
        location: "Online",
        description: "Final exam for CS 252."
    },
    {
        name: "MA 265 Final Exam",
        date: "2024-05-01 01:51:00.000 +00:00",
        location: "Online",
        description: "Final exam for MA 265."
    },
    {
        name: "Flight to MAA",
        date: "2024-05-04 01:51:00.000 +00:00",
        location: "KORD",
        description: "Flight to Chennai."
    },
    {
        name: "MA 265 Homework 32",
        date: "2024-04-22 01:51:00.000 +00:00",
        location: "Brightspace",
        description: "Homework 32 for MA 265."
    },
    {
        name: "MA 265 Homework 33",
        date: "2024-04-22 01:51:00.000 +00:00",
        location: "Brightspace",
        description: "Homework 32 for MA 265."
    },
    {
        name: "MA 265 Homework 34",
        date: "2024-04-22 01:51:00.000 +00:00",
        location: "Brightspace",
        description: "Homework 32 for MA 265."
    },
    {
        name: "BIOL 111 Lab Exam #3",
        date: "2024-04-23 01:51:00.000 +00:00",
        location: "Online",
        description: "Lab exam #3 for BIOL 111."
    },
    {
        name: "BIOL 111 Extra Credit",
        date: "2024-04-25 01:51:00.000 +00:00",
        location: "Online",
        description: "Extra credit for BIOL 111."
    },
];

const defaultUsers = [
    {
        name: "John Doe",
        email: "john.doe@gmail.com",
        password: "JohnnyBoy@1343"
    },
    {
        name: "Jane Doe",
        email: "jane12doe@gmail.com",
        password: "JaneDoe@1234"
    },
];

const dbHelper = {
    createEvent: async (name, date, location, description) => {
        try {
            await Event.create({
                name: name,
                date: date,
                location: location,
                description: description,
                completed: false
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    getEvents: () => {
        return new Promise((resolve, reject) => {
          db.all('SELECT * FROM events', (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      },
    modifyEvent: async (id, name, date, location, description, completed) => {
        try {
            await Event.update({
                name: name,
                date: date,
                location: location,
                description: description,
                completed: completed
            }, {
                where: {
                    id: id
                }
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    deleteEvent: async (id) => {
        try {
            await Event.update({
                completed: true
            }, {
                where: {
                    id: id
                }
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    reviveEvent: async (id) => {
        try {
            await Event.update({
                completed: false
            }, {
                where: {
                    id: id
                }
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    getEvent: (id) => {
        return new Promise((resolve, reject) => {
          db.get('SELECT * FROM events WHERE id = ?', [id], (err, row) => {
            if (err) {
              reject(err);
            } else {
              resolve(row);
            }
          });
        });
      },
    createUser: async (name, email, password) => {
        try {
            await User.create({
                name: name,
                email: email,
                password: password
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    getUsers: () => {
        return new Promise((resolve, reject) => {
          db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      },
    modifyUser: async (id, name, email, password) => {
        try {
            await User.update({
                name: name,
                email: email,
                password: password
            }, {
                where: {
                    id: id
                }
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    getUser: (id) => {
        return new Promise((resolve, reject) => {
          db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
              reject(err);
            } else {
              resolve(row);
            }
          });
        });
    },
    resetDB: () => {
        try {
            Event.destroy({
                where: {},
                truncate: true
            });
            User.destroy({
                where: {},
                truncate: true
            });
            defaultEvents.forEach(async (event) => {
                await dbHelper.createEvent(event.name, event.date, event.location, event.description);
            });
            defaultUsers.forEach(async (user) => {
                await dbHelper.createUser(user.name, user.email, user.password);
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
};

// Create the tables if they don't exist.

sequelize.sync();

// Create indexes for date and id columns in the events table.

Event.sync({
    indexes: [
        {
            fields: ['date']
        },
        {
            fields: ['id']
        }
    ]
});



// Fetch the events and users from the database and log them to the console.

(async () => {
    const events = await dbHelper.getEvents();
    console.log("Events: ", events.length);
    // const users = await dbHelper.getUsers();
    // console.log(users);
    // console.log(events[1]['dataValues']);
    // console.log('Events:', events.length);
    // console.log('Users:', users.length);
}
)();


module.exports = dbHelper;