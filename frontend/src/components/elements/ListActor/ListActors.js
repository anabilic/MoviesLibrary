import React, {useState,useEffect} from 'react';
import OneGrid from "../../OneGrid/OneGrid";
import axios from "../../../custom-axios/axios";
import './ListActors.css';
import Navigation from "../Navigation/Navigation";
import {Link} from "react-router-dom";

const ListActors = (props) => {

    const [actors,setActors] =useState({});

    useEffect(()=>{
        axios.get("/actor").then((data) => {
            setActors(data.data);
        });
    },[]);

    const actorsList = Object.values(actors);
    console.log(actorsList);


    return(
        <div>
        <Navigation movie='List of All Actors' />
        <div className="col-md-12">
            <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="cardd card-container">
                <OneGrid header={'Actors'}>
                    {actorsList && actorsList.map( (element, i) => (
                        <div className="imdb-actor">
                            <img
                                src={element.imageActor ? `data:image/jpeg;base64,${element.imageActor}` : './images/no_image.jpg'}
                                alt="ictorthumb"
                            />
                            <b><span className="imdb-actor-name">{element.name}</span></b>
                            <p className="imdb-actor-c">Cast Name:</p>
                            <span className="imdb-actor-character">{element.castName}</span>
                            <p className="imdb-actor-c">Birth Date:</p>
                            <p className="imdb-actor-character">{element.dateOfBirth}</p>
                            <p className="imdb-actor-c">Birth Place:</p>
                            <p className="imdb-actor-character">{element.placeOfBirth}</p>
                            <p className="imdb-actor-c">Biography:</p>
                            <p className="imdb-actor-character">{element.biography}</p>

                            <a className="" href="ml-3" style={{color: 'white', fontSize: '20px', fontFamily: 'Helvetica'}}>
                                    <i className="fa fa-edit">
                                        <span className="font-italic">Edit this actor</span>
                                    </i>
                            </a>
                            <a  href="" className="ml-3" onClick={() => props.onDelete(element.id)}  style={{color: 'white', fontSize: '20px', fontFamily: 'Helvetica'}}>
                                    <i className="fa fa-trash-o">
                                        <span className="font-italic">Delete this actor</span>
                                    </i>
                            </a>

                        </div>
                    ))}
                </OneGrid>
            </div>
        </div>
        </div>
    );
};

export default ListActors;