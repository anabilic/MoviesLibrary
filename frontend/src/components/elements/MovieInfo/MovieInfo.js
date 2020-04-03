import React, {useState} from 'react';
import {Link} from "react-router-dom";
import MovieThumb from '../MovieThumb/MovieThumb';
import './MovieInfo.css';

const MovieInfo = ({ movie, director, genres, addMovieToFavourite,errorMessage, movieFavourites, user,count}) => {

    const [isClicked,setIsClicked] = useState(false);
    const [isError,setIsError] = useState(false);


    const handleClick = () =>{
        setIsClicked(true);
    };

    const handleError = () =>{

        if(errorMessage){
            setIsError(true);
        }
    };

    return(

        <div>
            {user ?
                <div className="rmdb-movieinfo" style={{background: '#000'}}>
                    <div className="rmdb-movieinfo-content">
                        <div className="rmdb-movieinfo-thumb">
                            <br/>
                            <br/>
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
                            <br/>
                            {genres && genres.map((element, i) => (
                                <ul key={i} style={{marginLeft: '-15px'}}>
                                    <li>{element.name}</li>
                                </ul>
                            ))}
                            <h3>DIRECTOR/S</h3>
                            <p className="rmdb-director">{director}</p>

                        </div>
                        <button href="#" className="btn btn-light buttonFavourites" onClick={() => {
                            addMovieToFavourite(movie.id);
                            handleClick();
                            handleError()
                        }}>

                            {movieFavourites || isClicked ?
                               <span>
                                <i style={{position:'relative',fontSize: '50px', color: 'red'}} className="fa fa-heart"/>
                               <span style={{color:'white',marginLeft:'-32px', position:'absolute',fontSize:'20px',marginTop:'7px'}}>{count}</span>
                               </span>
                                :
                                <span>
                                <i style={{fontSize: '50px', color: 'white'}} className="fa fa-heart"/>
                               <span style={{color:'red',marginLeft:'-32px', position:'absolute',fontSize:'20px',marginTop:'7px'}}>{count}</span>
                               </span>
                            }

                        </button>

                        <br/>
                        <br/>

                        {isError ?
                            <p style={{
                                fontStyle: 'bold',
                                fontSize: '15px',
                                color: 'red',
                                marginLeft: '1080px',
                                marginTop: '450px'
                            }}>
                                {errorMessage}</p>
                            :
                            null
                        }

                    </div>
                </div>
                :
                <div className="rmdb-movieinfo" style={{background: '#000'}}>
                <div className="rmdb-movieinfo-content">
                    <div className="rmdb-movieinfo-thumb">
                        <br/>
                        <br/>
                        <MovieThumb
                            image={movie.file ? `data:image/jpeg;base64,${movie.file}` : './images/no_image.jpg'}
                            clickable={false}
                        />
                    </div>
                    <div className="rmdb-movieinfo-text">
                        <h1>{movie.name}</h1>

                        <h2 style={{
                            color: 'white',
                            fontStyle: 'italic',
                            display: 'absolute',
                            marginTop: '50px',
                        }}>To view more details about this movie, please <Link to="/register" style={{color: '#800000'}}>sign up</Link> or <Link
                                style={{color: '#800000'}} to="/login">sign in!</Link></h2>
                    </div>

                </div>
                </div>
            }

        </div>
    );
};

export default MovieInfo;