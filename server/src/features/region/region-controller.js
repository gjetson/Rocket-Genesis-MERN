const Region = require('../../shared/db/models/region-model')
const { getTotalSales, getTopAgentIds } = require('../agent/utils')

const createRegion = async (req, res) => {
    try {
        req.body.top_agents = await getTopAgentIds(req.body.region)
        req.body.total_sales = await getTotalSales(req.body.region)
        const region = await Region.create(req.body)
        res.status(201).json({ data: region })
    } catch (err) {
        if (err.code === 11000 && err.message.includes('duplicate key error')) {
            const msg = `Duplicate key error. You cannot have two documents where region = '${err.keyValue.region}'.`
            res.status(500).send({ error: msg })
        } else {
            console.error(err)
            res.status(500).send(err)
        }
    }
}

const getRegions = async (req, res) => {
    try {
        const regions = await Region.find({ region: req.params.region }).populate('top_agents').populate('manager')
        res.status(200).json({ data: regions })
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

const getAllStars = async (req, res) => {
    try {
        const regions = await Region.find({}).populate('top_agents')
        // console.log(regions)
        let stars = []
        regions.forEach((e) => {
            const obj = {
                region: e.region,
                top_agents: e.top_agents.sort((a, b) => (a.sales > b.sales) ? -1 : 1)[0]
            }
            stars.push(obj)
        })
        res.status(200).json(stars)
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}

// const getAllStars = async (req, res) => {
//     try {
//         const match = [
//             {
//                 $lookup: {
//                     from: 'agents',
//                     localField: 'top_agents',
//                     foreignField: '_id',
//                     as: 'topAgents'
//                 }
//             },
//             { $unwind: '$topAgents' },
//             {
//                 $project: {
//                     region: 1,
//                     topAgents: { sales: $max }
//                 }
//             }
//         ]
//         const region = await Region.find({ region: req.params.region }).populate('top_agents')
//         console.log(region)
//         const stars = region[0].top_agents.sort((a, b) => (a.sales > b.sales) ? -1 : 1)
//         res.status(200).json({ data: stars[0] })
//     } catch (err) {
//         console.error(err)
//         res.status(500).send({ error: err })
//     }
// }


module.exports = { createRegion, getRegions, getAllStars }