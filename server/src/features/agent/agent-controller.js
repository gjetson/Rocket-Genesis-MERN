const Agent = require('../../shared/db/models/agent-model')
const { filterUpdates } = require('./utils')

const createAgent = async (req, res) => {
    try {
        const agent = await Agent.create(req.body)
        res.status(201).json({ data: agent })
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getAgents = async (req, res) => {
    try {
        const agents = await Agent.find({}).sort({ last_name: 1 })
        res.status(200).json(agents)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getAgent = async (req, res) => {
    try {
        const agents = await Agent.findById(req.params.id).sort({ last_name: 1 })
        res.status(200).json(agents)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getAgentsByRegion = async (req, res) => {
    try {
        const agents = await Agent.find({ region: req.query.region }).sort({ rating: 1 })
        res.status(200).json({ data: agents })
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const updateAgents = async (req, res) => {
    try {
        const filtered = filterUpdates(req.body)
        console.log(req.params.id)
        const agent = await Agent.findByIdAndUpdate(
            { _id: req.params.id },
            filtered,
            { new: true, upsert: false })
        if (agent) {
            res.status(200).json({ data: agent })
        }
        else {
            res.status(404).json({ err: `Agent not found for id: ${req.params.id}` })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const deleteAgent = async (req, res) => {
    try {
        // console.log(req.params.id)
        const agent = await Agent.findByIdAndDelete(req.params.id)
        // console.log("agent: ", agent)
        if (agent) {
            res.status(200).json({ data: agent })
        }
        else {
            res.status(404).json({ err: `Agent not found for id: ${req.params.id}` })
        }
    } catch (err) {
        if (err.kind === 'ObjectId' && err.name === 'CastError') {
            const msg = `'${req.params.id}' is not an ID. It must be a string of 12 bytes or 24 hex characters or an integer.`
            res.status(500).send({ error: msg })
        } else {
            res.status(500).send({ error: err })
        }
    }
}

module.exports = { createAgent, getAgents, getAgent, getAgentsByRegion, updateAgents, deleteAgent }