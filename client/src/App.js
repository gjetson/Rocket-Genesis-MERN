import React from "react"
import './css/App.css'

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom"

// We import all the components we need in our app
import Navbar from "./components/navbar"
import AgentList from "./components/agentList"
import Edit from "./components/edit"
import Create from "./components/create"
import Login from "./components/login"

const App = () => {
    return (
        <div className="app-container bg-light App">
            <Navbar />
            <div className="container pt-4 pb-4">
                <Routes>
                    <Route exact path="/" element={<AgentList />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </div >
    )
}

export default App