// routes/forms.js
const express = require('express');
const router = express.Router();
const Form = require('../models/Createform');

router.post('/', async (req, res) => {
  try {
    const form = new Form(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
    console.log('GET /api/forms/:id', req.params.id); // Add this
    try {
      const form = await Form.findById(req.params.id);
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      res.json(form);
    } catch (err) {
      console.error('Error in GET form by ID:', err); // Add this
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

router.get('/', async (req, res) => {
  try {
    const forms = await Form.find({}, 'title description questions'); // only return needed fields
    res.json(forms);
  } catch (err) {
    console.error('Error fetching all forms:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

  

module.exports = router;
