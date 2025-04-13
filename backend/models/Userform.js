// backend/models/FormResponse.js

const mongoose = require('mongoose');

const FormResponseSchema = new mongoose.Schema({
  formId: {
    type: String,
    required: true,
  },
  responses: {
    type: Object, // or Map, or Mixed
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FormResponse', FormResponseSchema);
