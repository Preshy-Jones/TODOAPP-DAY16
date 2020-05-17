const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')


var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo', todoSchema);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/todo', ensureAuthenticated, function (req, res) {
    //get data from mongodb and pass it to view
    Todo.find({}, function (err, data) {
        if (err) throw err;
        res.render('todo', { todos: data })
    })

});

router.post('/todo', urlencodedParser, function (req, res) {
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function (err, data) {
        if (err) throw err;
        res.json(data);
    })
});

router.delete('/todo/:item', function (req, res) {
    //delete the requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (err, data) {
        if (err) throw err;
        res.render('todo', { todos: data })
    })
});


module.exports = router;