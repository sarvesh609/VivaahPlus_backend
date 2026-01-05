const bcrypt = require('bcryptjs');

// 1. Updated User Schema to match your signup.html
const userSchema = new mongoose.Schema({
    gender: String,
    firstName: String,
    lastName: String,
    mobileNumber: String,
    emailId: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// 2. Sign-Up Route
app.post('/api/signup', async (req, res) => {
    try {
        const { gender, firstName, lastName, mobileNumber, emailId, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already registered." });
        }

        // Secure the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save to MongoDB
        const newUser = new User({
            gender,
            firstName,
            lastName,
            mobileNumber,
            emailId,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "Registration successful!" });
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
});