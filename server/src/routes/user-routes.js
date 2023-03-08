const UserController = require('../features/user/user-controller')
const { isAuth } = require('../utils/auth')

const registerUserRoutes = (app) => {
    app.post('/user', isAuth, UserController.createUser)
    app.get('/users', isAuth, UserController.getUsers)
    app.get('/user/:id', isAuth, UserController.getUser)
    app.post('/user/update/:id', isAuth, UserController.updateUser)
    app.delete('/user/delete/:id', isAuth, UserController.deleteUser)
}

module.exports = { registerUserRoutes }