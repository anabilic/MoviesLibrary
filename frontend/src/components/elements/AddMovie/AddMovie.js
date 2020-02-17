import React , { Component } from 'react';
import {Dropdown, List} from 'semantic-ui-react';
import ActorService from "../../../repository/axiosActorRepository";
import GenreService from "../../../repository/axiosGenreRepository";
import './AddMovie.css'



function objectToArray(obj) {
    var array = [], tempObject;

    for (var key in obj) {

        tempObject = obj[key];

        if (is_object(obj[key])) {
            tempObject = objectToArray(obj[key]);
        }
        array[key] = tempObject;
    }
    return array;
}

function is_object(mixed_var){
    if (mixed_var instanceof Array) {
        return false;
    }else{
        return (mixed_var !== null) && (typeof( mixed_var ) === 'object');
    }
}

class AddMovie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            genres: [],
            actors: [],
            options: [],
            selectedFile:null,
            genreSelected:[],
            actorSelected:{},
        };
    }


    componentDidMount() {
        this.loadActors();
        this.loadGenres();
    }

    makeActorsKeys(){
        const arrayOfActors = objectToArray(this.state.actors);
        const item = [];

        for (let i = 0; i < arrayOfActors.length; i++) {
            let actorName = arrayOfActors[i].name;
            item.push({key: actorName, text: actorName, value: actorName});
        }

        return item;
    }

    makeGenresKeys(){
        const arrayOfGenres = objectToArray(this.state.genres);

        const items = [];
        for (let i = 0; i < arrayOfGenres.length; i++) {
            let GENRE = arrayOfGenres[i].name;
            items.push({key: GENRE, text: GENRE, value: GENRE} );
        }

        return items;
    }

    loadActors = () => {
        ActorService.getActors().then(response => {
            this.setState((prevState) => {
                return {
                    "actors": response.data,
                }
            })
        })
    };

    loadGenres = () => {
        GenreService.getGenres().then(response => {
            this.setState((prevState) => {
                return {
                    "genres": response.data,
                }
            })
        })
    };

    onFileChangeHandler = (e) => {
        e.preventDefault();
        let file=e.target.files[0];
        this.setState({selectedFile:file});

    };


    onFormSubmit = (e) => {

        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name',e.target.name.value);
        formData.append('director',e.target.director.value);
        formData.append('runningTime',e.target.runningTime.value);
        formData.append('plot',e.target.plot.value);
        formData.append('originalLanguage',e.target.originalLanguage.value);
        formData.append('releaseInformation',e.target.releaseInformation.value);
        formData.append('genres',this.state.genreSelected);
        formData.append('actors',this.state.actorSelected);
        formData.append('file', this.state.selectedFile);
        formData.append('user',this.props.User);

        this.props.onNewMovieAddedWithImg(formData);

    };


    handleChangeActors = (e, { value }) => {
        if (this.state.actorSelected.length > value.length) { // an item has been removed
            const difference = this.state.actorSelected.filter(
                x => !value.includes(x),
            );
            console.log(difference); // this is the item
            return false;
        }
        return this.setState({ actorSelected: value });
    };

    handleChangeGenres = (e, { value }) => {
        if (this.state.genreSelected.length > value.length) { // an item has been removed
            const difference = this.state.genreSelected.filter(
                x => !value.includes(x),
            );
            console.log(difference); // this is the item
            return false;
        }
        return this.setState({ genreSelected: value });
    };



    render() {

        return(
            <div className="container">
                <div style={{borderColor: 'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <h4 className="ui dividing header"
                        style={{color: '#800000', fontSize: 'xx-large', fontStyle: 'italic'}}>Add Movie</h4>
                    <br/>

                    <div className="field">
                        <label id="name" style={{color: '#800000', fontSize: 'medium'}}>Name</label>
                        <div className="">
                            <input type="text" name={"name"} id="name" placeholder="Enter movie name..."
                                   style={{fontStyle: 'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label id="director" style={{color: '#800000', fontSize: 'medium'}}>Director/s:</label>
                        <div className="field">
                            <input type="text" name={"director"} id="director" placeholder="Enter director/s..."
                                   style={{fontStyle: 'italic'}}/>
                        </div>
                    </div>

                    <br/>

                    <div className="two fields">
                        <div className="field">
                            <label style={{color: '#800000', fontSize: 'medium'}}>Original Language:</label>
                            <input type="text" name={"originalLanguage"} id="originalLanguage" placeholder="Enter original language..."
                                   style={{fontStyle: 'italic'}}/>
                        </div>
                        <div className="field">
                            <label style={{color: '#800000', fontSize: 'medium'}}>Running Time:</label>
                            <input type="text" name={"runningTime"} id="runningTime" placeholder="Enter running time..."
                                   style={{fontStyle: 'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Plot</label>
                        <textarea name={"plot"} id="plot" style={{fontStyle: 'italic'}}
                                  placeholder="Enter plot..."></textarea>
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Release Information:</label>
                        <input name={"releaseInformation"} id="releaseInformation" type="datetime-local"
                               style={{fontStyle: 'italic'}}/>
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Genre</label>
                        <Dropdown name={"genres"} id="genres" style={{fontStyle: 'italic'}} text='Select genres...' fluid
                                  multiple selection
                                  onChange={this.handleChangeGenres}
                                  renderLabel={({ text }) => text}
                                  options={this.makeGenresKeys()}/>
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Actors</label>
                        <Dropdown name={"actors"} id="actors" style={{fontStyle: 'italic'}} text='Select actors...' fluid
                                  multiple selection
                                  onChange={this.handleChangeActors}
                                  renderLabel={({ text }) => text}
                                  options={this.makeActorsKeys()}/>
                    </div>
                    <br/>

                    <div className="ui form">
                        <div className="field">
                            <label style={{color: '#800000', fontSize: 'medium'}}>Image</label>
                            <div className="field">
                                <input type="file" name={"file"} id="file" placeholder="Image"
                                       onChange={(event => this.onFileChangeHandler(event))}  style={{fontStyle: 'italic'}}/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>

                    <div className="ui large buttons" style={{width: '800px', marginLeft: '110px'}}>
                        <button className="ui button" type="submit"
                                style={{backgroundColor: ' #800000', fontSize: 'large', color: 'black'}}>Save
                        </button>
                        <div className="or"></div>
                        <button className="ui button"
                                style={{backgroundColor: ' #800000', fontSize: 'large', color: 'black'}}>Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>

);
    };
}
export  default  AddMovie;