import React, {useEffect, useState} from 'react';
import axios from "../../../custom-axios/axios";
import { Table,Header,Image } from 'semantic-ui-react'
import Navigation from "../Navigation/Navigation";
import './ListUser.css';
import {Link} from "react-router-dom";


const ListUser = (props) =>{

    const [users,setUsers] =useState({});

    useEffect(()=>{
        axios.get("/user").then((data) => {
            setUsers(data.data);
        });
    },[]);

    const userList = Object.values(users);

    return(
        <div>
            <Navigation movie='List of All Users' />
                <br/>
                <br/>
                <div style={{marginLeft: '370px',borderColor:'black'}}>
                <Table basic='very' celled collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>User</Table.HeaderCell>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Gender</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {userList && userList.map( (element, i) => (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Image src={element.file ? `data:image/jpeg;base64,${element.file}` : './images/avatarFemale.png'} rounded size='mini' />
                                    <Header.Content>
                                        {element.name}
                                        <Header.Subheader>{element.email}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Header.Content>
                                    {element.username}
                                </Header.Content>
                            </Table.Cell>
                            <Table.Cell>
                            <Header.Content>
                                {element.gender}
                            </Header.Content>
                        </Table.Cell>
                            <Table.Cell>
                                <Header.Content>
                                    {element.role}
                                </Header.Content>
                            </Table.Cell>
                            <Table.Cell>
                                <Link to={"/user/edit/"+element.id} style={{color: 'black', fontSize: '16px', fontFamily: 'Helvetica'}}>
                                    <i className="fa fa-edit">
                                        <span className="font-italic">Edit this user</span>
                                    </i>
                                </Link>

                                <a  href="" className="ml-3"  onClick={() => props.onDelete(element.id)}  style={{color: 'black', fontSize: '16px', fontFamily: 'Helvetica'}}>
                                    <i className="fa fa-trash-o">
                                        <span className="font-italic">Delete this user</span>
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

export default ListUser;