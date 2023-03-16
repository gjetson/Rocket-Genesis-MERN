import { useSetRecoilState } from 'recoil'

import { history, useFetchWrapper } from '_helpers'
import { authAtom, usersAtom } from '_state'

export { useUserActions }

function useUserActions() {
    const fetchWrapper = useFetchWrapper()
    const setAuth = useSetRecoilState(authAtom)
    const setUsers = useSetRecoilState(usersAtom)

    function login(username, password) {
        const url = `http://localhost:3004/user/authenticate`
        console.log('URL: ', url)
        return fetchWrapper.post(url, { username, password })
            .then(user => {
                const usr =
                    console.log('user: ', user)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user))
                setAuth(JSON.stringify(user))

                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } }
                history.push(from)
                return user
            })
    }

    function logout() {
        // remove user from local storage, set auth state to null and redirect to login page
        localStorage.removeItem('user')
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
        logout,
        getAll
    }
}
