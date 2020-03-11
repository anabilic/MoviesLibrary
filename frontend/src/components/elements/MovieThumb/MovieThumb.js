import React from 'react';
import { Link } from 'react-router-dom';
import './MovieThumb.css';

const MovieThumb = ({ image, movieId, movieName, clickable ,userId}) => (
    <div className="rmdb-moviethumb">
        {clickable ?
            <Link to={"/movie/"+movieId + "/" + userId}>
                <img className="clickable" src={image} alt="moviethumb" />
            </Link>
            :
            <img src={image} alt="moviethumb" />
        }
    </div>
);

export default MovieThumb;