import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { Table } from 'semantic-ui-react'
import axios from "../../../custom-axios/axios";
import Navigation from "../Navigation/Navigation";


const ListGenres = (props) =>{

    const [genres,setGenres] =useState({});

    useEffect(()=>{
        axios.get("/genre").then((data) => {
            setGenres(data.data);
        });
    },[]);

    const genreList = Object.values(genres);

    return(
        <div>
            <Navigation movie='List of All Users' />
            <br/>
            <br/>
            <div style={{marginLeft: '500px',borderColor:'black'}}>
                <Table basic='very' celled collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Genre Name</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {genreList && genreList.map( (element, i) => (
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                            {element.name}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={"/editGenre/"+element.id} style={{color: 'black', fontSize: '16px', fontFamily: 'Helvetica'}}>
                                        <i className="fa fa-edit">
                                            <span className="font-italic">Edit this genre</span>
                                        </i>
                                    </Link>

                                    <a  href="" className="ml-3"  onClick={() => props.onDelete(element.id)}  style={{color: 'black', fontSize: '16px', fontFamily: 'Helvetica'}}>
                                        <i className="fa fa-trash-o">
                                            <span className="font-italic">Delete this genre</span>
                                        </i>
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            </div>
        </div>
    );
};

export default ListGenres;