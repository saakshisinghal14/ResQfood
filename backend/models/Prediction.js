// models/Prediction.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Prediction Schema
const predictionSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'dashboards',
    required: true
  },
  predictedFood: {
    type: String,
    required: true
  }
});

// Create Prediction Model
const PredictionModel = mongoose.model('prediction', predictionSchema);

module.exports = PredictionModel;