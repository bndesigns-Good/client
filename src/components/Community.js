import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

import { Link } from 'react-router-dom';

export default function Community() {
    const [offerings, setOfferings] = useState([]);
    const [formClass, setFormClass] = useState("hide");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [offeree, setOfferee] = useState("");

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

    const handleSubmit = async (event) => {
        // event.preventDefault();
        const formData = {
            title: title,
            category: category,
            price: price,
            offeree: offeree
        };
        try {
            await axios.post('/offerings', formData);
            alert(`Success! You should see your new offering when you close this window.`)
        } catch (error) {
            alert(`It looks like there was an error: ${error}`)
        }
        setTitle("");
        setCategory("");
        setPrice(0);
        setOfferee("");
        setFormClass("hide");
    }

    const deleteOffer = async (id) => {
        try {
            const response = await axios.delete(`/offerings/${id}`);
            console.log(response);
            alert(`Success! Your offering should be gone when you refresh the page.`)
        } catch (error) {
            alert(`It looks like there was an error: ${error}`)
        }
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
                            <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="" disabled>Please select a category</option>
                                <option value="service">Service</option>
                                <option value="assist">Assist</option>
                                <option value="good">Good</option>
                                <option value="tool">Tool</option>
                            </select>
                        </label>
                        <label>
                            Price <input name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </label>
                        <label>
                            Offeree <input name="offeree" value={offeree} onChange={(e) => setOfferee(e.target.value)}/>
                        </label>
                        <button type="submit" className="form-button">Submit</button>
                    </form>
                    <div className="offerings-container">
                        {offerings.map(offer => (
                            <Offering key={offer.id} dbid={offer.id} title={offer.title} category={offer.category} price={offer.price} offeree={offer.offeree} deleteOffer={deleteOffer}/>
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

function Offering({dbid, title, category, price, offeree, deleteOffer, ...props}) {
    return(
        <div id={`offering-${dbid}`} className={`offering-card ${category}`} {...props}>
            <div className="offering-row">
                <h3 className="offering-title">{title}</h3>
                <p>{price}</p>
            </div>
            <div className="offering-row">
                <Link to="/profile" className="offeree">{offeree}</Link>
                <button>Request</button>
                <button onClick={() => deleteOffer(dbid)}>Delete</button>
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
