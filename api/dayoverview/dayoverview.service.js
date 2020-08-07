const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'my_day',
});

conn.connect(function (err) {
    if (err) throw err;
    //console.log(conn);
});

const getAllActivities = async data => {
    const { dateStart, userId } = data;

    return new Promise((resolve, reject) => {

        const sql = `SELECT activities.StartDate, activities.EndDate, activities.Description FROM activities
        INNER JOIN userstoactivities ON activities.ActivityID = userstoactivities.ID
        WHERE userstoactivities.UserID = ${userId}
        AND activities.StartDate >= '${dateStart}'
        AND activities.StartDate <= '${dateStart} 23:59:59'
        AND activities.EndDate >= '${dateStart}'
        AND activities.EndDate <= '${dateStart} 23:59:59';`;
        
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
    getAllActivities,
}