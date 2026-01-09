require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes import
const authRoutes = require('./routes/auth.route');
const bookRoutes = require('./routes/book.route');
const userRoutes = require('./routes/user.route'); // ✅ Ye line add karo

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes); // ✅ Ye line add karo

// Basic route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Test user routes
app.get('/api/users/test', (req, res) => {
  res.json({ message: 'Users route is working!' });
});

const PORT = process.env.PORT || 5000;

// Database connection and server start
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch(err => {
    console.error('DB connection error', err);
    process.exit(1);
  });