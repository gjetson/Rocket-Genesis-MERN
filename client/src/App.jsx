import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Nav, PrivateRoute } from '_components'
import { history } from '_helpers'
import AgentList from "./_components/AgentList"
import Create from "./_components/Create"
import Edit from "./_components/Edit"
import Login from "./_components/Login"
import Register from "./_components/Register"
import Home from '_components/Home'

export { App }

function App() {
    return (
        <div className="app-container bg-light">
            <BrowserRouter history={history}>
                <Nav />
                <div className="container pt-4 pb-4">
                    <Switch>
                        <PrivateRoute exact path="/edit/:id" component={Edit} />
                        <PrivateRoute exact path="/create" component={Create} />
                        <PrivateRoute exact path="/agents" component={AgentList} />
                        <PrivateRoute exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}
