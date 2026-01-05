const bcrypt = require('bcryptjs'); // Add this at the top

// 1. Define the User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// 2. Sign-Up Route
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        // Hash the password (Security)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save to MongoDB
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error: " + err.message });
    }
});