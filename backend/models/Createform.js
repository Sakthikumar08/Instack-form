// models/Form.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [
    {
      questionText: String,
      questionType: String,
      options: [String]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', formSchema);
