const UserController = require('../controllers/user/user-controller')

const registerUserRoutes = (app) => {
    app.post('/user', UserController.createUser)
    app.get('/users', UserController.getUsers)
    app.get('/user/:id', UserController.getUser)
    app.post('/user/update/:id', UserController.updateUser)
    app.post('/user/authenticate', UserController.authenticateUser)
    app.delete('/user/delete/:id', UserController.deleteUser)
}

module.exports = { registerUserRoutes }

