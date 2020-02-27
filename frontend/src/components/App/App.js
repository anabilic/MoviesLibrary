import React from 'react';
import { Router, Link, Route, Switch} from 'react-router-dom';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import MovieService from "../../repository/axiosMovieRepository";
import ActorService from "../../repository/axiosActorRepository";
import GenreService from "../../repository/axiosGenreRepository";
import {createBrowserHistory} from 'history';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditMovie from "../elements/EditMovie/EditMovie";
import NotFound from "../elements/NotFound/NotFound";
import Movie from "../Movie/Movie";
import Profile from "../Security/Profile/Profile";
import ListActors from "../elements/ListActor/ListActors";
import ListUser from "../elements/ListUser/ListUser";
import UserService from "../../repository/axiosUserRepository";
import {User} from '../../model/User';
import Home from '../Home/Home';
import LogIn from "../Security/LogIn/LogIn";
import Register from "../Security/Register/Register";
import AddMovie from "../elements/AddMovie/AddMovie";
import AddActor from "../elements/AddActor/AddActor";
import AddGenre from "../elements/AddGenre/AddGenre";
import './App.css';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: createBrowserHistory(),
            currentUser: new User(),
            movies:[],
            actors:[],
            genres:[],
            users:[]
        };
    }

    componentDidMount() {
        UserService.currentUser.subscribe(data => {
            this.setState({currentUser: data});
        });
    }

     createMovie= async (movie) => {
         await MovieService.addMovie(movie).then((response) => {
             const movie = response.data;

             this.setState((prevState) => {
                 const newMovieRef = [...prevState.movies, movie];
                 return {
                     "movies": newMovieRef
                 }
             });
         });
     };

    createGenre= async (genre) => {
        await GenreService.addGenre(genre).then((response) => {
            const genre = response.data;

            this.setState((prevState) => {
                const newGenreRef = [...prevState.genres, genre];
                return {
                    "genres": newGenreRef
                }
            });
        });
    };

    createActor= async (actor) => {
        await ActorService.addActor(actor).then((response) => {
            const actor = response.data;

            this.setState((prevState) => {
                const newActorRef = [...prevState.actors, actor];
                return {
                    "actors": newActorRef
                }
            });
        });
    };

    updateMovie = ((editedMovie) => {
        MovieService.editMovie(editedMovie).then((response) => {
            const newMovie = response.data;
            this.setState((prevState) => {
                const newMovieRef = prevState.movies.map((item) => {
                    if(item.name === newMovie.name){
                        return newMovie;
                    }
                    return  item;
                })
                return{
                    "movies": newMovieRef
                }
            });
        });
    });


    deleteMovie = (movieId) => {
        MovieService.deleteMovie(movieId).then((response) => {
            this.setState((state) => {
                const movie = state.movies.filter((m) => {
                    return m.id !== movieId;
                });
                return {movie};
            })

        })
    };

    deleteActor = (actorId) => {
        ActorService.deleteActor(actorId).then((response) => {
            this.setState((state) => {
                const actor = state.actors.filter((a) => {
                    return a.id !== actorId;
                });
                return {actor};
            })

        })
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
                                        <FontAwesomeIcon icon={faUser}/> {currentUser.name}
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
                        <Route path="/" component={Home} exact/>
                        <Route path="/login" component={LogIn} exact/>
                        <Route path="/register" component={Register} exact/>
                        <Route path="/addMovie" render={()=><AddMovie User={currentUser.username} onNewMovieAddedWithImg={this.createMovie}/> }/>
                        <Route path="/editMovie/:name" render={()=> <EditMovie onSubmit={this.updateMovie}/>} />
                        <Route path="/movie/:id" render={()=> <Movie />} />
                        <Route path="/addActor" render={()=><AddActor onNewActorAddedWithImg={this.createActor}/>} />
                        <Route path="/addGenre" render={()=><AddGenre onNewGenreAdded={this.createGenre}/>} />
                        <Route path="/profile" render={()=> <Profile onDelete={this.deleteMovie}/>}  />
                        <Route path="/allActors" render={()=> <ListActors onDelete={this.deleteActor}/>}  />
                        <Route path="/allUsers" render={()=> <ListUser onDelete={this.deleteUser} />}  />
                        <Route component={NotFound} />
                    </Switch>
            </Router>
        );
    };
}

export default App;
