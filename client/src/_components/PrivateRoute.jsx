import { Route, Redirect } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import React, { useEffect, useState } from "react"
import useCookie, { getCookie } from 'react-use-cookie'
import { useUserActions } from '_actions'

import { authAtom } from '_state'

export { PrivateRoute }

function PrivateRoute({ component: Component, ...rest }) {
    const auth = useRecoilValue(authAtom)
    const userActions = useUserActions()
    //const [auth, setAuth] = useState(false)

    useEffect(() => {
        // redirect to home if already logged in
        async function authSession() {
            const sesh = getCookie('token')
            const valid = await userActions.authSession(sesh)
            console.log('private route auth: ', valid)
            // setAuth(valid)
        }
        authSession()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Route {...rest} render={props => {
            if (!auth) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // authorized so return component
            return <Component {...props} />
        }} />
    )
}