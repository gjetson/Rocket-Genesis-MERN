const Controller = require('../controllers/transaction/transaction-controller')

const registerTransactionRoutes = (app) => {
    app.post('/transaction', Controller.create)
    app.get('/transactions', Controller.getAll)
    app.get('/transaction/:id', Controller.getById)
    app.get('/transaction/agent/:id', Controller.getByAgentId)
    app.post('/transaction/update/:id', Controller.updateById)
    app.delete('/transaction/delete/:id', Controller.deleteById)
}

module.exports = { registerTransactionRoutes }