import '../css/App.css'

import React, { useEffect, useRef } from "react"
import { authAtom } from '_state'
import { useRecoilValue } from 'recoil'

export default function Register({ history }) {
    const auth = useRecoilValue(authAtom)

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        // redirect to home if already logged in
        if (auth) history.push('/')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        register({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        })
    }

    const register = async (body) => {
        try {
            const valid = await fetch("http://localhost:3004/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            if (valid.status === 401) {
                window.alert(`Email: '${emailRef.current.value}' is NOT unique! Cannot create user. Try again.`)
                firstNameRef.current.value = ''
                lastNameRef.current.value = ''
                emailRef.current.value = ''
                passwordRef.current.value = ''
            } else if (valid.status === 201) {
                window.alert(`User created. Please login.`)
                history.push('/login')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        Already registered? <a href="/login">Sign In</a>
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
                </div>
            </form>
        </div>
    )
}