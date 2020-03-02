import React, { Component } from 'react';
import axios from "../../../custom-axios/axios";
import {Link} from "react-router-dom";
import Navigation from '../../elements/Navigation/Navigation';
import UserService from '../../../repository/axiosUserRepository';
import './Profile.css';

class Profile extends Component{


    constructor(props){
        super(props);

        this.state={
            user:UserService.currentUserValue,
            movie:[],
            userDetails:[]
        };
    }


    componentDidMount() {

        if(!UserService.currentUserValue){
            this.props.history.push('/');
            return;
        }


            axios.get("/movie/all").then((response) => {
                this.setState(
                    {
                        movie:response.data
                    }
                )
            });

            axios.get("/user?id="+this.state.user.id).then((response)=>{
                this.setState(
                    {
                        userDetails:response.data
                    }
                )

            });

    }

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

            <div>
                <Navigation movie="Profile" />
                <div>
                    <div className="row" style={{backgroundColor:'#1c1c1c', fontFamily: 'Helvetica'}}>
                        {this.state.userDetails.role === 'USER' &&
                        <div className="col-md-4">
                            <br/>
                            <br/>
                            <br/>
                            {$preview}
                            <p className="font-italic nameProfile" style={{color:'white',marginLeft:'80px',fontFamily: 'Helvetica'}}>{this.state.userDetails.name}</p>
                            <p className="font-italic" style={{color:'white',marginLeft:'40px',fontSize:'20px',fontFamily: 'Helvetica'}}>{this.state.userDetails.email}</p>
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
                        {this.state.userDetails.role === 'ADMIN' &&
                        <div className="col-md-4">
                            <br/>
                            <br/>
                            <br/>
                            {$preview}
                            <br/>
                            <br/>
                            <p className="font-italic nameProfile" style={{color:'white',marginLeft:'120px',fontFamily: 'Helvetica'}}>{this.state.userDetails.name}</p>
                            <p className="font-italic" style={{color:'white',marginLeft:'40px',fontSize:'20px',fontFamily: 'Helvetica'}}>{this.state.userDetails.email}</p>
                            <br/>
                            <span>
                                <Link to={"/editUser/"+this.state.userDetails.id} style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-edit">
                            <span className="font-italic">Edit my profile</span>
                            </i>
                            </Link>
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
                            <Link to="/addGenre" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-plus">
                            <span className="font-italic">Add new genre</span>
                            </i>
                            </Link>
                            </span>
                            <br/>
                            <span>
                            <Link to="/allActors" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                            <i className="fa fa-list">
                            <span className="font-italic">List of all actors</span>
                            </i>
                            </Link>
                            </span>
                            <br/>
                            <span>
                                <Link to="/allUsers" style={{color:'white', marginLeft:'15px',fontSize: '18px',fontFamily: 'Helvetica'}}>
                                    <i className="fa fa-list">
                                    <span className="font-italic">List of all users</span>
                                    </i>
                                </Link>
                            </span>
                        </div>

                        }
                        {this.state.userDetails.role === 'ADMIN' &&
                        <div className="col-md-8" style={{color: 'white'}}>
                            <br/>
                            <br/>
                            <p className="font-italic"
                               style={{fontSize: '25px', color: 'white', fontFamily: 'Helvetica'}}>All movies</p>
                            <hr className="new4"/>
                            <div className="grid-content">
                                {this.state.movie && this.state.movie.map((element, i) => (
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
                                            <Link to={"/editMovie/" + element.id}  style={{color: 'white', fontSize: '20px', fontFamily: 'Helvetica'}} >
                                                <i className="fa fa-edit">
                                                    <span className="font-italic">Edit this movie</span>
                                                </i>
                                            </Link>
                                            <br/>
                                            <a  href="" className="" onClick={() => this.props.onDelete(element.id)}  style={{color: 'white', fontSize: '20px', fontFamily: 'Helvetica'}}>
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
                        {this.state.userDetails.role === 'USER' &&
                        <div className="col-md-8" style={{color: 'white'}}>
                            <br/>
                            <br/>
                            <p className="font-italic"
                               style={{fontSize: '25px', color: 'white', fontFamily: 'Helvetica'}}>Liked movies</p>
                            <hr className="new4"/>
                            <div className="grid-content">
                                {this.state.movie && this.state.movie.map((element, i) => (
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
                                            <a  href="" className="ml-3" onClick={() => this.props.onDelete(element.id)}  style={{color: 'white', fontSize: '20px', fontFamily: 'Helvetica'}}>
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
    }
};

export default Profile;
