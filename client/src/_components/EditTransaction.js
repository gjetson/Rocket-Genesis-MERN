import React, { useState, useEffect } from "react"
import { useParams } from "react-router"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import Confirm from './Confirm'
import { getCookie } from 'react-use-cookie'
import { useUserActions } from '_actions'

export default function EditTransaction({ history }) {
    const userActions = useUserActions()
    const [form, setForm] = useState({
        description: "",
        sale: "",
        fee: "",
        region: "",
        transactions: [],
    })
    const params = useParams()

    useEffect(() => {
        async function authSession() {
            const sesh = getCookie('token')
            if (sesh === '0') {
                console.log('Edit sesh: ', sesh)
                history.push('/login')
                return
            }
            const valid = await userActions.authSession(sesh)
            console.log('Edit auth: ', valid)
            if (!valid) {
                history.push('/login')
            }
        }
        authSession()
        return
    }, [params.id])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:3004/transaction/${params.id}`)
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`
                window.alert(message)
            }
            const agent = await response.json()
            if (!agent) {
                console.error(`Transaction with id ${params.id} not found`)
            }
            setForm(agent)
            return
        }
        fetchData()
        return
    }, [params.id])

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value }
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Confirm msg={'update'} onClose={onClose} onConfirm={() => { editTransaction(); onClose() }} />
                )
            }
        })
    }


    const editTransaction = async () => {
        const editedTransaction = {
            description: form.description,
            sale: form.sale,
            fee: form.fee,
            region: form.region
        }
        console.log(editedTransaction)
        try {
            const valid = await fetch(`http://localhost:3004/transaction/update/${params.id}`, {
                method: "POST",
                body: JSON.stringify(editedTransaction),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (valid) {
                if (valid.status === 201) {
                    toast.success('Transaction updated.', {
                        onClose: () => {
                            history.push('/transactions')
                        }
                    })
                }
                // else if (valid.status === 401) {
                //     toast.error(`Email: ${editedAgent.email} is NOT unique! Please enter a unique email.`, {
                //         onClose: () => {
                //             editedAgent.email = ''
                //             setForm(editedAgent)
                //         }
                //     })
                // }
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div>
            <h3>Update Transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={form.description}
                        onChange={(e) => updateForm({ description: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sale">Sale: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="sale"
                        value={form.sale}
                        onChange={(e) => updateForm({ sale: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fee">Fee: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="fee"
                        value={form.fee}
                        onChange={(e) => updateForm({ fee: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="regionNorth"
                            value="north"
                            checked={form.region === "north"}
                            onChange={(e) => updateForm({ region: e.target.value })}
                        />
                        <label htmlFor="regionNorth" className="form-check-label">North</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="regionSouth"
                            value="south"
                            checked={form.region === "south"}
                            onChange={(e) => updateForm({ region: e.target.value })}
                        />
                        <label htmlFor="regionSouth" className="form-check-label">South</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="regionEast"
                            value="east"
                            checked={form.region === "east"}
                            onChange={(e) => updateForm({ region: e.target.value })}
                        />
                        <label htmlFor="regionEast" className="form-check-label">East</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="regionWest"
                            value="west"
                            checked={form.region === "west"}
                            onChange={(e) => updateForm({ region: e.target.value })}
                        />
                        <label htmlFor="regionWest" className="form-check-label">West</label>
                    </div>
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Agent"
                        className="btn btn-primary"
                    />
                </div>
            </form>
            <ToastContainer
                position="top-center"
                theme="colored"
            />
        </div>
    )
}