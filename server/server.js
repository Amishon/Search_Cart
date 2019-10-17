const express = require('express');
const app = express();
const path = require('path');
const db = require('./db.js')

app.use(express.static(path.join(__dirname, '../dist/')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//fix this- testing below for db connection not a real func

app.get('/getData', (request, response) => {
    //return product data
    db.checkQty((err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            response.send(results);
            // console.log(JSON.stringify(results));
        }
        response.end();
    })
})

app.post('/search_cart_subQty', (request, response) => {
    //decrement db quantity for current item
})

app.post('/search_cart_removeFromCart', (request, response) => {
    //set db quantity for current item to 0
})

app.listen(3002, () => console.log("personal server running on port 3002"));
