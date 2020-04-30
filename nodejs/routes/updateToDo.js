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

const sql = "UPDATE todo SET Checked = ? WHERE ID = ?;";

module.exports = function (app) {
    app.get('/updatetodo', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        const { id, checked } = req.query;

        conn.query(sql, [checked, id], function (err, data) {
            if (err) throw err;
            res.json({ data });
        });
    });
};
