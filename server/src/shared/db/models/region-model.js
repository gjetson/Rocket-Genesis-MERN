const mongoose = require('mongoose')

const RegionSchema = mongoose.Schema({
    region: {
        type: String,
        enum: {
            values: ['north', 'south', 'east', 'west'],
            msg: 'value must be north, south, east or west'
        },
        required: true,
        unique: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    total_sales: {
        type: Number,
        default: 0,
        min: 0
    },
    manager: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent'
    }],
    top_agents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent'
    }]
}, { timestamps: true })

const Region = mongoose.model('Region', RegionSchema)
module.exports = Region