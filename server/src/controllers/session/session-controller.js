const Session = require('../../shared/db/models/session-model')
const { v4: uuidv4 } = require('uuid')

const createSession = async (req, res) => {
    try {
        const seshFoo = {
            token: uuidv4(),
            user: req.body.userId
        }
        console.log(seshFoo)
        const sesh = await Session.create(seshFoo)
        res.status(201).json(sesh)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const authenticateSession = async (req, res) => {
    try {
        const sesh = await Session.findOne({ token: req.params.token }).populate('user')
        if (sesh) {
            res.status(200).json(sesh)
        }
        else {
            res.status(401).json({})
        }
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const getSessions = async (req, res) => {
    try {
        const sesh = await Session.find({}).populate('user')
        console.log(sesh)
        res.status(200).json(sesh)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getSession = async (req, res) => {
    try {
        const sesh = await Session.findById(req.params.id).populate('user')
        res.status(200).json(sesh)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const deleteSession = async (req, res) => {
    try {
        const sesh = await Session.findByIdAndDelete(req.params.id)
        if (sesh) {
            sesh.status(200).json(sesh)
        }
        else {
            res.status(404).json({ err: `User not found for id: ${req.params.id}` })
        }
    } catch (err) {
        if (err.kind === 'ObjectId' && err.name === 'CastError') {
            const msg = `'${req.params.id}' is not an ID. It must be a string of 12 bytes or 24 hex characters or an integer.`
            res.status(500).json({ error: msg })
        } else {
            res.status(500).json({ error: err })
        }
    }
}

module.exports = { createSession, authenticateSession, getSessions, getSession, deleteSession }