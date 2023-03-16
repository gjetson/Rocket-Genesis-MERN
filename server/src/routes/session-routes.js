const SessionController = require('../controllers/session/session-controller')

const registerSessionRoutes = (app) => {
    app.post('/session', SessionController.createSession)
    app.get('/sessions', SessionController.getSessions)
    app.get('/session/:id', SessionController.getSession)
    app.post('/session/authenticate/:token', SessionController.authenticateSession)
    app.delete('/session/delete/:id', SessionController.deleteSession)
}

module.exports = { registerSessionRoutes }