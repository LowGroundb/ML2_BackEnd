const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Import routes
const userRoutes = require('./routes/user.routes');
const fitnessRoutes = require('./routes/fitness.routes');

// Use routes
app.use('/api', userRoutes);
app.use('/api', fitnessRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});