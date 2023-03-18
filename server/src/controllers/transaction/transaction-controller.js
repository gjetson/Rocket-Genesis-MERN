const Transaction = require('../../shared/db/models/transaction-model')

const create = async (req, res) => {
    try {
        const trn = await Transaction.create(req.body)
        res.status(201).json(trn)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const getAll = async (req, res) => {
    try {
        const trn = await Transaction.find({}).sort({ last_name: 1 })
        console.log(trn)
        res.status(200).json(trn)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getById = async (req, res) => {
    try {
        const trn = await Transaction.findById(req.params.id)
        res.status(200).json(trn)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getByAgentId = async (req, res) => {
    try {
        const trn = await Transaction.find({ agent: req.params.id })
        res.status(200).json(trn)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const updateById = async (req, res) => {
    try {
        console.log(req.params.id)
        const trn = await Transaction.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, upsert: false })
        if (trn) {
            res.status(201).json(trn)
        }
        else {
            res.status(404).json({ err: `Transaction not found for id: ${req.params.id}` })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const deleteById = async (req, res) => {
    try {
        // console.log(req.params.id)
        const trn = await Transaction.findByIdAndDelete(req.params.id)
        // console.log("agent: ", agent)
        if (trn) {
            res.status(200).json(trn)
        }
        else {
            res.status(404).json({ err: `Transaction not found for id: ${req.params.id}` })
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

module.exports = { create, getAll, getById, getByAgentId, updateById, deleteById }