import React, { useEffect, useState } from "react"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCookie } from 'react-use-cookie'
import { useUserActions } from '_actions'


const transactionForm = { description: "", sale: "", fee: "", region: "north" }

export default function CreateAgent({ history }) {
    const userActions = useUserActions()
    const [form, setForm] = useState(transactionForm)

    useEffect(() => {
        // redirect to login if already logged in
        async function authSession() {
            const sesh = getCookie('token')
            if (sesh === '0') {
                console.log('Create sesh: ', sesh)
                history.push('/login')
                return
            }
            const valid = await userActions.authSession(sesh)
            console.log('Create auth: ', valid)
            if (!valid) {
                history.push('/login')
            }
        }
        authSession()
    }, [])

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value }
        })
    }
    async function onSubmit(e) {
        e.preventDefault()
        const newTransaction = { ...form }
        try {
            const valid = await fetch("http://localhost:3004/transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTransaction),
            })
            console.log(valid.status)
            // if (valid && valid.status === 401) {
            //     toast.error(`Email: '${newAgent.email}' is NOT unique! Cannot create agent with that email. Try again.`, {
            //         onClose: () => {
            //             newAgent.email = ''
            //             setForm(newAgent)
            //         }
            //     })
            // } else 
            if (valid && valid.status === 201) {
                toast.success(`Transaction created.`, {
                    onClose: () => {
                        setForm(transactionForm)
                        history.push('/transactions')
                    }
                })
            }
        } catch (error) {
            console.error(error)
            window.alert(error)
            return
        }
    }
    return (
        <div>
            <h3>Create New Transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={form.description}
                        onChange={(e) => updateForm({ description: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sale">Sale</label>
                    <input
                        type="text"
                        className="form-control"
                        id="sale"
                        value={form.sale}
                        onChange={(e) => updateForm({ sale: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fee">Fee</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fee"
                        value={form.fee}
                        onChange={(e) => updateForm({ fee: e.target.value })}
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
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create agent"
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