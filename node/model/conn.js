const mongoose = require('mongoose');
const MONGO_CONNECTION_LOCAL_URL = process.env.MONGO_CONNECTION_LOCAL_URL;

// Connect to MongoDB
mongoose
    .connect(MONGO_CONNECTION_LOCAL_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

// Handle connection events
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB');
});
