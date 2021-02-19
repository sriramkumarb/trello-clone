const express = require('express');

const router = express.Router()

const bodyParser = require('body-parser');

const { Board, Task } = require('../db/models/index')

router.use(bodyParser.json());

// Board Routes

// GET Request

router.get('/boards', (req, res) => {
    // return an array of all the boards in the DB
    Board.find({}).then((boards) => {
        res.send(boards);
    })
})

// POST Request

router.post('/boards', (req, res) => {
    // create a new board in the DB
    // board information must be passed through the JSON body
    let title = req.body.title;

    let newBoard = new Board({
        title
    });
    newBoard.save().then((boardDetails) => {
        // the full board details is returned
        res.send(boardDetails);
    })

})

// PUT Request

router.put('/boards/:id', (req, res) => {
    // upadate board name 
    Board.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

// DELETE Request

router.delete('/boards/:id', (req, res) => {
    // Delete a particular board from the DB
    Board.findByIdAndDelete({
        _id: req.params.id
    }).then((removedBoardDetais) => {
        res.send(removedBoardDetais);
    })
})

// Tasks Routes

// GET Requests

router.get('/boards/:boardId/tasks', (req, res) => {
    // return all the tasks that beloged to a specific board
    Task.find({
        _boardId: req.params.boardId
    }).then((tasks) => {
        res.send(tasks);
    })
})

router.get('/boards/:boardId/tasks/:taskId', (req, res) => {
    Task.findById({
        _id: req.params.taskId,
        _boardId: req.params.boardId
    }).then((task) => {
        res.send(task)
    })
})

// POST Requests

router.post('/boards/:boardId/tasks', (req, res) => {
    // create a new tasks in the board specified by the boardId
    let newTask = new Task({
        title: req.body.title,
        _boardId: req.params.boardId,
    });
    newTask.save().then((newTaskDetails) => {
        res.send(newTaskDetails);
    })
})

// PUT Requests

router.put('/boards/:boardId/tasks/:taskId', (req, res) => {
    // update exsisting task by using taskId
    Task.findByIdAndUpdate({
        _id: req.params.taskId,
        _boardId: req.params.boardId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200)
    })
})

// DELETE Requests

router.delete('/boards/:boardId/tasks/:taskId', (req, res) => {
    // delete exisisting task by using taskId
    Task.findByIdAndDelete({
        _id: req.params.taskId,
        _boardId: req.params.boardId
    }).then((removeTaskDetails) => {
        res.send(removeTaskDetails)
    })
})

module.exports = router

