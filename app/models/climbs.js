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
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  reveiw: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Climb', climbSchema)
