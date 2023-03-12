import React, { useState } from "react"

const agentForm = { first_name: "", last_name: "", email: "", region: "", rating: "", fee: "", sales: "" }

export default function Create({ history }) {
    const [form, setForm] = useState(agentForm)

    // update state properties
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value }
        })
    }

    // handle submission
    async function onSubmit(e) {
        e.preventDefault()

        // insert new agent
        const newAgent = { ...form }
        try {
            await fetch("http://localhost:3004/agent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAgent),
            })
        } catch (error) {
            console.error(error)
            window.alert(error)
            return
        }

        setForm(agentForm)
        history.push('/')
    }

    return (
        <div>
            <h3>Create New Agent</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        value={form.first_name}
                        onChange={(e) => updateForm({ first_name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        value={form.last_name}
                        onChange={(e) => updateForm({ last_name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
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
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rating"
                            value={form.rating}
                            onChange={(e) => updateForm({ rating: e.target.value })}
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
                        <label htmlFor="sales">Sales</label>
                        <input
                            type="text"
                            className="form-control"
                            id="sales"
                            value={form.sales}
                            onChange={(e) => updateForm({ sales: e.target.value })}
                        />
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
        </div>
    )
}