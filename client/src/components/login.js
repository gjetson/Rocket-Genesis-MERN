import '../css/App.css'

import React, { useRef } from "react"
import { useNavigate } from "react-router"

export default function (props) {
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        //alert(`${email} ${password}`)
        login({
            email: email,
            password: password
        })
    }

    const login = async (body) => {
        try {
            const valid = await fetch("http://localhost:3004/user/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            console.log(valid)
            if (valid.status === 201) {
                console.log('logged in')
                // set auth token
                navigate("/")
            } else {
                console.log('no bueno')
                navigate("/login")
            }
        } catch (error) {
            console.error(error)
            window.alert(error)
        }
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Not registered yet? <a href="/register">Sign Up</a>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            id='email'
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            required
                            ref={emailRef}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            required
                            ref={passwordRef}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="/">password?</a>
                    </p>
                </div>
            </form>
        </div>
    )

}