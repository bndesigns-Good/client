import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './components.css';

export default function Login({ logIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            email: email,
            password: password
        }
        try {
            const response = await axios.post('/login', formData).then(response => response.data)
            logIn(response.token, response.id)
        } catch (error) {
            alert(error.response.data)
        }
    }

    return(
        <div>
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    Email <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit" className="form-button">Log in</button>
            </form>
        </div>
    )
}

Login.propTypes = {
    logIn: PropTypes.func.isRequired,
    setCurrentUserId: PropTypes.func.isRequired
}