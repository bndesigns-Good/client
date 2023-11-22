import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

import { Link } from 'react-router-dom';

export default function Community() {
    const [offerings, setOfferings] = useState([]);
    const [formClass, setFormClass] = useState("hide");
    const [title, setTitle] = useState("");

    useEffect(() => {
        axios
        .get('/offerings')
        .then(res => res.data)
        .then(offerings => setOfferings(offerings));
    }, []);

    const showForm = (event) => {
        event.preventDefault();
        setFormClass("show");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The title you submitted is ${title}`)
        setTitle("");
        setFormClass("hide");
    }

    return(
        <div>
            <h1>Community</h1>
            <div className="community-content">
                <div id="offerings" className="community-column">
                    <h2 className="column-title">Offerings</h2>
                    <p className="column-description">See all that your community has to offer! Offerings fall under four categories: services, assists, goods, and tools.</p>
                    <button className="primary-button" onClick={showForm}>Create offer</button>
                    <form className={`create-offer-form ${formClass}`} onSubmit={handleSubmit}>
                        <label>
                            Title <input name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </label>
                        <label>
                            Category
                            <select name="category">
                                <option value="service">Service</option>
                                <option value="assist">Assist</option>
                                <option value="good">Good</option>
                                <option value="tool">Tool</option>
                            </select>
                        </label>
                        <label>
                            Price <input name="price" type="number" defaultValue={0}/>
                        </label>
                        <label>
                            Offeree <input name="offeree" />
                        </label>
                        <button type="submit" className="form-button">Submit</button>
                    </form>
                    <div className="offerings-container">
                        {offerings.map(offer => (
                            <Offering key={offer.id} title={offer.title} category={offer.category} price={offer.price} offeree={offer.offeree} />
                        ))}
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
