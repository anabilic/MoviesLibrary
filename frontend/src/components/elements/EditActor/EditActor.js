import React,{useEffect,useState} from 'react';
import {useHistory, useParams} from "react-router";
import axios from "../../../custom-axios/axios";
import './EditActor.css'

const EditActor = (props) => {

    const [actor,setActor] = useState({});
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.get("/actor/id/"+id).then((data)=>{
            setActor(data.data);
        });
    },[]);


    const onFormSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({
            "id":id,
            "name": e.target.name.value,
            "castName": e.target.castName.value,
            "biography": e.target.biography.value,
            "dateOfBirth": e.target.dateOfBirth.value,
            "placeOfBirth":e.target.placeOfBirth.value,
        });


        history.push("/allActors");

    };

    const handleTermOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setActor({
            [paramName]:paramValue
        });
    };



    return (

        <div className="container">
            <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                <form className="ui form" onSubmit={onFormSubmit}>
                    <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Edit Actor</h4>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Name</label>
                        <div className="">
                            <input type="text" name={"name"} id="name" value={actor.name} onChange={handleTermOnChange} placeholder="Enter actors name..." style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Cast name:</label>
                        <div className="field">
                            <input type="text" name={"castName"} id="castName" value={actor.castName} onChange={handleTermOnChange} placeholder="Enter actors cast name..." style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Biography:</label>
                        <textarea name={"biography"} id="biography"  defaultValue={actor.biography} onChange={handleTermOnChange} style={{fontStyle: 'italic'}}
                                  placeholder="Enter biography..."></textarea>
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Date of Birth:</label>
                        <input name={"dateOfBirth"} id="dateOfBirth" type="date" value={actor.dateOfBirth} onChange={handleTermOnChange}
                               style={{fontStyle: 'italic'}}/>
                    </div>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Place of Birth:</label>
                        <div className="field">
                            <input type="text" name={"placeOfBirth"} id="placeOfBirth"  value={actor.placeOfBirth} onChange={handleTermOnChange} placeholder="Enter place of birth..." style={{fontStyle:'italic'}}/>
                        </div>
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

export default EditActor;