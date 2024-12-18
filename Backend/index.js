const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
    .catch(err => console.log(err));
