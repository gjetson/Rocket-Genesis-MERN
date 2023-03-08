const AgentController = require('../features/agent/agent-controller')
const { isAuth } = require('../utils/auth')

const registerAgentRoutes = (app) => {
    app.post('/agent', isAuth, AgentController.createAgent)
    app.get('/agents', isAuth, AgentController.getAgents)
    app.get('/agent/:id', isAuth, AgentController.getAgent)
    app.get('/agents/:region', isAuth, AgentController.getAgentsByRegion)
    app.post('/agent/update/:id', isAuth, AgentController.updateAgent)
    app.delete('/agent/delete/:id', isAuth, AgentController.deleteAgent)
}

module.exports = { registerAgentRoutes }