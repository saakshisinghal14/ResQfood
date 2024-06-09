//Dashboard.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DashboardSchema = new  mongoose.Schema({
  // ownerName: String,
  userId: { type: Schema.Types.ObjectId, ref: 'restaurants' },
  // restaurantName: String,
  picturePath: String,
  // email: String,
  foodName: String,
  date: Date,
  postdate: Date,
  foodCategory: String,
  storage: String,
  weather: String
});

const DashboardModel = mongoose.model("dashboards",DashboardSchema);


module.exports = DashboardModel;