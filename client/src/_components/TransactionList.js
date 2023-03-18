import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import Confirm from './Confirm'
import { getCookie } from 'react-use-cookie'
import { useUserActions } from '_actions'

const Transaction = (props) => (
    <tr>
        <td>{props.transaction.description}</td>
        <td>{props.transaction.sale}</td>
        <td>{props.transaction.fee}</td>
        <td>{props.transaction.region}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/transaction/${props.transaction._id}`}>Edit</Link>
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteTransaction(props.transaction._id)
                }}
            >
                Delete
            </button>
        </td>
    </tr>
)

export default function Transactionist({ history }) {
    const [transactions, setTransactions] = useState([])
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
        async function getTransactions() {
            try {
                const response = await fetch(`http://localhost:3004/transactions/`)
                if (!response.ok) {
                    throw new Error(`An error occurred: ${response.statusText}`)
                }
                const data = await response.json()
                setTransactions(data)
            } catch (err) {
                console.error(err)
            }
        }
        getTransactions()
        return
    }, [transactions.length])


    const confirmDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Confirm msg={'delete'} onClose={onClose} onConfirm={() => { deleteTransaction(id); onClose() }} />
                )
            }
        })
    }

    async function deleteTransaction(id) {
        try {
            const valid = await fetch(`http://localhost:3004/transaction/delete/${id}`, {
                method: "DELETE"
            })
            if (valid && valid.status === 200) {
                toast.success('Transaction deleted.', {
                    onClose: () => {
                        const filtered = transactions.filter((el) => el._id !== id)
                        setTransactions(filtered)
                    }
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    function transactionList() {
        return transactions.map((transaction) => {
            return (
                <Transaction
                    transaction={transaction}
                    deleteTransaction={() => confirmDelete(transaction._id)}
                    key={transaction._id}
                />
            )
        })
    }

    return (
        <div>
            <h3>Transaction List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Sale</th>
                        <th>Fee</th>
                        <th>Region</th>
                        <th><Link className="btn btn-link" to={`/create/transaction`}>Create Transaction</Link></th>
                    </tr>
                </thead>
                <tbody>{transactionList()}</tbody>
            </table>
            <ToastContainer
                position="top-center"
                theme="colored"
            />
        </div>
    )
}