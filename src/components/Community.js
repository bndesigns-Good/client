import React from 'react';

import { Link } from 'react-router-dom';

export default function Community() {
    return(
        <div>
            <h1>Community</h1>
            <div className="community-content">
                <div id="offerings" className="community-column">
                    <h2 className="column-title">Offerings</h2>
                    <p>See all that your community has to offer! Offerings fall under four categories: services, assists, goods, and tools.</p>
                    <div className="offerings-container">
                        <Offering title="Lawn care" category="service" price="Free!" offeree="Brennan" />
                        <Offering title="Lending lawn equipment" category="tool" price="Free!" offeree="Brennan" />
                        <Offering title="Spare lettuce" category="good" price="Free!" offeree="Brennan" />
                        <Offering title="Hang out and paint" category="assist" price="Free!" offeree="Brennan" />
                        <Offering title="Lawn care" category="service" price="Free!" offeree="Brennan" />
                        <Offering title="Lending lawn equipment" category="tool" price="Free!" offeree="Brennan" />
                        <Offering title="Spare lettuce" category="good" price="Free!" offeree="Brennan" />
                        <Offering title="Hang out and paint" category="assist" price="Free!" offeree="Brennan" />
                        <Offering title="Lawn care" category="service" price="Free!" offeree="Brennan" />
                        <Offering title="Lending lawn equipment" category="tool" price="Free!" offeree="Brennan" />
                        <Offering title="Spare lettuce" category="good" price="Free!" offeree="Brennan" />
                        <Offering title="Hang out and paint" category="assist" price="Free!" offeree="Brennan" />
                    </div>
                </div>
                <div id="members" className="community-column">
                    <h2 className="column-title">Members</h2>
                    <Member name="Brennan" />
                    <Member name="Brennan" />
                    <Member name="Brennan" />
                </div>
            </div>
        </div>
    )
}

function Offering({title, category, price, offeree, ...props}) {
    return(
        <div className={`offering-card ${category}`} {...props}>
            <div className="offering-row">
                <h3 className="offering-title">{title}</h3>
                <p>{price}</p>
            </div>
            <div className="offering-row">
                <Link to="/profile" className="offeree">{offeree}</Link>
                <button>Request</button>
            </div>
        </div>
    )
}

function Member({name, img, ...props}) {
    return(
        <div className="member-mini">
            <div className="member-image"/>
            <Link to="/profile">{name}</Link>
        </div>
    )
}
