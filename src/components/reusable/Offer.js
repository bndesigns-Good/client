import React from 'react';
import '../css/index.css';

import { Link } from 'react-router-dom';

export default function Offer({dbid, title, category, price, description, user, myOffer, deleteOffer, ...props}) {
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
                    <Link to="/profile" className="offer-user">{user}</Link>
                    <button className="edit-button">
                        <span className="material-symbols-outlined">concierge</span>
                    </button>
                </div>
            </div>
        )
    }
}