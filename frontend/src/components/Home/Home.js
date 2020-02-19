import React, { Component } from 'react';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import MovieService from "../../repository/axiosMovieRepository";
import './Home.css';

class Home extends Component{

    state = {
        movies: [],
        heroImage: null,
        searchTerm: '',
        pageSize:6,
        totalPages:0
    };

    componentDidMount() {
        this.loadMovies();
        console.log(this.loadMovies());
    }

    loadMovies = (page=0) => {
        MovieService.fetchMoviesPaged(page, this.state.pageSize).then((data) => {
            this.setState({

                movies: data.data,
                heroImage: data.data[0],
                page:data.data.page,
                pageSize: data.data.pageSize,
                totalPages: data.data.totalPages
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
                        loading={loading}
                        onPageClick={this.loadMovies}
                        totalPages={this.state.totalPages}>
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
                </div>
            </div>
        )
    }
}

export default Home;