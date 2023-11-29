import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

export default function Registration({ logIn }) {
    // Different email and password states for Login and Signup
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [loginSelected, setLoginSelected] = useState("selected");
    const [signupSelected, setSignupSelected] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = {
            email: loginEmail,
            password: loginPassword
        }
        try {
            const response = await axios.post('/login', formData).then(response => response.data)
            logIn(response.token, response.id)
        } catch (error) {
            alert(error.response.data)
        }
    }

    const handleSignup = async (event) => {
        event.preventDefault()
        if (signupPassword !== confirmPassword) {
            alert('Passwords do not match!')
            setSignupPassword("")
            setConfirmPassword("")
            return
        }
        const formData = {
            email: signupEmail,
            password: signupPassword,
            name: name
        }
        try {
            await axios.post('/user', formData);
            alert(`Success! You've signed up for Good!`)
            const response = await axios.post('/login', formData).then(response => response.data)
            logIn(response.token, response.id)
        } catch (error) {
            alert(`It looks like there was an error: ${error}`)
            setSignupEmail("")
            setSignupPassword("")
            setConfirmPassword("")
            setName("")
        }
    }
    
    // Make sure we're at the root path whenever we view the registration screen
    if (window.location.pathname !== "/") {
        window.location.replace('/')
    }

    return(
        <div className="landing">
            <div className="registration">
                <h1>Welcome. Let's do some good.</h1>
                <div className="registration-form">
                    <div className="switch">
                        <button className={loginSelected === "selected" ? "active-switch" : "inactive-switch"} onClick={() => {
                            setLoginSelected("selected")
                            setSignupSelected("")
                        }}>Login</button>
                        <button className={signupSelected === "selected" ? "active-switch" : "inactive-switch"} onClick={() => {
                            setSignupSelected("selected")
                            setLoginSelected("")
                        }}>Signup</button>
                    </div>
                    <form className={`login-form ${loginSelected}`} onSubmit={handleLogin}>
                        <label>
                            Email <input name="email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                        </label>
                        <label>
                            Password <input name="password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        </label>
                        <button type="submit" className="form-button">Log in</button>
                    </form>
                    <form className={`signup-form ${signupSelected}`} onSubmit={handleSignup}>
                        <label>
                            Email <input name="email" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                        </label>
                        <label>
                            Password <input name="password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
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
            </div>
            <div class="learn-more">
                <h2>What is Good?</h2>
                <div className="main-text">
                    <p>Good builds a more sustainable future by:</p>
                    <ul>
                        <li>Connecting people with their local communities</li>
                        <li>Helping people share goods and services</li>
                    </ul>
                    <p>Local communities include neighboorhoods, apartment buildings, and even dorms. Imagine, you bought too many oranges, and they're about to go bad. Good helps you easily share them with your friends or neighbors, reducing food waste. That's only one example of how Good is promoting a more sustainable future.</p>
                </div>
                <img src="logo1.0.png" alt="Good logo, which depicts a sprout emerging from a boot." className="landing-logo"/>
            </div>
        </div>
    )
}