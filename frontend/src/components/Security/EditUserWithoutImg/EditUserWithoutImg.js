import React, {useEffect,useState} from 'react';
import {useHistory, useParams} from "react-router";
import {Link} from "react-router-dom";
import axios from "../../../custom-axios/axios";
import './EditUserWithoutImg.css'

const EditUserWithoutImg = (props) => {

    const [user,setUser] = useState({});
    const {id} = useParams();
    const history = useHistory();


    useEffect(() => {

        axios.get("/user?id="+id).then((data)=>{
            setUser(data.data);
        })

        console.log(props.errorMessage.toString());

    },[]);


    const onFormSubmit = (e) => {

        e.preventDefault();

        props.onSubmit({
            "id": id,
            "name": e.target.name.value,
            "username": e.target.username.value,
            "email":e.target.email.value,
            "gender":e.target.gender.value,
        });

            history.push("/allUsers");
    };


    const handleTermOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setUser({
            [paramName]:paramValue
        });
    };

    return (

        <div className="container">
            <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                <form className="ui form" onSubmit={onFormSubmit}>
                    <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Edit User Profile</h4>
                    <br/>
                    {props.errorMessage &&
                    <div className="alert alert-danger" role="alert">
                        <strong>Error! Username is not valid. It is already taken. </strong>
                    </div>
                    }
                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Name</label>
                        <div className="">
                            <input type="text" name={"name"} id="name" value={user.name} onChange={handleTermOnChange} placeholder="Enter actors name..." style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Username:</label>
                        <div className="">
                            <input type="text" name={"username"} id="username" value={user.username} onChange={handleTermOnChange} style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Email:</label>
                        <div className="field">
                            <input type="text" name={"email"} id="email" value={user.email} onChange={handleTermOnChange} style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label style={{color: '#800000', fontSize: 'medium'}}>Gender:</label>
                        <input name={"gender"} id="gender" type="text" value={user.gender} onChange={handleTermOnChange}
                               style={{fontStyle: 'italic'}}/>
                    </div>
                    <br/>
                    <br/>

                    <div className="ui large buttons" style={{width: '800px', marginLeft: '110px'}}>
                        <button className="ui button" type="submit" style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}>Edit</button>
                        <div className="or"></div>
                        <Link to="/allUsers" className="ui button" style={{backgroundColor:' #800000',fontSize:'large',color:'black',height:'40px'}}>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserWithoutImg;