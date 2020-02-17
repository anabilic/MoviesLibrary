import React from 'react';
import { Link } from 'react-router-dom';
import './MovieThumb.css';

const MovieThumb = ({ image, movieId, movieName, clickable }) => (
    <div className="rmdb-moviethumb">
        {/* You can send props via the Links "to" object. Here we create our own "movieName" */}
        {clickable ?
            <Link to="/">
                <img className="clickable" src={image} alt="moviethumb" />
            </Link>
            :
            <img src={image} alt="moviethumb" />

        }
    </div>
);

export default MovieThumb;