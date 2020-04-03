import React, { Component } from 'react';
import axios from "../../../custom-axios/axios";
import {Link} from "react-router-dom";
import MovieService from "../../../repository/axiosMovieRepository";
import Navigation from '../../elements/Navigation/Navigation';
import ThreeColGrid from "../../elements/ThreeColGrid/ThreeColGrid";
import ThreeMovieThumb from "../../elements/ThreeMovieThumb/ThreeMovieThumb";
import ThreeColGridFavourites from "../../elements/ThreeColGridFavourites/ThreeColGridFavourites";
import MovieThumbFavourite from "../../elements/MovieThumbFavourite/MovieThumbFavourite";
import UserService from '../../../repository/axiosUserRepository';
import './Profile.css';


class Profile extends Component{

    constructor(props){
        super(props);

        this.state={
            user:UserService.currentUserValue,
            movie:[],
            userDetails:[],
            pageSize:6,
            totalPages:0,
            favouriteMovies:[]
        };
    }

     componentDidMount() {

        if(!UserService.currentUserValue){
            this.props.history.push('/');
            return;
        }

        this.loadMoviesPaginate();
        this.loadFavouriteMoviesPaginate();

            axios.get("/user?id="+this.state.user.id).then((response)=>{
                this.setState(
                    {
                        userDetails:response.data
                    }
                )
            });

    }

    loadMoviesPaginate = (page=0) => {
        MovieService.fetchMoviesPaged(page, this.state.pageSize).then((data) => {
            this.setState({

                movie: data.data.content,
                page:data.data.page,
                pageSize: data.data.pageSize,
                totalPages: data.data.totalPages

            })
        })
    };

    loadFavouriteMoviesPaginate = (page=0) => {
        UserService.fetchFavouriteMoviesPaged(this.state.user.id,page, this.state.pageSize).then((data) => {
            this.setState({

                favouriteMovies: data.data.content,
                page:data.data.page,
                pageSize: data.data.pageSize,
                totalPages: data.data.totalPages

            })
        })
    };

    deleteFavouriteMovie = (userId,movieId) => {
        UserService.deleteFavouriteMovie(userId,movieId).then((response) => {
            this.setState((state) => {
                const favMovie = state.favouriteMovies.filter((fm) => {
                    return fm.id !== movieId;
                });
                return {favMovie};
            });
            this.loadFavouriteMoviesPaginate(0);
        })
    };

