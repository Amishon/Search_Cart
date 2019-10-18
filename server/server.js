const express = require('express');
const app = express();
const path = require('path');
const db = require('./db.js')

app.use(express.static(path.join(__dirname, '../dist/')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/getData/:itemId', (request, response) => {
    //return product data
    db.getProductData((err, results) => {
        if (err) {
            console.log('GETPRODUCTDATAERROR: ', err);
        }
        else {
            response.send(results);
            console.log('sending data from server');
        }
        response.end();
    },request.params.itemId)
})

app.post('/addToCart', (request, response) => {
    db.addToCart((err, results) => {
        if (err) {
            console.log('addToCartERROR: ', err);
        } else {
            response.send(results);
            console.log('addToCart Success');
        }
        response.end();
    }, request.body.productNum, request.body.qtyToAdd)
})

app.listen(3002, () => console.log("personal server running on port 3002"));
