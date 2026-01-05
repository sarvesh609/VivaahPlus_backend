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

        res.status(200).json({ 
            message: "Login successful!", 
            user: { firstName: user.firstName, email: user.emailId } 
        });
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
});

// Root route to check if server is actually alive
app.get('/', (req, res) => {
    res.send("Vivaah Plus API is running and connected to DB!");
});

// 5. Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));