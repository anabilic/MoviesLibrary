import React, { useState,useEffect } from 'react';
import axios from "../../../custom-axios/axios";
import {Link} from "react-router-dom";
import Navigation from '../../elements/Navigation/Navigation';
import UserService from '../../../repository/axiosUserRepository';
import './Profile.css';

const Profile = (props) => {

    if(!UserService.currentUserValue){
        this.props.history.push('/');
        return;
    }

    const [user,setUser] = useState({});
    const [movie,setMovies] = useState({});


    useEffect(() => {

        setUser(UserService.currentUserValue);

        axios.get("/movie").then((data) => {
            setMovies(data.data);
        });

    },[]);

    const movies = Object.values(movie);


    return(

        <div>
            <Navigation movie="Profile" />
            {/*style={{backgroundColor:'#1c1c1c', height:'100%', width:'100%', position:'absolute'}}*/}
            <div>
                <div className="row"style={{backgroundColor:'#1c1c1c', fontFamily: 'Helvetica'}}>
                        {user.role === 'USER' &&
                        <div className="col-md-4">
                            <br/>
                            <br/>
                            <br/>
                        {user.gender === 'Female' &&
                            <img alt="" src="./images/avatarFemale.png" className="topPhoto rounded"/>
                        }
                        {user.gender === 'Male' &&
                            <img alt="" src="./images/avatarMaler.png" className="topPhoto rounded"/>
                        }
                            <p className="font-italic nameProfile" style={{color:'white',marginLeft:'80px',fontFamily: 'Helvetica'}}>{user.name}</p>
                            <p className="font-italic" style={{color:'white',marginLeft:'40px',fontSize:'20px',fontFamily: 'Helvetica'}}>{user.email}</p>
                            <br/>
                            <span>
                            <a href='' style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-edit">
                            <span className="font-italic">Edit my profile</span>
                            </i>
                            </a>
                            </span>
                            </div>
                        }
                        {user.role === 'ADMIN' &&
                        <div className="col-md-4">
                            <br/>
                            <br/>
                            <br/>
                            {user.gender === 'Female' &&
                            <img alt="" src="./images/avatarFemale.png" className="topPhoto rounded"/>
                            }
                            {user.gender === 'Male' &&
                            <img alt="" src="./images/avatarMaler.png" className="topPhoto rounded"/>
                            }
                        <p className="font-italic nameProfile" style={{color:'white',marginLeft:'80px',fontFamily: 'Helvetica'}}>{user.name}</p>
                        <p className="font-italic" style={{color:'white',marginLeft:'40px',fontSize:'20px',fontFamily: 'Helvetica'}}>{user.email}</p>
                            <br/>
                            <span>
                            <a href='' style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-edit">
                            <span className="font-italic">Edit my profile</span>
                            </i>
                            </a>
                            </span>
                            <br/>
                            <span>
                            <Link to="/addMovie" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-plus">
                            <span className="font-italic">Add new movie</span>
                            </i>
                            </Link>
                            </span>
                            <br/>
                            <span>
                            <Link to="/addActor" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-plus">
                            <span className="font-italic">Add new actor</span>
                            </i>
                            </Link>
                            </span>
                            <br/>
                            <span>
                            <a href="" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-list">
                            <span className="font-italic">List of all actors</span>
                            </i>
                            </a>
                            </span>
                            <br/>
                            <span>
                            <a href="" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-list">
                            <span className="font-italic">List of all users</span>
                            </i>
                            </a>
                            </span>
                        </div>

                        }
                    {user.role === 'ADMIN' &&
                    <div className="col-md-8" style={{color: 'white'}}>
                        <br/>
                        <br/>
                        <p className="font-italic"
                           style={{fontSize: '25px', color: 'white', fontFamily: 'Helvetica'}}>All movies</p>
                        <hr className="new4"/>
                        <div className="grid-content">
                            {movies && movies.map((element, i) => (
                                <div key={i}>
                                    <div>
                                        <Link to={"/movie/" + element.id}>
                                            <img alt="" className="rounded"
                                                 style={{width: '200px', height: '250', fontFamily: 'Helvetica'}}
                                                 src={`data:image/jpeg;base64,${element.file}`}/>
                                        </Link>
                                    </div>
                                    <div>
                                        <span className="ml-1 font-weight-bold" style={{ fontSize: '18px', color: 'red', fontFamily: 'Helvetica'}}>{element.name}</span>
                                        <br/>
                                        <Link to={"/editMovie/" + element.name}  style={{color: 'white', fontSize: '20px', fontFamily: 'Helvetica',display:'flex'}} >
                                            <i className="fa fa-edit">
                                                <span className="font-italic">Edit this movie</span>
                                            </i>
                                        </Link>
                                        <a  href="" className="ml-3" onClick={() => props.onDelete(element.id)}  style={{color: 'white', fontSize: '20px', fontFamily: 'Helvetica'}}>
                                            <i className="fa fa-trash-o">
                                                <span className="font-italic">Delete this movie</span>
                                            </i>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    }
                    {user.role === 'USER' &&
                    <div className="col-md-8" style={{color: 'white'}}>
                        <br/>
                        <br/>
                        <p className="font-italic"
                           style={{fontSize: '25px', color: 'white', fontFamily: 'Helvetica'}}>Liked movies</p>
                        <hr className="new4"/>
                        <div className="grid-content">
                            {movies && movies.map((element, i) => (
                                <div key={i}>
                                    <div>
                                        <Link to={"/movie/" + element.id}>
                                            <img  alt="" className="rounded"
                                                 style={{width: '250px', height: '300px', fontFamily: 'Helvetica'}}
                                                 src={`data:image/jpeg;base64,${element.file}`}/>
                                        </Link>
                                    </div>
                                    <div>
                                        <span className="ml-1 font-weight-bold" style={{
                                            fontSize: '18px',
                                            color: 'red',
                                            fontFamily: 'Helvetica'
                                        }}>{element.name}</span>
                                        <br/>
                                        <a className="ml-3" href=""
                                           style={{color: 'white', fontSize: '20px', fontFamily: 'Helvetica'}}>
                                            <i className="fa fa-edit">
                                                <span className="font-italic">Edit this movie</span>
                                            </i>
                                        </a>
                                        {/*clickable={true} className="clickable"*/}
                                        <a  href="" className="ml-3" onClick={() => props.onDelete(element.id)}  style={{color: 'white', fontSize: '20px', fontFamily: 'Helvetica'}}>
                                            <i className="fa fa-trash-o">
                                                <span className="font-italic">Delete this movie</span>
                                            </i>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Profile;
