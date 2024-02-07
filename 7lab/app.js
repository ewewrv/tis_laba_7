const express = require('express')
const app = express()
const port = 5001
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Node Todo API is running on port: ${port}`)
})

const todos = [
    { id: 1, text: "Brush teeth", completed: false },
    { id: 2, text: "Pet dog", completed: false },
    { id: 3, text: "Make Coffee", completed: false },
    { id: 4, text: "Write code", completed: false }

]

app.get('/', function (request, response) {
    response.send('Hello Test');
});

app.get('/error', function (request, response) {
    response.status(404).send('NotFound');
});

app.get('/user', function (request, response) {
    response.send({ name: 'Tom', age: 22 });
});

app.listen(3000);

module.exports.app = app;

app.get('/todos', function (req, res) {
    return res.send(todos)
});

app.get('/todos/:id', function (req, res) {
    const id = req.params.id;
    let result = null
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.id == id) { 
            result = todo;
        }
    }
    return res.send(result);
});

app.post('/todos/', function (req, res) {
    const newId = todos.length + 1;
    const newTodo = {
        id: newId,
        todo: req.body.todo,
        completed: false
    }
    todos.push(newTodo)

    return res.send(todos);
});

app.put('/todos/', function (req, res) {

    let todoToUpdate = todos.find((todo) => {
        return todo.id == req.body.id
    })

    todoToUpdate = {
        id: req.body.id,
        todo: req.body.todo,
        completed: req.body.completed
    };

    let index = todos.findIndex((todo) => {
        return todo.id == req.body.id
    });

    todos[index] = todoToUpdate;

    return res.send(todos);
});

app.delete('/todos/:id', function (req, res) {

    let index = todos.findIndex((todo) => {
        return todo.id == req.params.id
    });

    todos.splice(index, 1);

    return res.send(todos);
});