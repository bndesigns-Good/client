import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        axios.get('/users').then(response => console.log(response.data))
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!')
            setPassword("");
            setConfirmPassword("");
            return
        }
        const formData = {
            email: email,
            password: password,
            name: name
        }
        try {
            await axios.post('/user', formData);
            alert(`Success! You've signed up for Good!`)
        } catch (error) {
            alert(`It looks like there was an error: ${error}`)
        }
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        // Should probably refresh the page, so I probably don't have to clear the form data
    }

    return(
        <div>
            <h1>Signup</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label>
                    Email <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    Confirm password <input name="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <label>
                    Name <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <button type="submit" className="form-button">Sign up</button>
            </form>
        </div>
    )
}