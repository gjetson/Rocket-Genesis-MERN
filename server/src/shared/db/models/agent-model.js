const mongoose = require('mongoose')
const validator = require('validator')

const AgentSchema = mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Email is invalid.')
            }
        },
        unique: true
    },
    region: {
        type: String,
        enum: {
            values: ['north', 'south', 'east', 'west'],
            msg: 'value must be north, south, east or west'
        },
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    fee: {
        type: Number,
        default: 0,
        min: 0
    },
    sales: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true })

const Agent = mongoose.model('Agent', AgentSchema)
module.exports = Agent