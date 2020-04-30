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

// TODO: GET ALL TODO'S WHICH ARE NOT CHECKED
const sql = "SELECT todo.ID, Description, Checked\n" +
    "FROM `todo`\n" +
    "RIGHT JOIN `todometa` meta ON meta.`ToDoID` = todo.`ID`\n" +
    "WHERE (DATEDIFF('2021-03-13', RepeatStart) % RepeatInterval = 0)\n" +
    "OR (\n" +
    "    (RepeatYear = ? OR RepeatYear = '*')\n" +
    "    AND (RepeatMonth = ? OR RepeatMonth = '*')\n" +
    "    AND (RepeatDay = ? OR RepeatDay = '*')\n" +
    "    AND (RepeatWeek = ? OR RepeatWeek = '*')\n" +
    "    AND (RepeatWeekday = ? OR RepeatWeekday = '*')\n" +
    "    AND RepeatStart <= ?\n" +
    ")\n" + 
    " OR todo.Checked = 0";

module.exports = function (app) {
    app.get('/todo', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        const { today, year, month, day, week, weekday } = req.query;

        conn.query(sql, [year, month, day, week, weekday, today], function (err, data) {
            if (err) throw err;
            res.json({ data });
        });
    });
};
