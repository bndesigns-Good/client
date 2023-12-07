import React from 'react';
import '../css/index.css';

import { Link } from 'react-router-dom';

export default function Member({dbid, name, img, ...props}) {
    return(
        img == null ?
            <div className="member-mini" {...props}>
                <img src="/logo1.0.png" alt="Profile" />
                <Link to={`/profile/${dbid}`}>{name}</Link>
            </div>
        :
            <div className="member-mini" {...props}>
                <img src={img} alt="Profile" />
                <Link to={`/profile/${dbid}`}>{name}</Link>
            </div>
    )
}