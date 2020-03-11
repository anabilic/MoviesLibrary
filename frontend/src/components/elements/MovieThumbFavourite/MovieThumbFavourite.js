import React from 'react';
import { Link } from 'react-router-dom';
import './MovieThumbFavourite.css'

const MovieThumbFavourite = ({ image, movieId, userId, movieName, onDelete }) => (
    <div className="rmdb-moviethumbFav">
        <div>
            <Link to={"/movie/" + movieId + "/" + userId}>
                <img alt="" className="rounded"
                     // style={{width: '200px', height: '250', fontFamily: 'Helvetica'}}
                     src={image}/>
            </Link>
        </div>
        <div>
            <span className="ml-1 font-weight-bold" style={{ fontSize: '18px', color: 'white', fontFamily: 'Helvetica'}}>{movieName}</span>
            <br/>
            <a  href="" className="" onClick={() => onDelete(movieId)}  style={{color: 'red', fontSize: '20px', fontFamily: 'Helvetica'}}>
                <i className="fa fa-trash-o">
                    <span className="font-italic">Delete from favourites</span>
                </i>
            </a>
        </div>
    </div>
);

export default MovieThumbFavourite;