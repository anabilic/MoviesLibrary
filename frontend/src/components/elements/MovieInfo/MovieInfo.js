import React, {useState} from 'react';
import MovieThumb from '../MovieThumb/MovieThumb';
import './MovieInfo.css';

const MovieInfo = ({ movie, director, genres, addMovieToFavourite, colorFlag,errorMessage, movieFavourites, userId}) => {
    console.log('ANAAA', movieFavourites, colorFlag);

    const [isClicked,setIsClicked] = useState(false);

    const handleClick = () =>{
        setIsClicked(true);
    };

    // const filter = {movie.userFavourites} && {movie.userFavourites}.filter((u) => { return u.id !== userId;});
    return(
    <div className="rmdb-movieinfo"  style={{ background: '#000' }} >
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
                    <br/>
                    {genres && genres.map( (element, i) => (
                        <ul key={i} style={{marginLeft: '-15px'}}>
                            <li>{element.name}</li>
                        </ul>
                    ))}
                    <h3>DIRECTOR/S</h3>
                    <p className="rmdb-director">{director}</p>
                </div>
                <button href="#" className="btn btn-light buttonFavourites" onClick={()=>{addMovieToFavourite(movie.id); handleClick()}}>
                    {/*<i style={{fontSize: '50px', color: color }} className="fa fa-heart"/>*/}

                    {movieFavourites || isClicked  ?
                    <i style={{fontSize: '50px', color: 'red' }} className="fa fa-heart"/>
                    : <i style={{fontSize: '50px', color: 'white' }} className="fa fa-heart"/>
                    }
                </button>
                <br/>
                <br/>
                {errorMessage ?
                    <p style={{fontStyle:'bold',fontSize: '15px', color: 'red', marginLeft:'1080px',marginTop:'450px'}} >
                      {errorMessage}</p>
                    :
                    null
                }
                {/*You have already added this <br/>movie to your favourites list!!!*/}
            </div>
        </div>
    );
};

export default MovieInfo;