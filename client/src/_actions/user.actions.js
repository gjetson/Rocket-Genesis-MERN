import { useSetRecoilState } from 'recoil'
import useCookie from 'react-use-cookie'

import { history, useFetchWrapper } from '_helpers'
import { authAtom, usersAtom } from '_state'

export { useUserActions }

function useUserActions() {
    const fetchWrapper = useFetchWrapper()
    const setAuth = useSetRecoilState(authAtom)
    const setUsers = useSetRecoilState(usersAtom)
    const [userToken, setUserToken] = useCookie('token', '0')

    function login(username, password) {
        const url = `http://localhost:3004/user/authenticate`
        console.log('URL: ', url)
        return fetchWrapper.post(url, { username, password })
            .then(sesh => {
                // console.log('session: ', sesh.token)
                localStorage.setItem('session', JSON.stringify(sesh))
                setAuth(JSON.stringify(sesh))
                setUserToken(sesh.token)
                // get return url from location state or default to home page
                // const { from } = history.location.state || { from: { pathname: '/' } }
                // history.push(from)
                return sesh
            })
    }

    const authSession = async (token) => {
        try {
            const res = await fetch(`http://localhost:3004/session/authenticate/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (res && res.ok) {
                return true
            }
            return false
        } catch (err) {
            console.error(err)
        }
    }

    function logout() {
        // remove user from local storage, set auth state to null and redirect to login page
        setUserToken('0')
        localStorage.removeItem('session')
        setAuth(null)
        history.push('/login')
    }

    const getAll = async () => {
        try {
            const url = 'http://localhost:3004/users'
            const users = await fetchWrapper.get(url)
            if (users) {
                setUsers(users)
            } else {
                console.error('users not found')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return {
        login,
        authSession,
        logout,
        getAll
    }
}
