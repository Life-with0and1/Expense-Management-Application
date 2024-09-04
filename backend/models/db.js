const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("Database connected successfully.")
    })
    .catch((err) => {
        console.log("Error while connecting database->", err)
    })