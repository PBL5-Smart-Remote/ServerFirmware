const path = require('path');
const express = require('express');
const morgan = require('morgan');
const db = require('./config/db');
const app = express();
const port = 4500;

const { cron_schedule } = require('./util/cron')

const route = require('./routes');
// Connect to DB

db.connect();
// db.models;

//apply middleware
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

// Static file: directory of Static files
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

cron_schedule('https://api.tugino.com:5501/schedule/cron');

// Routes init
route(app);

app.listen(port, () => {
    console.log(`My app listening on port http://localhost:${port}`);
});

// ngrok http --scheme=http 4000 --host-header=localhost:4000

