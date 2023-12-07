import React from 'react';
import PropTypes from 'prop-types';
import '../css/index.css';

import { Link } from 'react-router-dom';
import InternalLink from '../reusable/InternalLink';

export default function Navbar({ logOut, currentUserId }) {
    return(
        <nav className="nav">
            <Link to="/" className="site-title">Good</Link>
            <ul>
                <InternalLink to="/">Community</InternalLink>
                <InternalLink to={`/profile/${currentUserId}`}>Profile</InternalLink>
                <button onClick={logOut}>Log out</button>
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    logOut: PropTypes.func.isRequired
}