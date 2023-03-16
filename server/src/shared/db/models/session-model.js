const mongoose = require('mongoose')

const SessionSchema = mongoose.Schema({
    token: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        expires: '24h',
        default: Date.now
    }
})

const Session = mongoose.model('Session', SessionSchema)
module.exports = Session