    render(){

        let $preview;
        if(this.state.userDetails.file==null){
            if(this.state.userDetails.gender === 'Female'){
                $preview = (<img alt="" src="./images/avatarFemale.png" className="topPhoto rounded-circle"/>);
            }else if(this.state.userDetails.gender === 'Male'){
                $preview = (<img alt="" src="./images/avatarMaler.png" className="topPhoto rounded-circle"/>);
            }
        }else {
            $preview = (<img src={`data:image/jpeg;base64,${this.state.userDetails.file}`}  alt="" className="topPhoto rounded-circle"/>);
        }

        return(
            <div style={{backgroundColor:'#1c1c1c', fontFamily: 'Helvetica'}}>
                <Navigation movie="Profile" />
                    <div className="row" style={{fontFamily: 'Helvetica'}}>
                        {this.state.userDetails.role === 'USER' &&
                        <div className="col-lg-4" style={{height:'600px'}}>
                            <br/>
                            <br/>
                            <br/>
                            {$preview}
                            <p className="font-italic nameProfile" style={{color:'white',marginLeft:'80px',fontFamily: 'Helvetica'}}>{this.state.userDetails.name}</p>
                            <p className="font-italic" style={{color:'white',marginLeft:'40px',fontSize:'20px',fontFamily: 'Helvetica'}}>{this.state.userDetails.email}</p>
                            <br/>
                            <span>
                                <Link to={"/editUser/"+this.state.userDetails.id} style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                                    <i className="fa fa-edit">
                                        <span className="font-italic"> Edit my profile</span>
                                    </i>
                                </Link>
                            </span>
                        </div>
                        }
                        {this.state.userDetails.role === 'ADMIN' &&
                        <div className="col-lg-4">
                            <br/>
                            <br/>
                            <br/>
                            {$preview}
                            <br/>
                            <br/>
                            <p className="font-italic nameProfile" style={{color:'white',marginLeft:'120px',fontFamily: 'Helvetica'}}>{this.state.userDetails.name}</p>
                            <p className="font-italic" style={{color:'white',marginLeft:'70px',fontSize:'20px',fontFamily: 'Helvetica'}}>Username: {this.state.userDetails.username}</p>
                            <br/>
                            <span>
                                <Link to={"/editUser/"+this.state.userDetails.id} style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-edit">
                            <span className="font-italic"> Edit my profile</span>
                            </i>
                            </Link>
                            </span>
                            <br/>
                            <span>
                            <Link to="/addMovie" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-plus">
                            <span className="font-italic"> Add new movie</span>
                            </i>
                            </Link>
                            </span>
                            <br/>
                            <span>
                            <Link to="/addActor" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-plus">
                            <span className="font-italic"> Add new actor</span>
                            </i>
                            </Link>
                            </span>
                            <br/>
                            <span>
                            <Link to="/addGenre" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-plus">
                            <span className="font-italic"> Add new genre</span>
                            </i>
                            </Link>
                            </span>
                            <br/>
                            <span>
                            <Link to="/allActors" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-list">
                            <span className="font-italic"> List of all actors</span>
                            </i>
                            </Link>
                            </span>
                            <br/>
                            <span>
                                <Link to="/allUsers" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                                    <i className="fa fa-list">
                                    <span className="font-italic"> List of all users</span>
                                    </i>
                                </Link>
                            </span>
                            <br/>
                            <span>
                            <Link to="/allGenres" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-list">
                            <span className="font-italic"> List of all genres</span>
                            </i>
                            </Link>
                            </span>
                            <br/>
                            <span>
                            <Link to="/allFavourites" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-heart">
                            <span className="font-italic"> List of favourites movies</span>
                            </i>
                            </Link>
                            </span>
                        </div>
                        }
                        {this.state.userDetails.role === 'ADMIN' &&
                        <div className="col-lg-8" style={{color: 'white'}}>
                            <br/>
                            <br/>
                            <p className="font-italic"
                               style={{fontSize: '25px', color: 'white', fontFamily: 'Helvetica'}}>All movies</p>
                            <hr className="new4" style={{width:'900px', marginLeft:'-15px'}}/>
                            <div>
                                <ThreeColGrid
                                    onPageClick={this.loadMoviesPaginate}
                                    totalPages={this.state.totalPages}
                                >
                                    {this.state.movie && this.state.movie.map( (element, i) => (
                                        <ThreeMovieThumb
                                            key={i}
                                            clickable={true}
                                            image={element.file ? `data:image/jpeg;base64,${element.file}` : './images/no_image.jpg'}
                                            movieId={element.id}
                                            movieName={element.name}
                                            onDelete = {this.props.onDelete}
                                        />
                                        ))}
                                </ThreeColGrid>
                            </div>
                        </div>
                            }
                        {this.state.userDetails.role === 'USER' &&
                        <div className="col-lg-8" style={{color: 'white'}}>
                            <br/>
                            <br/>
                            <p className="font-italic"
                               style={{fontSize: '25px', color: 'white', fontFamily: 'Helvetica'}}>Favourite movies</p>
                            <hr className="new4" style={{width: '900px', marginLeft: '-15px'}}/>
                            {this.state.favouriteMovies.length === 0 &&
                            <div>
                            <h2 style={{
                                color: 'white',
                                fontStyle: 'italic',
                                display: 'absolute',
                                marginTop: '50px',
                            }}>You don't have any favorite movie right now!</h2>
                            </div>
                            }
                            {this.state.favouriteMovies.length !== 0 &&
                            <div>
                                <ThreeColGridFavourites
                                    onPageClick={this.loadFavouriteMoviesPaginate}
                                    totalPages={this.state.totalPages}
                                >
                                    {this.state.favouriteMovies && this.state.favouriteMovies.map((element, i) => (
                                        <MovieThumbFavourite
                                            key={i}
                                            clickable={true}
                                            image={element.file ? `data:image/jpeg;base64,${element.file}` : './images/no_image.jpg'}
                                            userId={this.state.user.id}
                                            movieId={element.id}
                                            movieName={element.name}
                                            onDeleteFavourite={this.deleteFavouriteMovie}
                                        />
                                    ))}
                                </ThreeColGridFavourites>
                            </div>
                            }
                        </div>

                        }
                    </div>
            </div>
        )
    }
};

export default Profile;
