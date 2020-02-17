import React from 'react';
import FontAwesome from 'react-fontawesome';
import MovieThumb from '../MovieThumb/MovieThumb';
import './MovieInfo.css';
import Actor from "../Actor/Actor";
import FourColGrid from "../FourColGrid/FourColGrid";

const MovieInfo = ({ movie, director ,genres}) => (
    <div className="rmdb-movieinfo"
         style={{
             background: '#000'
         }}
    >
        <div className="rmdb-movieinfo-content">
            <div className="rmdb-movieinfo-thumb">
                <MovieThumb
                    image={movie.file ? `data:image/jpeg;base64,${movie.file}` : './images/no_image.jpg'}
                    clickable={false}
                />
            </div>
            <div className="rmdb-movieinfo-text">
                <h1>{movie.name}</h1>
                <h3>PLOT</h3>
                <p>{movie.plot}</p>
                <h3>GENRES</h3>
                {genres && genres.map( (element, i) => (
                    <ul key={i}>
                        <li>{element.name}</li>
                    </ul>
                ))}
                {/*<div className="rmdb-rating">*/}
                {/*    <p className="rmdb-score">{genres}</p>*/}
                {/*</div>*/}
                 <h3>DIRECTOR/S</h3>
                <p className="rmdb-director">{director}</p>

            </div>
            <FontAwesome className="fa-film" name="film" size="5x" />
        </div>
    </div>
)

export default MovieInfo;