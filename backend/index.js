const express = require('express');
const mongoose= require('mongoose');
const cors= require('cors');

const app=express();
const RestaurantModel = require('./models/Restaurant')


app.use(express.json())

app.use(cors());
// copy the connection string from mongodb atlas
mongoose.connect("mongodb://127.0.0.1:27017/Resqfood");

app.post('/register',(req,res)=>{
RestaurantModel.create(req.body).then(restaurants=>
    res.json(restaurants)).catch(err=>res.json(err))


})
// Update the server response for successful login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    RestaurantModel.findOne({ email: email })
      .then(user => {
        if (user) {
          if (user.password === password) {
            res.json({ status: "Success", restaurantName: user.restaurantName });
          } else {
            res.json({ status: "IncorrectPassword" });
          }
        } else {
          res.json({ status: "NoRecordExists" });
        }
      })
      .catch(err => {
        res.json({ status: "Error", error: err.message });
      });
  });
  

app.listen(3001,()=>{
    console.log("server is running")
})