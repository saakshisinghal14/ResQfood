//Restaurant.js

const mongoose=require('mongoose');


const RestaurantSchema= new mongoose.Schema({

    restaurantName:String,
      email: String,
      password: String,
      address: String,
      contactNumber :Number,
      foodCategory:String,
      ownerName:String,
      socialMedia:String,
      website:String,
})

const RestaurantModel= mongoose.model("restaurants",RestaurantSchema);


module.exports =RestaurantModel;