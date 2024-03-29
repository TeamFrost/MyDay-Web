const express = require('express');
const mysql = require('mysql');
const PORT = process.env.PORT || 3300;
const app = express();

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'my_day',
    // multipleStatements: true
});

conn.connect(function (err) {
    if (err) throw err;
    console.log(conn);
});

require('./routes/getJournalData')(app);
require('./routes/getCalendarData')(app);
require('./routes/getToDoData')(app);
require('./routes/updateToDo')(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
