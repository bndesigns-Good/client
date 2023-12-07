import React from 'react';
import '../css/index.css';

import { Link } from 'react-router-dom';

function CommunityOffer({dbid, title, category, price, description, user, userId, myOffer, deleteOffer, ...props}) {
    if (myOffer) {
        return(
            <div id={`offer-${dbid}`} className={`offer-card ${category}`} {...props}>
                <div className="offer-row">
                    <h3 className="offer-title">{title}</h3>
                    <p>${price}</p>
                </div>
                <div className="description-row">
                    <p>{description}</p>
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
    } else {
        return(
            <div id={`offer-${dbid}`} className={`offer-card ${category}`} {...props}>
                <div className="offer-row">
                    <h3 className="offer-title">{title}</h3>
                    <p>${price}</p>
                </div>
                <div className="description-row">
                    <p>{description}</p>
                </div>
                <div className="offer-row">
                    <Link to={`/profile/${userId}`} className="offer-user">{user}</Link>
                    <button className="edit-button">
                        <span className="material-symbols-outlined">concierge</span>
                    </button>
                </div>
            </div>
        )
    }
}

function ProfileOffer({dbid, title, category, price, description, myOffer, deleteOffer, ...props}) {
    return(
        <div id={`offer-${dbid}`} className={`offer-card ${category}`} {...props}>
            <div className="offer-row">
                <h3 className="offer-title">{title}</h3>
                <p>${price}</p>
            </div>
            <div className="description-row">
                <p>{description}</p>
            </div>
            {myOffer ?
                <div className="offer-row-2">
                    <button className="edit-button" onClick={() => console.log('Editing offer...')}>
                        <span className="material-symbols-outlined">edit_square</span>
                    </button>
                    <button className="delete-button" onClick={() => deleteOffer(dbid)}>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
                :
                <div className="offer-row">
                    <span></span>
                    <button className="edit-button">
                        <span className="material-symbols-outlined">concierge</span>
                    </button>
                </div>
            }
        </div>
    )
}

export {
    CommunityOffer,
    ProfileOffer
}