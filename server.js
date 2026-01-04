const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
// We will set MONGODB_URI in Render's dashboard later
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("Could not connect to MongoDB:", err));

// 2. Define a Schema (matching your MongoDB data)
const outfitSchema = new mongoose.Schema({
    id: Number,
    gender: String,
    type: String,
    name: String,
    cost: Number,
    color: String,
    sizes: [String],
    img: String
});

const Outfit = mongoose.model('Outfit', outfitSchema);

// 3. API Routes
// Get all outfits
app.get('/api/outfits', async (req, res) => {
    try {
        const outfits = await Outfit.find();
        res.json(outfits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Root route to check if server is running
app.get('/', (req, res) => {
    res.send("Vivaah Plus API is running...");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));