import React from 'react';

export default function Community() {
    return(
        <div>
            <h1>Community</h1>
            <div className="community-content">
                <div id="offerings" className="community-column">
                    <h2>Offerings (lol)</h2>
                    <div className="offerings-container">
                        <Offering title="Lawn care" price="$" offeree="Brennan"/>
                        <Offering title="Lawn care" price="$" offeree="Brennan"/>
                        <Offering title="Lawn care" price="$" offeree="Brennan"/>
                    </div>
                </div>
                <div id="members">
                    <h2>Members</h2>
                </div>
            </div>
        </div>
    )
}

function Offering({title, price, offeree, ...props}) {
    return(
        <div className="offering-card" {...props}>
            <div className="offering-row">
                <h3>{title}</h3>
                <p>{price}</p>
            </div>
            <div className="offering-row">
                <p>{offeree}</p>
                <button>Request</button>
            </div>
        </div>
    )
}
