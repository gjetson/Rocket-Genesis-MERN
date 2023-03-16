const HealthController = require('../controllers/health/health.controller')

const registerHealthRoutes = (app) => {
  app.get('/hello', HealthController.helloWorld)
}

module.exports = { registerHealthRoutes }