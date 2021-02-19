const express = require('express');

const router = express.Router()

const bodyParser = require('body-parser');

const { Board, Task } = require('../db/models/index')

router.use(bodyParser.json());

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

module.exports = router

