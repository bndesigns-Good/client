import React, { useState } from 'react';
import './components.css';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
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
            confirmPassword: confirmPassword,
            name: name
        }
        alert(`Email: ${formData.email}, password: ${formData.password}, name: ${formData.name}`);
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
                <button type="submit" class="form-button">Sign up</button>
            </form>
        </div>
    )
}