const mongoose = require('mongoose')

const climbSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  grade: {
    type: Number,
    required: true,
    min: 5.4,
    max: 5.17
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Climb', climbSchema)
