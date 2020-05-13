require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/error-handler');
const mysql = require('mysql'); // conexiune db

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'my_day',
    // multipleStatements: true
});

conn.connect(function (err) {
    if (err) throw err;
    //console.log(conn);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', require('./users/user.controller'));

app.use(errorHandler);

const port = process.env.PORT || 3300;
const server = app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
})

// require('./routes/getJournalData')(app);
// require('./routes/getCalendarData')(app);
// require('./routes/getToDoData')(app);
// require('./routes/updateToDo')(app);