import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import Confirm from './Confirm'
import { getCookie } from 'react-use-cookie'
import { useUserActions } from '_actions'

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

export default function AgentList({ history }) {
    const [agents, setAgents] = useState([])
    const userActions = useUserActions()

    useEffect(() => {
        async function authSession() {
            const sesh = getCookie('token')
            if (sesh === '0') {
                console.log('Login sesh: ', sesh)
                history.push('/login')
                return
            }
            const valid = await userActions.authSession(sesh)
            console.log('AgentsList auth: ', valid)
            if (!valid) {
                history.push('/login')
            }
        }
        authSession()
    }, [])

    useEffect(() => {
        async function getAgents() {
            try {
                const response = await fetch(`http://localhost:3004/agents/`)
                if (!response.ok) {
                    throw new Error(`An error occurred: ${response.statusText}`)
                }
                const data = await response.json()
                setAgents(data)
            } catch (err) {
                console.error(err)
            }
        }
        getAgents()
        return
    }, [agents.length])


    const confirmDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Confirm msg={'delete'} onClose={onClose} onConfirm={() => { deleteAgent(id); onClose() }} />
                )
            }
        })
    }

    async function deleteAgent(id) {
        try {
            const valid = await fetch(`http://localhost:3004/agent/delete/${id}`, {
                method: "DELETE"
            })
            if (valid && valid.status === 200) {
                toast.success('User deleted.', {
                    onClose: () => {
                        const newAgents = agents.filter((el) => el._id !== id)
                        setAgents(newAgents)
                    }
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    function agentList() {
        return agents.map((agent) => {
            return (
                <Agent
                    agent={agent}
                    deleteAgent={() => confirmDelete(agent._id)}
                    key={agent._id}
                />
            )
        })
    }

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
            <ToastContainer
                position="top-center"
                theme="colored"
            />
        </div>
    )
}