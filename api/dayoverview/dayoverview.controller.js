const express = require('express');
const router = express.Router();
const dayoverviewService = require('./dayoverview.service');
const role = require('../helpers/role');
const authorize = require('../helpers/authorize');

const getAllActivities = (req, res, next) => {
    dayoverviewService.getAllActivities(req.params)
        .then(data => res.json(data))
        .catch(err => next(err))
}

router.get('/getAllActivities/:dateStart/:userId', authorize(), getAllActivities);

module.exports = router;