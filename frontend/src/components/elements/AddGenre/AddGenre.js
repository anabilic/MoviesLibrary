import React, {Component} from 'react';
import {Link} from "react-router-dom";
import GenreService from "../../../repository/axiosGenreRepository";
import { Redirect } from "react-router";
import './AddGenre.css'

class AddGenre extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect:false,
            genres:[],
            errorMessageGenre:false,
            redirectForGenre:false
        };
    }


    onFormSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('name',e.target.name.value);

        GenreService.addGenre(formData).then((response) => {
            const genre = response.data;
            this.setState({redirectForGenre:true });
            this.setState((prevState) => {
                const newGenreRef = [...prevState.genres, genre];
                newGenreRef.filter((g)=> {
                    return {
                        "genres": g
                    }
                })
            });
            },error => {
                if (error.response.status === 409) {
                    this.setState({
                        errorMessageGenre:true
                    });
                }
            });


         if(this.state.errorMessageGenre){
            this.setState({redirect:true});
        }

    };

    render() {

        if (this.state.redirectForGenre) {
            return <Redirect to='/allGenres'/>;
        }

        return (
            <div className="container">
                <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                    <form className="ui form" onSubmit={this.onFormSubmit}>
                        <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Add Genre</h4>
                        <br/>

                        {this.state.errorMessageGenre &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Error! Name is not valid. It already exists!</strong>
                        </div>
                        }

                        <div className="field">
                            <label  style={{color:'#800000',fontSize:'medium'}}>Genre Name:</label>
                            <div className="">
                                <input type="text" name={"name"} id="name" placeholder="Enter genre ..." style={{fontStyle:'italic'}}/>
                            </div>
                        </div>
                        <br/>

                        <div className="ui medium buttons" style={{width: '800px', marginLeft: '110px'}}>
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

export default AddGenre;