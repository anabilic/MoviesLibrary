import React, {  useEffect, useState } from 'react';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid.js';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import {useParams} from "react-router";
import axios from "../../custom-axios/axios";
import './Movie.css';

const Movie = (props) => {

    const [movie,setMovies] = useState({});
    const [moviesActors,setMoviesActors] = useState({});
    const [moviesGenres,setMoviesGenres] = useState({});
    const [loading,setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        axios.get("/movie/" + id).then((data) => {
            setMovies(data.data);
        });
        axios.get("/movie/" + id + "/actors").then((data) => {
            setMoviesActors(data.data);
        });
        axios.get("/movie/" + id + "/genres").then((data) => {
            setMoviesGenres(data.data);
        }, []);
    });


    const actors = Object.values(moviesActors);
    const genres = Object.values(moviesGenres);

    return (
            <div className="rmdb-movie">
                {movie ?
                    <div>
                        <Navigation movie={movie.name} />
                        <MovieInfo movie={movie} director={movie.director} genres={genres} />
                        <MovieInfoBar runningTime={movie.runningTime} releaseInformation={movie.releaseInformation} originalLanguage={movie.originalLanguage} />
                    </div>
                    : null }
                {actors ?
                    <div className="rmdb-movie-grid">
                        <FourColGrid header={'Actors'}>
                            {actors.map( (element, i) => (
                                <Actor key={i} actor={element} />
                            ))}
                        </FourColGrid>
                    </div>
                    : null }
                {!actors && !loading ? <h1>No movie found</h1> : null }
                {loading ? <Spinner /> : null}
            </div>
        )
};

export default Movie;