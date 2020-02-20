import React from 'react';
import './Profile.css';
import Navigation from '../../elements/Navigation/Navigation';


const Profile = () => {

return(

        <div>

            <Navigation movie="Profile" />

            <div style={{backgroundColor:'#1c1c1c', height:'100%', width:'100%', position:'absolute'}}>
                <div className="row">
                    <div className="col-md-4">
                        <br/>
                        <br/>
                        <img alt="" src="./images/avatarTransparent.png" className="topPhoto rounded"/>
                        <br/>

                    <p className="font-italic nameProfile" style={{color:'#800000', marginLeft:'15px'}}>Name and Surname</p>
                    <span>
                        <a href='' style={{color:'white', marginLeft:'15px',fontSize: '18px'}}>
                            <i className="fa fa-edit">
                            <span className="font-italic">Edit my profile</span>
                            </i>
                        </a>
                    </span>

                    <br/>

                    <span>
                        <a href="" style={{color:'white', marginLeft:'15px',fontSize: '18px'}}>
                            <i className="fa fa-plus">
                                <span className="font-italic">Add new movie</span>
                            </i>
                        </a>
                    </span>
                </div>

                    <div className="col-md-8" style={{color:'#800000'}}>
                        <br/>
                        <br/>
                        <p className="font-weight-bold" style={{fontSize: '25px',color:'#800000'}}>All movies</p>
                        <hr className="new4"/>
                            <div className="font-italic">
                                <div className="row">
                                    <div className="col-md-4 col-sm-6 col-xs-12">
                                        <div className="card-body image-box">
                                            <a href="">
                                                <img alt="" className="rounded" style={{width:'200px', height:'200px' }} src="./images/charlies.jpg"/>
                                            </a>
                                        </div>
                                        <div className="text-left  mt-3 ">
                                            <span className="ml-3" style={{fontSize: '18px'}}>Name Movie</span>
                                            <br/>
                                            <span>
                                                <a className="ml-3" href="" style={{color:'white',fontSize: '15px'}}>
                                                    <i className="fa fa-edit">
                                                        <span className="font-italic">Edit this movie</span>
                                                    </i>
                                                </a>
                                                <br/>
                                                <a className="ml-3" href="" style={{color:'white',fontSize: '15px'}}>
                                                    <i className="fa fa-trash-o">
                                                        <span className="font-italic">
                                                            Delete this movie
                                                        </span>
                                                        </i>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
)
};

export default Profile;
