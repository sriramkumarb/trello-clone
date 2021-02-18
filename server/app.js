const express = require('express')
const app = express()
const port = 3000

const { mongoose } = require('./db/mongoose')

const bodyParser = require('body-parser');

// Load in the mongoose models
const { Board, Task } = require('./db/models')

// Load Middleware
app.use(bodyParser.json());

// Board Routes

// GET Request

app.get('/boards', (req, res) => {
    // return an array of all the boards in the DB
    Board.find({}).then((boards) => {
        res.send(boards);
    })
})

// POST Request

app.post('/boards', (req, res) => {
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

app.put('/boards/:id', (req, res) => {
    // upadate board name 
    Board.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

// DELETE Request

app.delete('/boards/:id', (req, res) => {
    // Delete a particular board from the DB
    Board.findByIdAndDelete({
        _id: req.params.id
    }).then((removedBoardDetais) => {
        res.send(removedBoardDetais);
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})