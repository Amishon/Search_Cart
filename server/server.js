const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, '../dist/')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/tasks', (request, response) => {
    db.getTodos((error, result) => {
        if (error) {
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})

app.post('/tasks', (request, response) => {
    db.addNewTask(request.body.task, (error, result) => {
        if (error) {
            response.send(error);
        }
        else {
            response.sendStatus(200);
        }
    })
})

app.listen(3002, () => console.log("personal server running on port 3002"));
