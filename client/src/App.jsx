import { Router, Route, Switch, Redirect } from 'react-router-dom'

import { Nav, PrivateRoute } from '_components'
import { history } from '_helpers'
// import { Home } from 'home'
// import { Login } from 'login'
import AgentList from "./_components/AgentList"
import Create from "./_components/Create"
import Edit from "./_components/Edit"
import Login from "./_components/Login"
import Register from "./_components/Register"

export { App }

function App() {
    return (
        <div className="app-container bg-light">
            <Router history={history}>
                <Nav />
                <div className="container pt-4 pb-4">
                    <Switch>
                        <PrivateRoute exact path="/edit/:id" component={Edit} />
                        <PrivateRoute exact path="/create" component={Create} />
                        <PrivateRoute exact path="/" component={AgentList} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
