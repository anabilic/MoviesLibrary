import React , { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import './AddMovie.css'
import ActorService from "../../../repository/axiosActorRepository";
import GenreService from "../../../repository/axiosGenreRepository";



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
    const languages = [
        { key: 'Albanian', text: 'Albanian', value: 'Albanian' },
        { key: 'Bosnian', text: 'Bosnian', value: 'Bosnian' },
        { key: 'Bulgarian', text: 'Bulgarian', value: 'Bulgarian' },
        { key: 'Croatian', text: 'Croatian', value: 'Croatian' },
        { key: 'English', text: 'English', value: 'English' },
        { key: 'French', text: 'French', value: 'French' },
        { key: 'German', text: 'German', value: 'German' },
        { key: 'Greek', text: 'Greek', value: 'Greek' },
        { key: 'Italian', text: 'Italian', value: 'Italian' },
        { key: 'Macedonian', text: 'Macedonian', value: 'Macedonian' },
        { key: 'Portuguese', text: 'Portuguese', value: 'Portuguese' },
        { key: 'Russian', text: 'Russian', value: 'Russian' },
        { key: 'Serbian', text: 'Serbian', value: 'Serbian' },
        { key: 'Spanish', text: 'Spanish', value: 'Spanish' }
    ];


class AddMovieClass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            genres: [],
            actors: [],
            options: [],
            selectedTeam: '',
            selectedFile:null,
            languageSelected:{},
            genreSelected:{},
            actorSelected:{},
            pom:[]
        };
    }


    componentDidMount() {
        this.loadActors();
        this.loadGenres();

            this.setState((prevState) => {
                return {
                    "options": [...this.state.options, ...languages],
                }
            }, () => {
               // console.log('test', this.state.options)
            });
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

        // var language=[];
        // language = e.target.options;
        // console.log(language);
        // var value = [];
        // for (let i = 0, l = language.length; i < l; i++) {
        //     if (language[i].selected) {
        //         value.push(language[i].value);
        //     }
        // }
        //
        // this.setState((prevState) => {
        //     return {
        //         "languageSelected": value
        //     }
        // });
        //
        // var genre =[];
        // genre = e.target.language;
        // var genreValue = [];
        // for (let i = 0, l = genre.length; i < l; i++) {
        //     if (genre[i].selected) {
        //         genreValue.push(genre[i].value);
        //     }
        // }
        //
        // this.setState((prevState) => {
        //     return {
        //         "genreSelected": genreValue
        //     }
        // });
        //
        //
        //
        // var actor = [];
        // actor = e.target.language;
        // var actorValue = [];
        // for (let i = 0, l = actor.length; i < l; i++) {
        //     if (actor[i].selected) {
        //         actorValue.push(actor[i].value);
        //     }
        // }
        //
        // this.setState((prevState) => {
        //     return {
        //         "actorSelected": actorValue
        //     }
        // });
        
        const formData = new FormData();
        formData.append('name',e.target.name.value);
        formData.append('director',e.target.director.value);
        formData.append('runningTime',e.target.runningTime.value);
        formData.append('plot',e.target.plot.value);
        formData.append('language',this.state.languageSelected);
        formData.append('releaseInformation',e.target.releaseInformation.value);
        formData.append('genre',this.state.genreSelected);
        formData.append('actors',this.state.actorSelected);
        formData.append('file', this.state.selectedFile);
        console.log('Form data:' + formData);
        console.log('Selected File ' + this.state.selectedFile);
        this.props.onNewMovieAddedWithImg(formData);

    };


    getValueLanguage = (event, {value}) => {
        console.log(value);
        let text = event.target.textContent;
        console.log(text);

        this.setState({languageSelected:value});
    };

    getValueActors = (event, {value}) => {
        console.log(value);
        let text = event.target.textContent;
        console.log(text);

        this.setState({actorSelected:value});
    };

    getValueGenres = (event, {value}) => {
        console.log(value);
        let text = event.target.textContent;
        console.log(text);

        this.setState({genreSelected:value});
    };

    render() {
        console.log('State: ' + this.state.actorSelected);
        console.log('State Language: ' + this.state.languageSelected);
        console.log('State Genre' + this.state.genreSelected);

       // const pomosna = this.state.options.map(({ KEY, ID , LANGUAGE }) => ({ key:KEY, value: ID, text: LANGUAGE }));

       // console.log('Pom: ' + pomosna);
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
                            <label style={{color: '#800000', fontSize: 'medium'}}>Original Language</label>
                            <Dropdown style={{fontStyle: 'italic'}} name={"language"} id="language"
                                      text='Select language...'
                                      onChange={this.getValueLanguage}
                                      renderLabel={({ text }) => text}
                                      fluid multiple selection options={this.state.options} />
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
                        <Dropdown name={"genre"} id="genre" style={{fontStyle: 'italic'}} text='Select genres...' fluid
                                  multiple selection
                                  onChange={this.getValueGenres}
                                  renderLabel={({ text }) => text}
                                  options={this.makeGenresKeys()}/>
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Actors</label>
                        <Dropdown name={"actors"} id="actor" style={{fontStyle: 'italic'}} text='Select actors...' fluid
                                  multiple selection
                                  onChange={this.getValueActors}
                                  renderLabel={({ text }) => text}                                  options={this.makeActorsKeys()}/>
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
export  default  AddMovieClass;