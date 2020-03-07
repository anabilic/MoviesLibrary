import React , {useState,useEffect} from 'react';
import axios from '../../../custom-axios/axios';
import {useHistory} from "react-router";
import {useParams} from "react-router";
import './EditMovie.css'

const EditMovie = (props) => {

    const [movie,setMovie] = useState({});
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {

        axios.get("/movie/id/"+id).then((data)=>{
            setMovie(data.data);
        });

    },[]);



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
        });

        history.push("/profile");

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