const express = require('express')
const userModel = require('./models/user.model.js')
const { userRouter } = require('./routes/user.route.js')
const homeRouter = require('./routes/home.route.js')
const app = express()
const cors = require('cors')
const expenseRouter = require('./routes/expense.route.js')
const authMiddleware = require('./middlewares/auth.middleware.js')
require('dotenv').config()
require('./models/db.js')

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 3000


app.use("/api",userRouter)
app.use("/api",homeRouter)
app.use("/api", authMiddleware ,expenseRouter)

app.listen(PORT)