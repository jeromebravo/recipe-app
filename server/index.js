const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// connect to mongodb
connectDB();

// use cors
app.use(cors());

// init middleware
app.use(express.json({extended: false}));

// define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))