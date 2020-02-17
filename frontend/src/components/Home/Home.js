import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import Spinner from '../elements/Spinner/Spinner';
import MovieService from "../../repository/axiosMovieRepository";
import './Home.css';

class Home extends Component{

    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: ''
    };

    componentDidMount() {
        this.loadMovies();
    }

    loadMovies = () => {
        MovieService.getMovies().then(response =>  {
            this.setState((prevState) => {
                return{
                    "movies": response.data,
                    "heroImage": response.data[0],
                    "loading":false
                }
            })
        })
    };


    render() {

         const { movies, heroImage, loading, searchTerm } = this.state;

         return (
            <div className="rmdb-home">
                {heroImage ?
                    <div>
                        <HeroImage
                            image={`./images/Movie-Poster.jpg`}
                            title={heroImage.name}
                            text={heroImage.plot}
                            style={{width: '1200px'}}
                        />
                        <SearchBar />
                    </div> : null}

                <div className="rmdb-home-grid">
                    <FourColGrid
                        header={searchTerm ? 'Search Result' : 'Popular Movies'}
                        loading={loading} >
                        {movies && movies.map( (element, i) => (
                            <MovieThumb
                                key={i}
                                clickable={true}
                                image={element.file ? `data:image/jpeg;base64,${element.file}` : './images/no_image.jpg'}
                                movieId={element.id}
                                movieName={element.name}
                            />
                        ))}
                    </FourColGrid>
                    {loading ? <Spinner /> : null}
                </div>
            </div>
        )
    }
}

export default Home;