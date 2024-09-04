const express = require('express')
const { addExpenses, fetchExpenses, reduceExpenses } = require('../controllers/expense.controller')
const expenseRouter = express.Router()

expenseRouter.post("/add", addExpenses)
expenseRouter.get("/get", fetchExpenses)
expenseRouter.delete("/reduce/:id", reduceExpenses)


module.exports = expenseRouter