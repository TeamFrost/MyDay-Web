const express = require('express');
const router = express.Router();
const calendarService = require('./calendar.service');
const role = require('../helpers/role');
const authorize = require('../helpers/authorize');

const getAll = (req, res, next) => {
    calendarService.getAll(req.params)
        .then(data => res.json(data))
        .catch(err => next(err))
}

router.get('/getAll/:dateMin/:dateMax/:userId', authorize(), getAll);

module.exports = router;