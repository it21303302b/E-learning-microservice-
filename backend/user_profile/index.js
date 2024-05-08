const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); // Adding Helmet for security headers
const morgan = require('morgan'); // Adding Morgan for logging
const { connect, consumefromQueue } = require('./utils/amqpServer');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const authenticateUser = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet()); // Add security headers
app.use(morgan('combined')); // Log HTTP requests

// RabbitMQ connection
connect().then(() => {
  consumefromQueue();
});

// MongoDB connection
mongoose
  .connect(config.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => console.error('DB connection failure:', err));

// Routes
app.use('/api/users', authenticateUser, userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('SIGINT received. Closing server...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

// Start server
const server = app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});

module.exports = server; // Export server for testing purposes
