const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user) return res.status(400).json({ status: false, message: "User already exists." });

        if (password.length < 8) return res.status(400).json({ status: false, message: "Enter a strong password." });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '24h' }); 

        const createdUser = await userModel.create({ name, email, password: hashedPassword });
        res.status(200).json({ status: true, message: "User registered successfully.", data: createdUser, token });
    } catch (error) {
        console.error(error); 
        res.status(400).json({ status: false, message: "Something went wrong." });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ status: false, message: "Invalid credentials." });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '24h' }); 
            res.status(200).json({ status: true, message: "Login successful.", token });
        } else {
            res.status(400).json({ status: false, message: "Invalid credentials." });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({ status: false, message: "Something went wrong." });
    }
};

module.exports = {
    signup,
    login
};
