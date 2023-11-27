import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const t = localStorage.getItem('token')
        return t
    }

    const getCurrentUserId = () => {
        const id = localStorage.getItem('currentUserId')
        return Number(id)
    }

    const [token, setToken] = useState(getToken())
    const [currentUserId, setCurrentUserId] = useState(getCurrentUserId())

    const saveToken = (t, id) => {
        localStorage.setItem('token', t)
        localStorage.setItem('currentUserId', id)
        setToken(t)
        setCurrentUserId(id)
    }

    const removeToken = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('currentUserId')
        setToken()
        setCurrentUserId()
    }

    return {
        token,
        currentUserId,
        logIn: saveToken,
        logOut: removeToken
    }
}