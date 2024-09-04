const express = require('express');
const home = require('../controllers/home.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const homeRouter = express.Router();


homeRouter.get("/home", authMiddleware, home)

module.exports = homeRouter