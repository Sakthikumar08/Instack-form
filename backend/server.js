const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formRoutes = require('./routes/createformRoutes');
const userformRoutes = require('./routes/userfromRoutes'); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/submit', userformRoutes);


app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
