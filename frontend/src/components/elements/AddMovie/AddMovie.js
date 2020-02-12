import React , {useState,useEffect} from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from '../../../custom-axios/axios';
import './AddMovie.css'
import { useHistory} from 'react-router-dom';


const AddMovie = () => {

    const history = useHistory();

    const [genres,setGenres] = useState({});
    const [actors,setActors] = useState({});
    let [languageSelect,setLanguageSelect] = useState({});
    let [genreSelect,setGenreSelect] = useState({});
    let [actorSelect,setActorSelect] = useState({});



    useEffect(() => {
        axios.get("/genre").then((data)=>{
            setGenres(data.data);
        });
        axios.get("/actor").then((data)=>{
                setActors(data.data);
        })
    },[]);


    function is_object(mixed_var){
        if (mixed_var instanceof Array) {
            return false;
        }else{
            return (mixed_var !== null) && (typeof( mixed_var ) === 'object');
        }
    }

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

    const arrayOfActors = objectToArray(actors);
    const item = [];

        for (let i = 0; i < arrayOfActors.length; i++) {
            let actorName = arrayOfActors[i].name;
            item.push({key: actorName, text: actorName, value: actorName});
        }


        const items = [];
        for (let i = 0; i < genres.length; i++) {
            let GENRE = genres[i].name;
            items.push({key: GENRE, text: GENRE, value: GENRE} );
        }

    const options = [
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


    const onFileChangeHandler = (e) => {

        e.preventDefault();

        var language=[];
        language = e.target.language;
        var value = [];
        for (let i = 0, l = language.length; i < l; i++) {
            if (language[i].selected) {
                value.push(language[i].value);
            }
        }

        setLanguageSelect=value;

        var genre =[];
        genre = e.target.language;
        var genreValue = [];
        for (let i = 0, l = genre.length; i < l; i++) {
            if (genre[i].selected) {
                genreValue.push(genre[i].value);
            }
        }


        var actor = [];
        actor = e.target.language;
        var actorValue = [];
        for (let i = 0, l = actor.length; i < l; i++) {
            if (actor[i].selected) {
                actorValue.push(actor[i].value);
            }
        }

        const formData = new FormData();
        // formData.append('name',e.target.name.value);
        // formData.append('director',e.target.director.value);
        // formData.append('runningTime',e.target.runningTime.value);
        // formData.append('language');
        // formData.append('releaseInformation',e.target.releaseInformation.value);
        // formData.append('genre',genreValue);
        // formData.append('actors',actorValue);
        // formData.append('file', e.target.files[0]);

        this.props.onNewMovieAdded(formData);

        history.push("/");

    };

    return (

        <div className="container">
            <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
            <form className="ui form" onSubmit={onFileChangeHandler}>
                <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Add Movie</h4>
                <br/>

                <div className="field">
                    <label  style={{color:'#800000',fontSize:'medium'}}>Name</label>
                    <div className="">
                        <input type="text" name={"name"} placeholder="Enter movie name..." style={{fontStyle:'italic'}}/>
                    </div>
                </div>
                <br/>

                <div className="field">
                    <label  style={{color:'#800000',fontSize:'medium'}}>Director/s:</label>
                    <div className="field">
                        <input type="text" name={"director"} placeholder="Enter director/s..." style={{fontStyle:'italic'}}/>
                    </div>
                </div>
                <br/>

                <div className="two fields">
                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Original Language</label>
                        <Dropdown style={{fontStyle:'italic'}} name="language" text='Select language...' fluid multiple selection options={options} />
                    </div>

                    <div className="field">
                        <label style={{color:'#800000',fontSize:'medium'}}>Running Time:</label>
                        <input type="text" name="runningTime" placeholder="Enter running time..." style={{fontStyle:'italic'}}/>
                    </div>
                </div>
                <br/>

                <div className="field">
                    <label  style={{color:'#800000',fontSize:'medium'}}>Plot</label>
                    <textarea name="plot" style={{fontStyle:'italic'}} placeholder="Enter plot..."></textarea>
                </div>
                <br/>

                <div className="field">
                    <label  style={{color:'#800000',fontSize:'medium'}}>Release Information:</label>
                    <input name="releaseInformation" type="datetime-local" style={{fontStyle:'italic'}}/>
                </div>
                <br/>

                <div className="field">
                    <label  style={{color:'#800000',fontSize:'medium'}}>Genre</label>
                    <Dropdown name="genre" style={{fontStyle:'italic'}} text='Select genres...' fluid multiple selection options={items} />
                </div>
                <br/>

                <div className="field">
                    <label  style={{color:'#800000',fontSize:'medium'}}>Actors</label>
                    <Dropdown name="actors" style={{fontStyle:'italic'}} text='Select actors...' fluid multiple selection options={item} />
                </div>
                <br/>

                <div className="ui form">
                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Image</label>
                        <div className="field">
                            <input type="file" name={"file"} placeholder="Image" style={{fontStyle:'italic'}} />
                        </div>
                    </div>
                </div>
                <br/>
                <br/>

                <div className="ui large buttons" style={{width: '800px', marginLeft: '110px'}}>
                    <button className="ui button" type="submit" style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}>Save</button>
                    <div className="or"></div>
                    <button className="ui button"  style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}>Cancel</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default AddMovie;