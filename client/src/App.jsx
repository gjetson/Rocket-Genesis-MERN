import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Nav, PrivateRoute } from '_components'
import { history } from '_helpers'
import AgentList from "./_components/AgentList"
import TransactionList from '_components/TransactionList'
import CreateAgent from "./_components/CreateAgent"
import EditAgent from "./_components/EditAgent"
import EditTransaction from '_components/EditTransaction'
import CreateTransaction from '_components/CreateTransaction'
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
                        <PrivateRoute exact path="/edit/agent/:id" component={EditAgent} />
                        <PrivateRoute exact path="/create/agent" component={CreateAgent} />
                        <PrivateRoute exact path="/agents" component={AgentList} />
                        <PrivateRoute exact path="/edit/transaction/:id" component={EditTransaction} />
                        <PrivateRoute exact path="/create/transaction" component={CreateTransaction} />
                        <PrivateRoute exact path="/transactions" component={TransactionList} />
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
