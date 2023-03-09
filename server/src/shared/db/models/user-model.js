const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('mongoose-bcrypt')

const UserSchema = mongoose.Schema({
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
    password: {
        type: String,
        trim: true,
        required: true,
        bcrypt: true
    },
}, { timestamps: true })

UserSchema.plugin(bcrypt)
const User = mongoose.model('User', UserSchema)

module.exports = User