const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const role = require('../helpers/role');
const authorize = require('../helpers/authorize');

const authenticate = (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => {
            user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect!' })
        })
        .catch(err => next(err))
}

const getAll = (req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err))
}

const getbyId = (req, res, next) => {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    if (id !== currentUser.sub && currentUser.role !== role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err))
}

const register = (req, res, next) => {//de modificat?
    res.setHeader('Access-Control-Allow-Origin', '*');

    return userService.register(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Some error message!' }))
        .catch(err => next(err));
}

router.post('/authenticate', authenticate);     // public route
router.get('/', authorize(role.Admin), getAll); // admin only
router.get('/:id', authorize(), getbyId);       // authenticated users
router.post('/register', register);             // public route

module.exports = router;