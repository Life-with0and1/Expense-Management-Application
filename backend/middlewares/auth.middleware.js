const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ status: false, message: "Authentication required." });
    }
    

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Something went wrong." });
    }
};

module.exports = authMiddleware;
