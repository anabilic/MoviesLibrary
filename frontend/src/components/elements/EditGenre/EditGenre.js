import React,{useEffect,useState} from 'react';
import {useHistory, useParams} from "react-router";
import axios from "../../../custom-axios/axios";
import {Link} from "react-router-dom";


const EditGenre = (props) => {

    const [genre,setGenre] = useState({});
    const {id} = useParams();
    const history = useHistory();


    useEffect(() => {
        axios.get("/genre/"+id).then((data)=>{
            setGenre(data.data);
        });
    },[]);


    const onFormSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({
            "id":id,
            "name": e.target.name.value,
        });

            history.push("/allGenres");

    };

    const handleTermOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setGenre({
            [paramName]:paramValue
        });
    };

    return (

        <div className="container">
            <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                <form className="ui form" onSubmit={onFormSubmit}>
                    <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Edit Genre</h4>
                    <br/>
                    {props.errorMessageGenre &&
                    <div className="alert alert-danger" role="alert">
                        <strong>Error! Name is not valid. Already exists! </strong>
                    </div>
                    }
                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Genre Name:</label>
                        <div className="">
                            <input type="text" name={"name"} id="name" value={genre.name} onChange={handleTermOnChange} placeholder="Enter actors name..." style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>
                    <div className="ui large buttons" style={{width: '800px', marginLeft: '110px'}}>
                        <button className="ui button" type="submit" style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}>Edit</button>
                        <div className="or"></div>
                        <Link to="/allGenres"  className="ui button"  style={{height:'40px',backgroundColor:' #800000',fontSize:'large',color:'black'}}>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGenre;