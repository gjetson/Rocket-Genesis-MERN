import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Agent = (props) => (
    <tr>
        <td>{props.agent.first_name}</td>
        <td>{props.agent.last_name}</td>
        <td>{props.agent.email}</td>
        <td>{props.agent.region}</td>
        <td>{props.agent.rating}</td>
        <td>{props.agent.fee}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.agent._id}`}>Edit</Link>
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteAgent(props.agent._id)
                }}
            >
                Delete
            </button>
        </td>
    </tr>
)

export default function AgentList() {
    const [agents, setAgents] = useState([])

    useEffect(() => {
        async function getAgents() {
            const response = await fetch(`http://localhost:3004/agents/`)

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`
                window.alert(message)
                return
            }

            const data = await response.json()
            setAgents(data)
        }

        getAgents()

        return
    }, [agents.length])

    async function deleteAgent(id) {
        await fetch(`http://localhost:3004/agent/delete/${id}`, {
            method: "DELETE"
        })

        const newAgents = agents.filter((el) => el._id !== id)
        setAgents(newAgents)
    }

    function agentList() {
        return agents.map((agent) => {
            return (
                <Agent
                    agent={agent}
                    deleteAgent={() => deleteAgent(agent._id)}
                    key={agent._id}
                />
            )
        })
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3>Agent List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Region</th>
                        <th>Rating</th>
                        <th>Fee</th>
                        <th><Link className="btn btn-link" to={`/create`}>Create Agent</Link></th>
                    </tr>
                </thead>
                <tbody>{agentList()}</tbody>
            </table>
        </div>
    )
}