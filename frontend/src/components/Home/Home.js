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
        page:0,
        pageSize:2,
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

    searchData = (searchTerm) => {
        MovieService.searchMovieTerm(searchTerm).then((response)=>{
            this.setState({
                movies: response.data,
                page:0,
                pageSize:0,
                totalPages:0
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
                        <SearchBar onSearch={this.searchData} />
                    </div> : null}

                <div className="rmdb-home-grid">
                    {/*header={searchTerm ? 'Search Result' : 'Popular Movies'}*/}
                    <FourColGrid
                        header='Popular Movies'
                        onPageClick={this.loadMovies}
                        totalPages={this.state.totalPages} >
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