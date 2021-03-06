import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ActorService from "../../../repository/axiosActorRepository";
import { Redirect } from "react-router";
import './AddActor.css'

class AddActor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile:null,
            actors:[],
            redirect:false,
            submitted: false,
            errorMessageAuthor:false,
            errorMessageAuthorTwo:false,
            errorMessageAuthorThree:false,
            redirectForActor:false
        };
    }

    onFileChangeHandler = (e) => {
        e.preventDefault();
        let file=e.target.files[0];
        this.setState({selectedFile:file});

    };


    onFormSubmit = (e) => {

        e.preventDefault();

        if (!(e.target.dateOfBirth.value && e.target.name.value && this.state.selectedFile )) {
            this.setState({submitted: true});
            return;
        }

        const formData = new FormData();
        formData.append('name',e.target.name.value);
        formData.append('castName',e.target.castName.value);
        formData.append('file', this.state.selectedFile);
        formData.append('biography', e.target.biography.value);
        formData.append('dateOfBirth', e.target.dateOfBirth.value);
        formData.append('placeOfBirth', e.target.placeOfBirth.value);


        ActorService.addActor(formData).then((response) => {
            const actor = response.data;
            this.setState({redirectForActor:true });
            this.setState((prevState) => {
                const newActorRef = [...prevState.actors, actor];
                newActorRef.filter((a)=> {
                    return {
                        "actors": a
                    }
                })

            });
        },error => {
            if (error.response.status === 409) {
                this.setState({
                    errorMessageAuthor:true
                });
            }else if (error.response.status === 500){
                this.setState({
                    errorMessageAuthorTwo:true
                });
            }else{
                this.setState({
                    errorMessageAuthorThree:true
                });
            }
        });

        if(this.state.errorMessageAuthor || this.state.errorMessageAuthorTwo || this.state.errorMessageAuthorThree){
            this.setState({redirect:true});
        }
    };

    render() {

        if (this.state.redirectForActor) {
            return <Redirect to='/allActors'/>;
        }

    return (
        <div className="container">
            <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Add Actor</h4>
                    <br/>

                    {this.state.errorMessageAuthor && <div className="alert alert-danger errorMessage2 col-md-6"  role="alert">
                        <strong>Error! </strong> Name is already taken!
                    </div>}


                    {this.state.errorMessageAuthorTwo && <div className="alert alert-danger errorMessage2 col-md-6"  role="alert">
                        <strong>Error! </strong> The biography filed should be shorter!
                    </div>}

                    {this.state.errorMessageAuthorThree && <div className="alert alert-danger errorMessage2 col-md-6"  role="alert">
                        <strong>Error! </strong> Some unexpected error happened, try again!
                    </div>}

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Name</label>
                        <div className="">
                            <input type="text" name={"name"} id="name" placeholder="Enter actors name..." style={{fontStyle:'italic'}}/>
                            {this.state.submitted &&
                            <div className="help-block" style={{color: 'red'}}>Name is required!</div>
                            }
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Cast name:</label>
                        <div className="field">
                            <input type="text" name={"castName"} id="castName"  placeholder="Enter actors cast name..." style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Biography:</label>
                        <textarea name={"biography"} id="biography" style={{fontStyle: 'italic'}}
                                  placeholder="Enter biography..."></textarea>
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Date of Birth:</label>
                        <input name={"dateOfBirth"} id="dateOfBirth" type="date"
                               style={{fontStyle: 'italic'}}/>
                        {this.state.submitted &&
                        <div className="help-block" style={{color: 'red'}}>Date of birth is required!</div>
                        }
                    </div>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Place of Birth:</label>
                        <div className="field">
                            <input type="text" name={"placeOfBirth"} id="placeOfBirth"  placeholder="Enter place of birth..." style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="ui form">
                        <div className="field">
                            <label  style={{color:'#800000',fontSize:'medium'}}>Image</label>
                            <div className="field">
                                <input type="file" name={"file"} id="file"  placeholder="Image"
                                       onChange={(event => this.onFileChangeHandler(event))}  style={{fontStyle:'italic'}}/>
                                {this.state.submitted &&
                                <div className="help-block" style={{color: 'red'}}>Image is required!</div>
                                }
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>

                    <div className="ui large buttons" style={{width: '800px', marginLeft: '125px'}}>
                        <button className="ui button" type="submit" style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}>Add</button>
                        <div className="or"></div>
                        <Link to="/profile" className="ui button" style={{backgroundColor:' #800000',fontSize:'large',color:'black',height:'40px'}}>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
    }
}

export default AddActor;