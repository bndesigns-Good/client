import React from 'react';
import './components.css';

export default function Profile() {
    return(
        <div>
            <h1>Profile</h1>
            <div className="profile-top-section">
                <div className="member-image" />
                <div className="profile-info">
                    <div className="info-header">
                        <h2>Brennan</h2>
                        <button className="form-button">Edit</button>
                    </div>
                    <p className="pronouns">he/him</p>
                    <p>Member since 2023</p>
                    <p>Hi! I'm Brennan, and I love being outside and helping people with their problems. You can find me in my garden, chilling on my porch, or hanging out with friends. I look forward to being an active part of this community!</p>
                </div>
            </div>
        </div>
    )
}