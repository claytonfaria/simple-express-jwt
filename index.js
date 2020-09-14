const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to DB
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongDB Connected: ${conn.connection.host}`);
};

connectDB();

// Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Middles
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server Up and Running'));
