const AgentController = require('../features/agent/agent-controller')
const { isAuth } = require('../utils/auth')

const registerAgentRoutes = (app) => {
    app.post('/agent-create', isAuth, AgentController.createAgent)
    app.get('/agents', isAuth, AgentController.getAgents)
    app.get('/agent/:id', isAuth, AgentController.getAgent)
    app.get('/agents-by-region', isAuth, AgentController.getAgentsByRegion)
    app.patch('/agents-update-info/:id', isAuth, AgentController.updateAgents)
    app.delete('/agent-delete/:id', isAuth, AgentController.deleteAgent)
}

module.exports = { registerAgentRoutes }