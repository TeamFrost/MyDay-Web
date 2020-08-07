const express = require('express');
const router = express.Router();
const todoService = require('./todo.service');
const role = require('../helpers/role');
const authorize = require('../helpers/authorize');

const getAll = (req, res, next) => {
    todoService.getAll(req.params.userId)
        .then(data => res.json(data))
        .catch(err => next(err))
}

const addToDo = (req, res, next) => {
    todoService.addData(req.body)
        .then(data => res.json(data))
        .catch(err => next(err))
}

const updateData = (req, res, next) => {
    todoService.updateData(req.params)
        .then(data => res.json(data))
        .catch(err => next(err))
}

router.get("/getAll/:userId", authorize(), getAll);
router.post("/addToDo/", authorize(), addToDo);
router.patch("/updateData/:checked/:id", authorize(), updateData);

module.exports = router;