import { useRecoilState } from 'recoil'

import { history } from '_helpers'
import { authAtom } from '_state'

export { useFetchWrapper }

function useFetchWrapper() {
    const [auth, setAuth] = useRecoilState(authAtom)

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    }

    function request(method) {
        return (url, body) => {
            console.log(`${url} ${method} ${body}`)
            const requestOptions = {
                method,
                //headers: authHeader(url)
                headers: { authorization: 'rocket' }
            }
            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json'
                requestOptions.body = JSON.stringify(body)
            }
            return fetch(url, requestOptions).then(handleResponse)
        }
    }

    // function authHeader(url) {
    //     // return auth header with jwt if user is logged in and request is to the api url
    //     const token = auth?.token
    //     const isLoggedIn = !!token
    //     const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL)
    //     if (isLoggedIn && isApiUrl) {
    //         return { Authorization: `Bearer ${token}` }
    //     } else {
    //         return {}
    //     }
    // }

    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text)
            console.log('data: ', response.status)
            if (!response.ok) {
                if ([401, 403].includes(response.status) && auth?.token) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('user')
                    setAuth(null)
                    history.push('/login')
                }
                const error = (data && data.message) || response.statusText
                return Promise.reject(error)
            }
            return data
        })
    }
}
