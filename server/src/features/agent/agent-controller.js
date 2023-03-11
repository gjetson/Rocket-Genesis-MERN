const Agent = require('../../shared/db/models/agent-model')
const { filterUpdates } = require('./utils')

const createAgent = async (req, res) => {
    try {
        const agent = await Agent.create(req.body)
        res.status(201).json(agent)
    } catch (err) {
        if (err.code === 11000 && err.keyPattern.email === 1) {
            const msg = `Email: ${err.keyValue.email} is NOT unique! Cannot create agent.`
            res.status(400).json(msg)
        } else {
            console.error(err)
            res.status(500).json(err)
        }
    }
}

const getAgents = async (req, res) => {
    try {
        const agents = await Agent.find({}).sort({ last_name: 1 })
        res.status(200).json(agents)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const getAgent = async (req, res) => {
    try {
        const agents = await Agent.findById(req.params.id)
        res.status(200).json(agents)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const getAgentsByRegion = async (req, res) => {
    try {
        const agents = await Agent.find({ region: req.params.region }).sort({ rating: 1 })
        res.status(200).json(agents)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const updateAgent = async (req, res) => {
    try {
        const filtered = filterUpdates(req.body)
        console.log(filtered)
        console.log(req.params.id)
        const agent = await Agent.findByIdAndUpdate(
            { _id: req.params.id },
            filtered,
            { new: true, upsert: false })
        if (agent) {
            res.status(200).json(agent)
        }
        else {
            res.status(404).json(`Agent not found for id: ${req.params.id}`)
        }
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const deleteAgent = async (req, res) => {
    try {
        // console.log(req.params.id)
        const agent = await Agent.findByIdAndDelete(req.params.id)
        // console.log("agent: ", agent)
        if (agent) {
            res.status(200).json(agent)
        }
        else {
            res.status(404).json(`Agent not found for id: ${req.params.id}`)
        }
    } catch (err) {
        if (err.kind === 'ObjectId' && err.name === 'CastError') {
            const msg = `'${req.params.id}' is not an ID. It must be a string of 12 bytes or 24 hex characters or an integer.`
            res.status(500).json(msg)
        } else {
            res.status(500).json(err)
        }
    }
}

module.exports = { createAgent, getAgents, getAgent, getAgentsByRegion, updateAgent, deleteAgent }