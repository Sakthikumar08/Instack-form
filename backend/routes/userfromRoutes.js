// backend/routes/formRoutes.js

const express = require('express');
const router = express.Router();
const FormResponse = require('../models/Userform'); // Mongoose model

// POST /api/submit
router.post('/', async (req, res) => {
  try {
    const { formId, responses } = req.body;

    if (!formId || !responses) {
      return res.status(400).json({ message: 'Missing formId or responses' });
    }

    const newResponse = new FormResponse({
      formId,
      responses,
      submittedAt: new Date(),
    });

    await newResponse.save();

    res.status(201).json({ message: 'Response saved successfully' });
  } catch (err) {
    console.error('Error saving form response:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
