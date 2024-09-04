const userModel = require("../models/user.model");

const addExpenses = async (req, res) => {
    const body = req.body
    const user = req.user
    try {
        const updated = await userModel.findByIdAndUpdate({ _id: user._id }, {
            $push: { expense: body }
        }, { new: true })
        return res.status(200).json({ success: true, message: "Expense added succesfully.", data: updated.expense });
    } catch (error) {
        return res.status(200).json({ success: false, message: "Error while adding expense." });
    }
}

const fetchExpenses = async (req, res) => {
    const user = req.user
    try {
        const content = await userModel.findOne({ _id: user._id })
        return res.status(200).json({ status: true, data: content });
    } catch (error) {
        return res.status(200).json({ status: true, message: "Error while fetching user." });
    }
}

const reduceExpenses = async (req, res) => {
    const user = req.user;
    const expenseId = req.params.id;
    try {
        const userData = await userModel.findByIdAndUpdate(
            { _id: user._id },
            { $pull: { expense: { _id: expenseId } } },
            { new: true }
        )
        res.status(200)
            .json({
                message: "Expense Deleted successfully",
                success: true,
                data: userData
            })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }

}



module.exports = {
    fetchExpenses,
    addExpenses,
    reduceExpenses
}