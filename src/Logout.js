import { useState } from 'react';
import cookies from 'react-cookies'
import { Redirect } from 'react-router-dom';

export default function Logout() {
    const [isLogout, setLogout] = useState(false)

    if (cookies.load("user") != null) {
        cookies.remove("user")
        cookies.remove("access_token")
        setLogout(true)
    }

    if(isLogout)
        return <Redirect to="/" />
}