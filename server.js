const express = require('express');
const mongoose = require('mongoose'); // MISSING IN YOUR VERSION
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // MISSING IN YOUR VERSION

const app = express();

// 1. Middlewares (Must be at the top)
app.use(cors()); 
app.use(express.json());

// 2. Connect to MongoDB
// This uses the MONGODB_URI you set in the Render Dashboard
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("Could not connect to MongoDB:", err));

// 3. User Schema
const userSchema = new mongoose.Schema({
    gender: String,
    firstName: String,
    lastName: String,
    mobileNumber: String,
    emailId: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const outfitCatalogSchema = new mongoose.Schema({
    id: Number,
    category: String, // 'bride' or 'groom'
    type: String,     
    name: String,
    cost: Number,
    color: String,
    sizes: [String],
    img: String
});
const OutfitCatalog = mongoose.model('OutfitCatalog', outfitCatalogSchema);

// --- USER OUTFIT SELECTION SCHEMA ---
const userOutfitSelectionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    outfitId: { type: String, required: true },
    userName: String,      // firstname + lastname
    outfitName: String,
    outfitCost: Number,
    selectedTmstmp: { type: Date, default: Date.now }
});

const UserOutfitSelection = mongoose.model('UserOutfitSelection', userOutfitSelectionSchema);

// 4. API Routes
app.post('/api/signup', async (req, res) => {
    try {
        const { gender, firstName, lastName, mobileNumber, emailId, password } = req.body;

        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            gender, firstName, lastName, mobileNumber, emailId, password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "Registration successful!" });
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
});

// 3. Login Route
app.post('/api/login', async (req, res) => {
    try {
        // We call it 'identifier' because it could be an email or a phone number
        const { emailId, password } = req.body; 

        // 1. Search for a user matching either the email OR the mobile number
        const user = await User.findOne({
            $or: [
                { emailId: emailId },
                { mobileNumber: emailId } 
            ]
        });

        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up." });
        }

        // 2. Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Change your res.status(200) line in the /api/login route to this:
        res.status(200).json({ 
            message: "Login successful!", 
            user: { 
                id: user._id, // Add this line so the frontend gets the ID
                firstName: user.firstName, 
                email: user.emailId 
            } 
});
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
});

app.get('/api/outfits/filters', async (req, res) => {
    try {
        const category = req.query.category || 'bride';
        const types = await OutfitCatalog.distinct('type', { category });
        const colors = await OutfitCatalog.distinct('color', { category });
        res.status(200).json({ types, colors });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Fetch outfits based on active filters
app.get('/api/outfits/search', async (req, res) => {
    try {
        const { category, type, color, size, maxCost } = req.query;
        let query = { category: category || 'bride', cost: { $lte: maxCost || 200000 } };
        
        if (type && type !== 'all') query.type = type;
        if (color && color !== 'all') query.color = color;
        if (size && size !== 'all') query.sizes = size;

        const outfits = await OutfitCatalog.find(query);
        res.status(200).json(outfits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- SAVE OR REMOVE USER SELECTION ---
app.post('/api/outfits/select', async (req, res) => {
    try {
        const { userId, outfitId, userName, outfitName, outfitCost, action } = req.body;

        if (action === 'add') {
            const existing = await UserOutfitSelection.findOne({ userId, outfitId });
            if (!existing) {
                const selection = new UserOutfitSelection({ 
                    userId, 
                    outfitId, 
                    userName, 
                    outfitName, 
                    outfitCost,
                    selectedTmstmp: new Date() 
                });
                await selection.save();
            }
        } else {
            await UserOutfitSelection.deleteOne({ userId, outfitId });
        }

        const currentCount = await UserOutfitSelection.countDocuments({ userId });
        res.status(200).json({ currentCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all outfit IDs selected by a specific user
app.get('/api/outfits/user-selections', async (req, res) => {
    const selections = await UserOutfitSelection.find({ userId: req.query.userId });
    res.status(200).json(selections);
});

// Clear all selections for a user
app.post('/api/outfits/clear-selections', async (req, res) => {
    await UserOutfitSelection.deleteMany({ userId: req.body.userId });
    res.status(200).json({ message: "Cleared" });
});

// Root route to check if server is actually alive
app.get('/', (req, res) => {
    res.send("Vivaah Plus API is running and connected to DB!");
});

// 5. Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));