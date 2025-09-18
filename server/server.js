const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workers', require('./routes/workerRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/gov', require('./routes/govRoutes'));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
