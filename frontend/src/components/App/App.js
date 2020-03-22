import React from 'react';
import { Router, Link, Route, Switch} from 'react-router-dom';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import MovieService from "../../repository/axiosMovieRepository";
import ActorService from "../../repository/axiosActorRepository";
import GenreService from "../../repository/axiosGenreRepository";
import {createBrowserHistory} from 'history';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditMovie from "../elements/EditMovie/EditMovie";
import EditActor from "../elements/EditActor/EditActor";
import NotFound from "../elements/NotFound/NotFound";
import Movie from "../Movie/Movie";
import ListActors from "../elements/ListActor/ListActors";
import ListUser from "../elements/ListUser/ListUser";
import EditUserWithoutImg from "../Security/EditUserWithoutImg/EditUserWithoutImg";
import ListFavourites from "../elements/ListFavourites/ListFavourites";
import ListGenres from "../elements/ListGenres/ListGenres";
import EditGenre from "../elements/EditGenre/EditGenre";
import Profile from "../Security/Profile/Profile";
import UserService from "../../repository/axiosUserRepository";
import {User} from '../../model/User';
import Home from '../Home/Home';
import LogIn from "../Security/LogIn/LogIn";
import Register from "../Security/Register/Register";
import AddMovie from "../elements/AddMovie/AddMovie";
import AddActor from "../elements/AddActor/AddActor";
import AddGenre from "../elements/AddGenre/AddGenre";
import EditUser from "../Security/EditUser/EditUser";
import './App.css';
import axios from "../../custom-axios/axios";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: createBrowserHistory(),
            currentUser: new User(),
            errorMessageAddFavourite:'',
            errorMessage:false,
            movies:[],
            actors:[],
            genres:[],
            users:[],
            pageSize:9,
            totalPages:0
        };
    }

    componentDidMount() {
        this.saveCurrentUser();
    }

    saveCurrentUser=()=>{
        UserService.currentUser.subscribe(data => {
            this.setState({currentUser: data});
            this.loadMoviesPaginate();
        });

    };

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


    updateMovie = ((editedMovie) => {
        MovieService.editMovie(editedMovie).then((response) => {
            const newMovie = response.data;
            this.setState((prevState) => {
                const newMovieRef = prevState.movies.filter((item) => {
                    if(item.name === newMovie.name){
                        return newMovie;
                    }
                    return  item;
                });
                return{
                    "movies": newMovieRef
                }
            });
        });
    });

    updateActor = ((editedActor) => {
        ActorService.editActor(editedActor).then((response) => {
            const newActor = response.data;
            this.setState((prevState) => {
                const newActorRef = prevState.actors.filter((item) => {
                    if(item.name === newActor.name){
                        return newActor;
                    }
                    return  item;
                });
                return{
                    "actors": newActorRef
                }
            });
        });
    });

    updateGenre = ((editedGenre) => {
        GenreService.editGenre(editedGenre).then((response) => {
            const newGenre = response.data;
            this.setState((prevState) => {
                const newGenreRef = prevState.genres.filter((item) => {
                    if(item.name === newGenre.name){
                        return newGenre;
                    }
                    return  item;
                });
                return{
                    "genres": newGenreRef
                }
            });
        });
    });

    updateUserWithoutImg = ((editedUser) => {
        UserService.editUserWithoutImg(editedUser).then((response)=>{
            const newUser= response.data;
            this.setState({
                "users":newUser
            })
        },error => {
            if (error.response.status === 409) {
                this.setState({
                    errorMessage: true
                });
            }
        });
    });

    deleteMovie = (movieId) => {
        MovieService.deleteMovie(movieId).then((response) => {
            this.setState((state) => {
                const movie = state.movies.filter((m) => {
                    return m.id !== movieId;
                });
                return {movie};
            });
        })
    };

    deleteActor = (actorId) => {
        ActorService.deleteActor(actorId).then((response) => {
            this.setState((state) => {
                const actor = state.actors.filter((a) => {
                    return a.id !== actorId;
                });
                return {actor};
            });
        });
    };

    deleteGenre = (genreId) => {
        GenreService.deleteGenre(genreId).then((response) => {
            this.setState((state) => {
                const genre = state.genres.filter((g) => {
                    return g.id !== genreId;
                });
                return {genre};
            });
        });
    };

    deleteUser = (userId) => {
        UserService.deleteUser(userId).then((response) => {
            this.setState((state) => {
                const user = state.users.filter((u) => {
                    return u.id !== userId;
                });
                return {user};
            })
        })
    };


    addFavouriteMovie=(idMovie)=>{
        UserService.addFavouriteMovie(this.state.currentUser.id,idMovie,this.state.currentUser).then((response)=>{
        },error => {
            if (error.response.status === 409) {
                this.setState({
                    errorMessageAddFavourite: "The book is added in your list"
                });
            }
        })
    };


    logout() {
        UserService.logOut().then(data => {
            this.state.history.push('/');
        }, error => {
            this.setState({
                errorMessage: "Unexpected error occurred."
            });
        });
    }


    render() {

        const {history, currentUser} = this.state;

        let {CurrentUserId}="";
        if(this.state.currentUser!==null){
            CurrentUserId=this.state.currentUser.id
        }else{
            CurrentUserId=0;
        }

        return (
            <Router history={history}>
                        {this.state.currentUser &&
                        <div className="rmdb-header">
                            <div className="rmdb-header-content">
                                <Link to="/">
                                    <img className="rmdb-logo" src="/images/movie_logo.png" alt="rmdb-logo" />
                                </Link>
                                <div className="rmdb-tmdb-logo">
                                    <Link to="/profile" className="btn btn-outline-danger waves-effect">
                                        <FontAwesomeIcon icon={faUser}/> {this.state.currentUser.name}
                                    </Link>
                                    <Link to="" style={{marginLeft:'10px'}} onClick={()=>this.logout()} className="btn btn-outline-danger waves-effect">
                                        Sign Out
                                    </Link>
                                </div>
                            </div>
                        </div>
                        }
                        {!this.state.currentUser &&
                        <div className="rmdb-header">
                            <div className="rmdb-header-content">
                                <Link to="/">
                                    <img className="rmdb-logo" src="/images/movie_logo.png" alt="rmdb-logo" />
                                </Link>
                                <div className="rmdb-tmdb-logo">
                                    <Link to="/login" className="btn btn-outline-danger waves-effect">
                                        Sign In
                                    </Link>
                                    <Link to="/register" style={{marginLeft:'10px'}} className="btn btn-outline-danger waves-effect">
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </div>
                        }
                    <Switch>
                        <Route path="/" render={()=> <Home />} exact/>

                        <Route path="/login" component={LogIn} exact/>
                        <Route path="/register" component={Register} exact/>
                        <Route path="/profile" render={()=> <Profile onPageClick={this.loadMoviesPaginate}  totalPages={this.state.totalPages} onDelete={this.deleteMovie} redirectForGenre={this.state.redirectForGenre} redirectForActor={this.state.redirectForActor}/>}  />

                        <Route path="/movie/:id" render={()=> <Movie user={this.state.currentUser} userId={CurrentUserId} addMovieToFavourite={this.addFavouriteMovie}  errorMessage={this.state.errorMessageAddFavourite}  />} />

                        <Route path="/addMovie" render={()=><AddMovie User={currentUser.username} />} />
                        <Route path="/addActor" render={()=><AddActor />} />
                        <Route path="/addGenre" render={()=><AddGenre />} />

                        <Route path="/allActors" render={()=> <ListActors onDelete={this.deleteActor}/>}  />
                        <Route path="/allUsers" render={()=> <ListUser onDelete={this.deleteUser} />}  />
                        <Route path="/allGenres" render={()=> <ListGenres onDelete={this.deleteGenre} />}  />
                        <Route path="/allFavourites" render={()=> <ListFavourites user={this.state.currentUser} />} />

                        <Route path="/editMovie/:id" render={()=> <EditMovie onSubmit={this.updateMovie}/>} />
                        <Route path="/editActor/:id" render={()=> <EditActor  onSubmit={this.updateActor}/>} />
                        <Route path="/editGenre/:id" render={()=> <EditGenre   onSubmit={this.updateGenre}/>} />
                        <Route path="/user/edit/:id" render={()=> <EditUserWithoutImg errorMessage={this.state.errorMessage} onSubmit={this.updateUserWithoutImg}/>}/>
                        <Route path="/editUser/:id"  render={()=> <EditUser currentUserId={this.state.currentUser.id}/>}/>

                        <Route component={NotFound} />
                    </Switch>
            </Router>
        );
    };
}

export default App;
