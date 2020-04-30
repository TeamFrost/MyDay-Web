const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'simo',
    password: 'pass',
    database: 'my_day',
    // multipleStatements: true
});

conn.connect(function (err) {
    if (err) throw err;
    console.log(conn);
});

const sql = "SELECT ROW_NUMBER() OVER (ORDER BY Date) Entry, Date, Description FROM journal WHERE UserID = 1 AND Deleted = 0 ORDER BY Date DESC;";

module.exports = function (app) {
    app.get('/journal', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        conn.query(sql, function (err, data) {
            if (err) throw err;
            res.json({ data });
        });
    });
};