import React from 'react';
import logo from '../example-group.jpg';

export default function Groups() {
    return(
        <div>
            <h1>Groups</h1>
            {/* If there are no groups */}
            {/* <div className="groups-empty">
                <button>+</button>
                <p>Create or join a group.</p>
            </div> */}
            {/* If there are groups, display them */}
            <div class="group-container">
                <Group
                    name="Freret St Neighborhood"
                    location="New Orleans, LA"
                    purpose="Sharing goods and services"
                    img={logo}
                />
                <Group
                    name="Freret St Neighborhood"
                    location="New Orleans, LA"
                    purpose="Sharing goods and services"
                    img={logo}
                />
                <Group
                    name="Freret St Neighborhood"
                    location="New Orleans, LA"
                    purpose="Sharing goods and services"
                    img={logo}
                />
            </div>
        </div>
    )
}

function Group({name, location, purpose, img, ...props}) {
    return(
        <div className="group-card" {...props}>
            {/* Users must upload a square image */}
            {/* Or the image must at least be suqare (1:1) when it's retrieved from the db */}
            <div className="circle-mask">
                <img src={img} alt="Group"/>
            </div>
            <div className="text-column">
                <h2>{name}</h2>
                <div className="center">
                    <p>{location}</p>
                    <p>{purpose}</p>
                </div>
                <button>Ask to join</button>
            </div>
        </div>
    )
}
