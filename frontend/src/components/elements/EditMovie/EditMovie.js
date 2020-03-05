import React , {useState,useEffect} from 'react';
import axios from '../../../custom-axios/axios';
import Select from 'react-select';
import {useHistory} from "react-router";
import {useParams} from "react-router";
import './EditMovie.css'

const EditMovie = (props) => {

    const [genres,setGenres] = useState({});
    const [actors,setActors] = useState({});
    const [movie,setMovie] = useState({});
    const [actorSelected,setActorSelected] = useState([]);
    const [genreSelected, setGenreSelected] = useState([]);


    const {id} = useParams();
    console.log(id);
    const history = useHistory();

    useEffect(() => {
        axios.get("/genre").then((data)=>{
            setGenres(data.data);
        });
        axios.get("/actor").then((data)=>{
            setActors(data.data);
        });
        axios.get("/movie/id/"+id).then((data)=>{
            setMovie(data.data);
        });

        console.log(movie);
    },[]);


    function is_object(mixed_var) {
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


    const makeActorsKeys = () => {
        const arrayOfActors = objectToArray(actors);
        const item = [];

        for (let i = 0; i < arrayOfActors.length; i++) {
            let actorName = arrayOfActors[i].name;
            item.push({value: actorName, label: actorName});
        }

        return item;
    };

    const makeGenresKeys = () => {
        const arrayOfGenres = objectToArray(genres);
        const items = [];
        for (let i = 0; i < arrayOfGenres.length; i++) {
            let GENRE = arrayOfGenres[i].name;
            items.push({label: GENRE, value: GENRE} );
        }
        return items;
    };


    const onFormSubmit = (e) => {
        e.preventDefault();


        props.onSubmit({
            "id":id,
            "name": e.target.name.value,
            "director": e.target.director.value,
            "originalLanguage": e.target.originalLanguage.value,
            "plot": e.target.plot.value,
            "runningTime":e.target.runningTime.value,
            "releaseInformation": e.target.releaseInformation.value,
            "genres": genreSelected,
            "actors":actorSelected,
        });


        history.push("/profile");

    };

    const handleChangeActor = (actorSelected) => {
        setActorSelected(() => (actorSelected))
    };

    const handleChangeGenres = (genreSelected) => {
        console.log(genreSelected);
        setGenreSelected(() => (genreSelected));
    };

    const handleTermOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setMovie({
            [paramName]:paramValue
        });
    };


    return (

        <div className="container">
            <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                <form className="ui form" onSubmit={onFormSubmit}>
                    <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Edit Movie</h4>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Name</label>
                        <div className="">
                            <input type="text" name={"name"} id="name" value={movie.name} onChange={handleTermOnChange} placeholder="Enter movie name..." style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Director/s:</label>
                        <div className="field">
                            <input type="text" name={"director"} id="director" value={movie.director} onChange={handleTermOnChange} placeholder="Enter director/s..." style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="two fields">
                        <div className="field">
                            <label style={{color: '#800000', fontSize: 'medium'}}>Original Language:</label>
                            <input type="text" name={"originalLanguage"} id="originalLanguage" value={movie.originalLanguage} onChange={handleTermOnChange} placeholder="Enter original language..."
                                   style={{fontStyle: 'italic'}}/>
                        </div>
                        <div className="field">
                            <label style={{color: '#800000', fontSize: 'medium'}}>Running Time:</label>
                            <input type="text" name={"runningTime"} id="runningTime" value={movie.runningTime} onChange={handleTermOnChange} placeholder="Enter running time..."
                                   style={{fontStyle: 'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Plot</label>
                        <textarea name={"plot"} id="plot" style={{fontStyle:'italic'}} defaultValue={movie.plot} onChange={handleTermOnChange} placeholder="Enter plot..."></textarea>
                    </div>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Release Information:</label>
                        <input type="date" name={"releaseInformation"} id="releaseInformation" value={movie.releaseInformation} onChange={handleTermOnChange} style={{fontStyle:'italic'}}/>
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Genre</label>
                        <Select
                            isMulti
                            value={genreSelected}
                            onChange={handleChangeGenres}
                            options={makeGenresKeys()}
                        />
                        {/*{genreSelected.map(o => <p>{o.value}</p>)}*/}
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Actors</label>
                        {/*<Select*/}
                        {/*    isMulti*/}
                        {/*    value={actorSelected}*/}
                        {/*    onChange={handleChangeActor()}*/}
                        {/*    options={makeActorsKeys()}*/}
                        {/*/>*/}
                    </div>
                    <br/>

                    <div className="ui large buttons" style={{width: '800px', marginLeft: '110px'}}>
                        <button className="ui button" type="submit" style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}>Edit</button>
                        <div className="or"></div>
                        <button className="ui button"  style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMovie;