const config = require('../config.json');
const role = require('../helpers/role');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'my_day',
    multipleStatements: true
});

conn.connect(function (err) {
    if (err) throw err;
    //console.log(conn);
});

function DateFormatServer(date) {
    const max10 = (i) => (i < 10 ? "0" : "") + i;
    const YYYY = date.getFullYear();
    const MM = max10(date.getMonth() + 1);
    const DD = max10(date.getDate());
    const HH = max10(date.getHours());
    const II = max10(date.getMinutes());
    const SS = max10(date.getSeconds());
    return `${YYYY}-${MM}-${DD}T${HH}:${II}:${SS}`;
};

const getAll = async currentUser => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT todo.ID, Description, Checked
            FROM todo
            LEFT JOIN todometa meta ON meta.ToDoID = todo.ID
            WHERE todo.UserID = ${currentUser}
            AND (
                (DATEDIFF('2021-03-13', RepeatStart) % RepeatInterval = 0)
                OR todo.Checked = 0
            )`;

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

const addData = async entry => {
    return new Promise((resolve, reject) => {
        const { description, startDate, recurring, repeatInterval, userId } = entry;
        const currentDate = DateFormatServer(new Date());
        const newStartDate = DateFormatServer(new Date(startDate));

        const sql1 = `INSERT INTO todo (UserID, Description, DateTime, DateTimeAdded, Checked, Deleted)
        VALUES (${userId}, '${description}', '${newStartDate}', '${currentDate}', 0, 0)`;

        if (recurring) {
            conn.query(sql1, function(err, data) {
                const sql2 = `INSERT INTO todometa(ToDoID, RepeatStart, RepeatInterval, RepeatYear, RepeatMonth, RepeatDay, RepeatWeek, RepeatWeekday) VALUES(${data.insertId}, '${newStartDate}', ${repeatInterval}, null, null, null, null, null)`;

                conn.query(sql2, function (err, data) {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        }
        else {
            conn.query(sql1, function (err, data) {
                if (err) {
                    return reject(err);
                }
                else {
                    resolve(data);
                }
            });
        }
    })
}

const updateData = async data => {
    return new Promise((resolve, reject) => {
        const { checked, id } = data;

        const sql = `UPDATE todo SET checked=${checked} WHERE ID=${id}`;

        conn.query(sql, function (err, data) {
            if (err) {
                return reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

module.exports = {
    getAll,
    updateData,
    addData
}