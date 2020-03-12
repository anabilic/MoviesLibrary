import React, { Component } from 'react';
import MovieService from "../../repository/axiosMovieRepository";
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import './Home.css';

class Home extends Component{

    state = {
        movies: [],
        movie:[],
        heroImage: null,
        pageSize:12,
        totalPages:0
    };

    componentDidMount() {
        this.loadMovies();
        this.loadMoviesPaginate();
    }

    loadMoviesPaginate = (page=0) => {
        MovieService.fetchMoviesPaged(page, this.state.pageSize).then((data) => {
            this.setState({

                movies: data.data.content,
                page:data.data.page,
                pageSize: data.data.pageSize,
                totalPages: data.data.totalPages,
            })
        })
    };

    loadMovies = () => {
        MovieService.loadMovies().then((data) => {
            this.setState({
                colorFlag: false,
                movie: data.data.content,
                heroImage: data.data.content[8],
            })
        })
    };

    searchData = (searchTerm) => {
        MovieService.searchMovieTerm(searchTerm).then((data)=>{
            this.setState({
                movies: data.data,
            })
        })
    };



    render() {

         const { movies, heroImage } = this.state;
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
                        <SearchBar onSearch={this.searchData}/>
                    </div> : null}

                    <br/>
                <div className="rmdb-home-grid">
                    <FourColGrid
                        header={'All Popular Movies'}
                        onPageClick={this.loadMoviesPaginate}
                        totalPages={this.state.totalPages}
                        >
                        {movies &&  movies.map( (element, i) => (
                            <MovieThumb
                                key={i}
                                clickable={true}
                                userId={this.props.userId}
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