import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';


export default function Profile({ currentUserId }) {
    const [currentUser, setCurrentUser] = useState({})
    const [usersOffers, setUsersOffers] = useState([])
    const [formClass, setFormClass] = useState("hide")
    const [name, setName] = useState("")
    const [pronouns, setPronouns] = useState("")
    const [bio, setBio] = useState("")

    useEffect(() => {
        getCurrentUser(currentUserId)
        getUsersOffers(currentUserId)
    }, [currentUserId])

    const getCurrentUser = async (id) => {
        try {
            await axios.get(`/user/${id}`).then(response => setCurrentUser(response.data))
        } catch (error) {
            console.log(error)
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

    const editUser = async (event) => {
        event.preventDefault()
        const formData = {
            name: name,
            pronouns: pronouns,
            bio: bio
        };
        try {
            await axios.patch(`/user/${currentUserId}`, formData);
        } catch (error) {
            console.log(error)
            alert(`It looks like there was a problem updating your profile. Be sure to double check your info before submitting.`)
        }
        setName("");
        setPronouns("");
        setBio("");
        setFormClass("hide")
        getCurrentUser(currentUserId)
    }

    const getUsersOffers = async (id) => {
        try {
            await axios.get(`/offers/${id}`).then(response => setUsersOffers(response.data))
        } catch (error) {
            console.log(error)
        }
    }

    const deleteOffer = async (id) => {
        try {
            await axios.delete(`/offer/${id}`);
        } catch (error) {
            alert(`It looks like there was an error: ${error}`)
        }
        getUsersOffers(currentUserId)
    }

    return(
        <div>
            <div className="profile-top-section">
                <div className="member-image">
                    <span className="material-symbols-outlined">person</span>
                </div>
                <div className="profile-info">
                    <div className="info-header">
                        <div>
                            <h2>{currentUser.name}</h2>
                            <p className="pronouns">{currentUser.pronouns}</p>
                        </div>
                        <button className="primary-button" onClick={showForm}>
                            <span className="material-symbols-outlined">edit_square</span>
                        </button>
                        <div className={`popup-container ${formClass}`}>
                            <form className={`edit-profile-form ${formClass}`} onSubmit={editUser}>
                                <div className="form-header">
                                    <h2>Edit your profile</h2>
                                    <button className="close-button" onClick={hideForm}>
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                                <label>
                                    Name <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </label>
                                <label>
                                    Pronouns <input name="pronouns" value={pronouns} onChange={(e) => setPronouns(e.target.value)} />
                                </label>
                                <label>
                                    Bio <textarea name="bio" value={bio} onChange={(e) => setBio(e.target.value)}/>
                                </label>
                                <button type="submit" className="form-button">Submit</button>
                            </form>
                        </div>
                    </div>
                    <p>{currentUser.bio}</p>
                </div>
            </div>
            <div className="profile-bottom-section">
                <div className="profile-column">
                    <h2 className="column-title">Notifications</h2>
                    <div className="notifications-container">
                        <p>Notifications will go here!</p>
                    </div>
                </div>
                <div className="profile-column">
                    <h2 className="column-title">My Offers</h2>
                    <div className="offers-container">
                        {usersOffers.map(offer => 
                            <Offer key={offer.id} dbid={offer.id} title={offer.title} category={offer.category} price={offer.price} deleteOffer={deleteOffer}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Offer({dbid, title, category, price, deleteOffer, ...props}) {
    return(
        <div id={`offer-${dbid}`} className={`offer-card ${category}`} {...props}>
            <div className="offer-row">
                <h3 className="offer-title">{title}</h3>
                <p>${price}</p>
            </div>
            <div className="offer-row-2">
                <button className="edit-button" onClick={() => console.log('Editing offer...')}>
                    <span className="material-symbols-outlined">edit_square</span>
                </button>
                <button className="delete-button" onClick={() => deleteOffer(dbid)}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    )
}