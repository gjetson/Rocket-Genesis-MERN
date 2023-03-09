import '../css/App.css'

import React, { useState, useRef } from "react"

export default function (props) {
    let [authMode, setAuthMode] = useState("signin")

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()


        if (authMode === "signin") {
            const email = emailRef.current.value
            const password = passwordRef.current.value
            alert(`${email} ${password}`)
        } else {
            const firstName = firstNameRef.current.value
            const lastName = lastNameRef.current.value
            const email = emailRef.current.value
            const password = passwordRef.current.value
            alert(`${firstName} ${lastName} ${email} ${password}`)
        }
    }

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
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
    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Jane"
                            required
                            ref={firstNameRef}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Doe"
                            required
                            ref={lastNameRef}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            id='email'
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            required
                            ref={emailRef}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <input
                            id='password'
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
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