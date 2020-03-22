import React from 'react';
import { Link } from 'react-router-dom';
import './MovieThumbFavourite.css'

const MovieThumbFavourite = ({ image, movieId, movieName, onDeleteFavourite, userId }) => (

    <div className="rmdb-moviethumbFav">
        <div>
            <Link to={"/movie/" + movieId }>
            <img alt="" className="rounded" src={image}/>
            </Link>
        </div>
        <div>
            <span className="ml-1 font-weight-bold" style={{ fontSize: '18px', color: 'white', fontFamily: 'Helvetica'}}>{movieName}</span>
            <br/>
            <Link to="/profile" className="" onClick={() => onDeleteFavourite(userId,movieId)}  style={{color: 'red', fontSize: '20px', fontFamily: 'Helvetica'}}>
                <i className="fa fa-trash-o">
                    <span className="font-italic">Remove from favourites</span>
                </i>
            </Link>
        </div>
    </div>
);

export default MovieThumbFavourite;