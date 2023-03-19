const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
    amount: {
        type: Number,
        trim: true,
        required: true
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent'
    }
}, { timestamps: true })

const Transaction = mongoose.model('Transaction', TransactionSchema)
module.exports = Transaction