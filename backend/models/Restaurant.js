const mongoose=require('mongoose');


const RestaurantSchema= new mongoose.Schema({

    restaurantName:String,
      email: String,
      password: String,
      address: String,
      foodCategory:String,
      contactNumber :Number,
      ownerName:String
})

const RestaurantModel= mongoose.model("restaurants",RestaurantSchema);


module.exports=RestaurantModel