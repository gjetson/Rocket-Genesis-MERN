const Agent = require('../../shared/db/models/agent-model')


const filterUpdates = (json) => {
    const result = {}
    for (let key in json) {
        if (key === 'first_name') {
            result[key] = json[key]
        }
        if (key === 'last_name') {
            result[key] = json[key]
        }
        if (key === 'email') {
            result[key] = json[key]
        }
        if (key === 'region') {
            result[key] = json[key]
        }
    }
    // console.log(result)
    return result
}

const getTotalSales = async (region) => {
    try {
        const match = [
            { $match: { region: region } },
            { $group: { _id: "$region", sum: { $sum: "$sales" } } }
        ]
        const total = await Agent.aggregate(match)
        // console.log('sum: ', sum)
        if (total.length > 0) {
            return total[0].sum
        }
        return 0
    } catch (err) {
        console.error(err)
    }
}

const getTopAgents = async (region) => {
    try {
        const top_agents = await Agent.find({ region: region }).sort({ sales: -1 }).limit(3)
        // console.log('agents: ', top_agents)
        return top_agents
    } catch (err) {
        console.error(err)
    }
}

const getTopAgentIds = async (region) => {
    try {
        const top_agents = await getTopAgents(region)
        let top_agent_ids = []
        top_agents.forEach(e => {
            top_agent_ids.push(e._id)
        })
        return top_agent_ids
    } catch (err) {
        console.error(err)
    }
}


module.exports = { filterUpdates, getTotalSales, getTopAgents, getTopAgentIds }