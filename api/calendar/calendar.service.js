const config = require('../config.json');
const role = require('../helpers/role');
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
    //console.log(conn);
});

const getAll = async data => {
    const { dateMin, dateMax, userId } = data;

    return new Promise((resolve, reject) => {
        const sql = `SELECT
                labels.Name AS LabelName,
                labels.Color AS LabelColor,
                activity.Name AS ActivityName,
                activity.Color AS ActivityColor,
                activities.StartDate,
                activities.EndDate,
                activities.Description,
                activities.Important
        FROM activities
        INNER JOIN activity ON activities.ActivityID = activity.ID
        INNER JOIN labels ON activity.LabelID = labels.ID
        WHERE labels.UserID = ${userId}
        AND activities.StartDate >= '${dateMin}'
        AND activities.StartDate < '${dateMax}'
        AND activities.EndDate >= '${dateMin}'
        AND activities.EndDate < '${dateMax}';`;

        conn.query(sql, function (err, data) {
            if (err)
                return reject(err);
            else if (data && data.length) {
                resolve(data);
            }
            else {
                return reject();
            }
        });
    })

}

module.exports = {
    getAll,
}