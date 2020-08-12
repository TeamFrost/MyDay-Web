const express = require('express');
const router = express.Router();
const journalService = require('./journal.service');
const role = require('../helpers/role');
const authorize = require('../helpers/authorize');

const getAll = (req, res, next) => {
    journalService.getAll(req.params.userId)
        .then(data => res.json(data))
        .catch(err => next(err))
}

const deleteData = (req, res, next) => {
    const { id } = req.params;
    journalService.deleteData(id)
        .then(data => res.json(data))
        .catch(err => next(err))
}

const addEntry = (req, res, next) => {
    journalService.addEntry(req.body)
        .then(data => res.json(data))
        .catch(err => next(err))
}

router.get('/getAll/:userId', authorize(), getAll);
router.delete('/deleteData/:id', authorize(), deleteData);
router.post('/addEntry', authorize(), addEntry);

module.exports = router;