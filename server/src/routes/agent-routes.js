const AgentController = require('../controllers/agent/agent-controller')

const registerAgentRoutes = (app) => {
    app.post('/agent', AgentController.createAgent)
    app.get('/agents', AgentController.getAgents)
    app.get('/agent/:id', AgentController.getAgent)
    app.get('/agents/:region', AgentController.getAgentsByRegion)
    app.post('/agent/update/:id', AgentController.updateAgent)
    app.delete('/agent/delete/:id', AgentController.deleteAgent)
}

module.exports = { registerAgentRoutes }