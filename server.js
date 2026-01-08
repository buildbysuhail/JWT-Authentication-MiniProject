require('dotenv').config(); // without this 'process.env.PORT' becomes undefined.
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

// Envt variable
const PORT = process.env.PORT || 3005;

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`);
})