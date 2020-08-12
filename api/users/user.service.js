const config = require('../config.json');
const role = require('../helpers/role');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'my_day',
});

conn.connect(function (err) {
    if (err) throw err;
});

const authenticate = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE Email = '${email}' AND Password = '${password}'`;

        conn.query(sql, function (err, data) {
            if (err)
                return reject(err);
            else if (data && data.length) {
                const token = jwt.sign({ sub: data.id, role: data.role }, config.secret);
                const { Password, ...userWithoutPassword } = data[0];

                resolve({ ...userWithoutPassword, token });
            }
            else {
                return reject();
            }
        });
    })
}

const getAll = async () => {
    const sql = 'SELECT * FROM user';
    conn.query(sql, function (err, data) {
        if (err) throw err;
        res.json({ data });
        return data.map(u => {
            const { password, ...userWithoutPassword } = u;
            return userWithoutPassword;
        });
    });

}

const getById = async id => {
    const sql = `SELECT * FROM user WHERE user.id = ${id}`;
    conn.query(sql, function (err, data) {
        if (err) throw err;
        res.json({ data });
        if (!data) return;
        const { password, ...userWithoutPassword } = data;
        return userWithoutPassword;
    });

}

const updateUserAvatar = async data => {
    const { id, avatar } = data;

    const sql = `UPDATE user SET ProfilePicture = '${avatar}' WHERE ID = ${id}`;

    conn.query(sql, function (err, data) {
        if (err) throw err;
        return { avatar };
    });
}

const register = async newUser => {
    const { firstName, lastName, email, password, age, country, username } = newUser;

    const sql = `INSERT INTO user ( FirstName, LastName, Age, Country, Username, Email, Password, Stars, ProfilePicture, Role, Deleted) VALUES('${firstName}', '${lastName}', ${age}, '${country}', '${username}', '${email}', '${password}', 0, 'default.png', '${role.User}', 0)`;

    return new Promise((resolve, reject) => {
        conn.query(sql, function (err, data) {
            if (err) return reject();
            resolve(data);
        });
    });
}

const updateName = async data => {
    const { id, FirstName, LastName } = data;
    const sql = `UPDATE user SET FirstName = '${FirstName}', LastName = '${LastName}' WHERE ID =${id}`;

    conn.query(sql,function(err, data){
        if (err) throw err;
        return {FirstName, LastName};
    });
}

module.exports = {
    authenticate,
    getAll,
    getById,
    register,
    updateUserAvatar,
    updateName,
}