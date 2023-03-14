import '../css/App.css'

import React, { useEffect, useRef } from "react"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { authAtom } from '_state'
import { useUserActions } from '_actions'
import { useRecoilValue } from 'recoil'

export default function Login({ history }) {
    const auth = useRecoilValue(authAtom)
    const userActions = useUserActions()

    const emailRef = useRef()
    const passwordRef = useRef()

    const clearForm = () => {
        emailRef.current.value = ''
        passwordRef.current.value = ''
    }

    useEffect(() => {
        // redirect to home if already logged in
        if (auth) history.push('/')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('submit')
        const username = emailRef.current.value
        const password = passwordRef.current.value
        try {
            const data = await userActions.login(username, password)
            console.log(data)
            history.push('/')
        } catch (err) {
            if (err === 'Unauthorized') {
                toast.error('Login NOT accepted. Try again.', { onClose: clearForm })
            } else {
                console.error(err)

            }
        }

        //alert(`${email} ${password}`)
        // login({
        //     email: email,
        //     password: password
        // })
    }

    // const login = async (body) => {
    //     try {
    //         const valid = await fetch("http://localhost:3004/user/verify", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(body),
    //         })
    //         console.log(valid)
    //         if (valid.status === 201) {
    //             console.log('logged in')
    //         } else {
    //             window.alert('Login NOT accepted. Try again.')
    //             navigate("/")
    //         }
    //     } catch (error) {
    //         console.error(error)
    //         window.alert(error)
    //     }
    // }

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
                </div>
            </form>
            <ToastContainer
                position="top-center"
                theme="colored"
            />
        </div>
    )
}