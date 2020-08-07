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
        const sql = `SELECT ROW_NUMBER() OVER (ORDER BY Date) Entry, Id, Date, Description FROM journal WHERE UserID = ${currentUser} AND Deleted = 0 ORDER BY Date DESC;`;
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

const deleteData = async id => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM journal WHERE ID = ${id}`;

        conn.query(sql, function (err, data) {
            if (err) {
                return reject(err);
            }
            else if (data && data.length) {
                resolve(data);
            }
            else {
                return reject();
            }
        });
    })
}

const addEntry = async entry => {
    return new Promise((resolve, reject) => {
        const { userId, description, selectedDate } = entry;
        const currentDate = DateFormatServer(new Date());
        const newSelectedDate = DateFormatServer(new Date(selectedDate));
        const sql = `INSERT INTO journal(UserID, Description, Date, DateTimeAdded, Deleted) VALUES(${userId}, '${description}', '${newSelectedDate}', '${currentDate}', 0)`;
        
        conn.query(sql, function (err, data) {
            if (err) {
                return reject(err);
            }
            else if (data && data.length) {
                resolve(data);
            }
            else {
                return reject();
            }
        })
    })
}

module.exports = {
    getAll,
    deleteData,
    addEntry
}