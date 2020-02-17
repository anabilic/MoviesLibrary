import React from 'react';
import { Router, Link, Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import LogIn from "../Security/LogIn/LogIn";
import Register from "../Security/Register/Register";
import UserService from "../../repository/axiosUserRepository";
import {User} from '../../model/User';
import {createBrowserHistory} from 'history';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import './App.css';
import EditMovie from "../elements/EditMovie/EditMovie";
import MovieService from "../../repository/axiosMovieRepository";
import AddMovieClass from "../elements/AddMovie/AddMovieClass";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: createBrowserHistory(),
            currentUser: new User(),
            movies:[]
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
                                    <Link to="" className="btn btn-outline-danger waves-effect">
                                        <FontAwesomeIcon icon={faUser}/> {currentUser.name}
                                    </Link>
                                    <Link to="" onClick={()=>this.logout()} className="btn btn-outline-danger waves-effect">
                                        Sign Out
                                    </Link>
                                    {/*<button type="button" className="btn btn-outline-danger waves-effect">My profile</button>*/}
                                    {/*<button style={{marginLeft:'10px'}} onClick={() => history.push('/')} type="button" className="btn btn-outline-danger waves-effect">Sign Out</button>*/}
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
                        <Route path="/addMovie" render={()=><AddMovieClass User={currentUser.username} onNewMovieAddedWithImg={this.createMovie}/> }/>
                        <Route path="/editMovie" component={EditMovie} exact />
                    </Switch>
            </Router>
        );
    };
};

export default App;
