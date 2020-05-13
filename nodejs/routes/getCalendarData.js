const mysql = require('mysql');

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

const sql = "SELECT\n" +
    "       labels.Name AS LabelName,\n" +
    "       labels.Color AS LabelColor,\n" +
    "       activity.Name AS ActivityName,\n" +
    "       activity.Color AS ActivityColor,\n" +
    "       activities.StartDate,\n" +
    "       activities.EndDate,\n" +
    "       activities.Description,\n" +
    "       activities.Important\n" +
    "FROM activities\n" +
    "INNER JOIN activity ON activities.ActivityID = activity.ID\n" +
    "INNER JOIN labels ON activity.LabelID = labels.ID\n" +
    "WHERE activities.StartDate >= ?\n" +
    "AND activities.StartDate <= ?\n" +
    "AND activities.EndDate >= ?\n" +
    "AND activities.EndDate <= ?";

module.exports = function (app) {
    app.get('/calendar', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        let params = {
            dateMin: req.query.dateMin,
            dateMax: req.query.dateMax,
        };

        conn.query(sql, [params.dateMin, params.dateMax, params.dateMin, params.dateMax], function (err, data) {
            if (err) throw err;
            res.json({ data });
        });
    });
};