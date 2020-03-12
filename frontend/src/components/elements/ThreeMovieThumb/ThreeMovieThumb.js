import React from 'react';
import { Link } from 'react-router-dom';
import './ThreeMovieThumb.css';

const ThreeMovieThumb = ({ image, movieId, movieName, onDelete }) => (

    <div className="rmdb-moviethumbThree">
        <div>
            <Link to={"/movie/" + movieId}>
                <img alt="" className="rounded"  src={image}/>
            </Link>
        </div>
        <div>
            <span className="ml-1 font-weight-bold" style={{ fontSize: '18px', color: 'white', fontFamily: 'Helvetica'}}>{movieName}</span>
            <br/>
            <Link to={"/editMovie/" + movieId}  style={{color: 'red', fontSize: '20px', fontFamily: 'Helvetica'}} >
                <i className="fa fa-edit">
                    <span className="font-italic">Edit this movie</span>
                </i>
            </Link>
            <br/>
            <a  href="" className="" onClick={() => onDelete(movieId)}  style={{color: 'red', fontSize: '20px', fontFamily: 'Helvetica'}}>
                <i className="fa fa-trash-o">
                    <span className="font-italic">Delete this movie</span>
                </i>
            </a>
        </div>
    </div>
);

export default ThreeMovieThumb;