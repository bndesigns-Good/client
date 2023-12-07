import React, { useState, useEffect } from 'react';
import '../css/index.css';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

// Resulable components
import { CommunityOffer } from '../reusable/Offer';
import Member from '../reusable/Member';

export default function Community({ currentUserId }) {
    const [offersLoaded, setOffersLoaded] = useState(false);
    const [offers, setOffers] = useState([]);
    const [offerUserPairs, setOfferUserPairs] = useState([]);
    const [users, setUsers] = useState([]);
    const [formClass, setFormClass] = useState("hide");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    useEffect(() => {
        getOfferUserPairs()
        getUsers()
    }, [])

    const getOfferUserPairs = async () => {
        const idPairs = [];
        // Fetch and process the id pairs from the database
        // Store the id of the user who made the offer at the index of the offer id
        // Ex: User 3 makes offer 6
        //     idPairs[6] = 3
        try {
            const idPairsRaw = await axios.get('/offeruserpairs').then(response => response.data);
            for (let pair of idPairsRaw) {
                idPairs[pair.id] = pair.user_id;
            }
        } catch (error) {
            console.log(error);
        }

        // Loop through the idPairs array and replace the user id with the user name
        // Add the final list to the state
        try {
            for (let i = 0; i < idPairs.length; i++) {
                if (idPairs[i]) {
                    const name = await axios.get(`/user/${idPairs[i]}`).then(response => response.data.name);
                    idPairs[i] = name;
                }
            }
            setOfferUserPairs(idPairs);
        } catch (error) {
            console.log(error);
        }
        
        // Get all the offers from the database and add them to the state
        // Then turn off the offers loader
        // Do this last so the user names will be loaded before the offers are rendered
        try {
            await axios.get('/offers').then(response => response.data).then(offers => {
                setOffers(offers);
                setOffersLoaded(true);
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    const getUsers = async () => {
        try {
            await axios.get('/users').then(response => setUsers(response.data))
        } catch (error) {
            alert(error.message)
        }
    }

    const showForm = (event) => {
        event.preventDefault();
        setFormClass("show");
    }

    const hideForm = (event) => {
        event.preventDefault();
        setFormClass("hide");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            title: title,
            category: category,
            price: price,
            description: description,
            user_id: currentUserId
        };
        try {
            await axios.post('/offer', formData);
        } catch (error) {
            alert(`It looks like there was an error: ${error}`)
        }
        setTitle("");
        setCategory("");
        setPrice(0);
        setDescription("");
        setFormClass("hide")
        getOfferUserPairs()
    }

    const deleteOffer = async (id) => {
        try {
            await axios.delete(`/offer/${id}`);
        } catch (error) {
            alert(`It looks like there was an error: ${error}`)
        }
        getOfferUserPairs()
    }

    return(
        <div>
            <h1>Community</h1>
            
            <div className="community-content">
                <div id="offers" className="community-column">
                    <h2 className="column-title">Offers</h2>
                    <p className="column-description">See all that your community has to offer. If you're interested in an offer, click the bell icon to notify the person who posted it.</p>
                    <button className="primary-button" onClick={showForm}>Create offer</button>
                    <div className={`popup-container ${formClass}`}>
                        <form className={`create-offer-form ${formClass}`} onSubmit={handleSubmit}>
                            <div className="form-header">
                                <h2>Create a new offer</h2>
                                <button className="close-button" onClick={hideForm}>
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <label>
                                Title <input name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                            </label>
                            <label>
                                Category
                                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="" disabled>Please select a category</option>
                                    <option value="good">Good</option>
                                    <option value="service">Service</option>
                                </select>
                            </label>
                            <label>
                                Price <input name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                            </label>
                            <label>
                                Description <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </label>
                            <button type="submit" className="form-button">Submit</button>
                        </form>
                    </div>
                    <ColorRing
                        visible={!offersLoaded}
                        height="175"
                        width="175"
                        ariaLabel="offers-loading"
                        wrapperStyle={{}}
                        wrapperClass="loader-wrapper"
                        colors={['#4D6150', '#89886C', '#BAAC62', '#DA9F59', '#BF9E87']}
                    />
                    <div className="offers-container">
                        {offers.map(offer => 
                            <CommunityOffer key={offer.id} dbid={offer.id} title={offer.title} category={offer.category} price={offer.price} description={offer.description} user={offerUserPairs[offer.id]} userId={offer.user_id} myOffer={offer.user_id === currentUserId} deleteOffer={deleteOffer}/>
                        )}
                    </div>
                </div>
                <div id="members" className="community-column-2">
                    <h2 className="column-title">Members</h2>
                    <div className="users-container">
                        {users.map(user => 
                            <Member key={user.id} dbid={user.id} name={user.name} img={user.pp_url}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}