const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  feedback: String,
  gender: String,
  skills: [String],
  country: String,
  dob: String,
  meetingTime: String,
  rating: Number,
}, { timestamps: true });

module.exports = mongoose.model('FormData', formSchema);
