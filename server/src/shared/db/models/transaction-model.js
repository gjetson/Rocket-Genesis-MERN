const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
    region: {
        type: String,
        enum: {
            values: ['north', 'south', 'east', 'west'],
            msg: 'value must be north, south, east or west'
        },
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    sale: {
        type: Number,
        default: 0,
        min: 0
    },
    fee: {
        type: Number,
        default: 0,
        min: 0
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true,
    }
}, { timestamps: true })

const Transaction = mongoose.model('Transaction', TransactionSchema)
module.exports = Transaction