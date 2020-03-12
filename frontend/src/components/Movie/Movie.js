import React, {  useEffect, useState } from 'react';
import axios from "../../custom-axios/axios";
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGridActors from "../elements/FourColGridActors/FourColGridActors";
import Actor from '../elements/Actor/Actor';
import {useParams} from "react-router";
import './Movie.css';

const Movie = (props) => {

    const [movie,setMovies] = useState({});
    const [movieFavourites, setMoviesFavourite] = useState({});
    const [moviesActors,setMoviesActors] = useState({});
    const [moviesGenres,setMoviesGenres] = useState({});
    const [fav,setFav] = useState({});
    const {id} = useParams();


    useEffect(()=>{

        axios.get("/movie/id/"+id).then((data) => {
            setMovies(data.data);
        });
        axios.get("/movie/" + id + "/actors").then((data) => {
            setMoviesActors(data.data);
        });
        axios.get("/movie/" + id + "/genres").then((data) => {
            setMoviesGenres(data.data);
        });

        setFav(loadFavourites());

    },[]);

   const  loadFavourites = async() =>{
    axios.get("/movie/" + id + "/" + props.userId).then(await ((data)=> {
        setMoviesFavourite(data.data);
    }))};

    const actors = Object.values(moviesActors);
    const genres = Object.values(moviesGenres);


    return (

            <div className="rmdb-movie">
                {movie ?
                    <div>
                        <Navigation movie={movie.name} />
                        <MovieInfo userId={props.userId} movieFavourites={movieFavourites} movie={movie} director={movie.director} genres={genres} addMovieToFavourite={props.addMovieToFavourite} colorFlag={props.colorFlag} errorMessage={props.errorMessage}  />
                        <MovieInfoBar runningTime={movie.runningTime} releaseInformation={movie.releaseInformation} originalLanguage={movie.originalLanguage} />
                    </div> : null }
                    <br/>

                {actors ?
                    <div className="rmdb-movie-grid">
                        <FourColGridActors
                            header={'Actors'}>
                            {actors.map( (element, i) => (
                                <Actor key={i} actor={element} />
                                ))}
                        </FourColGridActors>
                    </div>
                    : null }
            </div>
        )
};

export default Movie;