const mongoose = require('mongoose');
const db = mongoose.connection;
const productsData = require('./products.js')
const Schema = mongoose.Schema;
var isSeeded = false;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("db connected");
});

mongoose.connect('mongodb+srv://jamesjamail:superSecretPassword@amishon-dg5is.mongodb.net/Amishon?retryWrites=true&w=majority', {useNewUrlParser: true});

var productsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  rating: Number,
  price: Number,
  prime: Boolean,
  category_id: Number,
  qty: Number
})

const products = mongoose.model('products', productsSchema);


function seedOnce() {
  if (!isSeeded) {
    // products.remove({});
    products.insertMany(productsData.data, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log('db seeded');
      }
    })
  }
  isSeeded = true;
}

seedOnce();

const checkQty = (callback) => {
  products.find({category_id:1}, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res)
    } 
  })
}

module.exports = {checkQty};