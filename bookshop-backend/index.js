require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/auth.route');
const bookRoutes = require('./routes/book.route');
const userRoutes = require('./routes/user.route');

const app = express();

// ✅ FIXED CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://my-bookshop.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// Test routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.get('/api/users/test', (req, res) => {
  res.json({ message: 'Users route is working!' });
});

const PORT = process.env.PORT || 5000;

// Start server
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log('Server running on port', PORT)
    );
  })
  .catch(err => {
    console.error('DB connection error', err);
    process.exit(1);
  });
