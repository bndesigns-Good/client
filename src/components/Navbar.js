import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar({ logOut }) {
    return(
        <nav className="nav">
            <Link to="/" className="site-title">Good</Link>
            <ul>
                <InternalLink to="/">Community</InternalLink>
                <InternalLink to="/profile">Profile</InternalLink>
                <button onClick={logOut}>Log out</button>
            </ul>
        </nav>
    )
}

function InternalLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}

Navbar.propTypes = {
    logOut: PropTypes.func.isRequired
}