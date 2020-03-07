import React, { Component } from 'react';
import {Redirect, useHistory, useParams} from "react-router";
import axios from "../../../custom-axios/axios";
import './EditUserWithoutImg.css'
import {Link} from "react-router-dom";
import UserService from "../../../repository/axiosUserRepository";

class EditUserWithoutImg extends Component{

    constructor(props){
        super(props);

        this.state={
            user:[],
            loading:false,
            submitted:false,
            id:this.props.currentUserId,
            redirect:false,
            errorMessage:''

        };
    }



    componentDidMount() {
        axios.get("/user?id="+this.state.id).then((data)=>{
            this.setState(
                {
                    user:data.data
                }
            )
        });
    }

    onFormSubmit = (e) => {

        e.preventDefault();

        this.setState({submitted: true});

        const newUser = {
            "id": this.state.id,
            "name": e.target.name.value,
            "username": e.target.username.value,
            "email":e.target.email.value,
            "gender":e.target.gender.value,
        };

        this.setState({loading: true});

         UserService.editUserWithoutImg(newUser).then((response)=>{
                const newUser= response.data;
             this.setState({redirect:true});

         },error => {
             if (error.response.status === 409) {
                 this.setState({
                     errorMessage: "Username is not valid. It is already taken!",
                     loading: false
                 });
             }else {
                 this.setState({
                     errorMessage: "Unexpected error occurred.",
                     loading: false
                 });
             }
            });

    };

     handleTermOnChange = (e) => {
         this.setState({
             user:e.target.value
         })
    };

     render() {
         if (this.state.redirect) {
             return <Redirect to='/profile'/>;
         }

         const {  loading, errorMessage} = this.state;

         return (

             <div className="container">
                 <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                     <form className="ui form" onSubmit={this.onFormSubmit}>
                         <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Edit User Profile</h4>
                         <br/>
                         {errorMessage &&
                         <div className="alert alert-danger" role="alert">
                             <strong>Error! </strong> {errorMessage}
                         </div>
                         }
                         <div className="field">
                             <label  style={{color:'#800000',fontSize:'medium'}}>Name</label>
                             <div className="">
                                 <input type="text" name={"name"} id="name" value={this.state.user.name} onChange={this.handleTermOnChange} placeholder="Enter actors name..." style={{fontStyle:'italic'}}/>
                             </div>
                         </div>
                         <br/>

                         <div className="field">
                             <label  style={{color:'#800000',fontSize:'medium'}}>Username:</label>
                             <div className="">
                                 <input type="text" name={"username"} id="username" value={this.state.user.username} onChange={this.handleTermOnChange} style={{fontStyle:'italic'}}/>
                             </div>
                         </div>
                         <br/>

                         <div className="field">
                             <label  style={{color:'#800000',fontSize:'medium'}}>Email:</label>
                             <div className="field">
                                 <input type="text" name={"email"} id="email" value={this.state.user.email} onChange={this.handleTermOnChange} style={{fontStyle:'italic'}}/>
                             </div>
                         </div>
                         <br/>

                         <div className="field">
                             <label style={{color: '#800000', fontSize: 'medium'}}>Gender:</label>
                             <input name={"gender"} id="gender" type="text" value={this.state.user.gender} onChange={this.handleTermOnChange}
                                    style={{fontStyle: 'italic'}}/>
                         </div>
                         <br/>
                         <br/>

                         <div className="ui large buttons" style={{width: '800px', marginLeft: '110px'}}>
                             <button className="ui button" type="submit" style={{backgroundColor:' #800000',fontSize:'large',color:'black'}} disabled={loading}>Edit</button>
                             <div className="or"></div>
                             <Link to="/allUsers" className="ui button" style={{backgroundColor:' #800000',fontSize:'large',color:'black',height:'40px'}}>Cancel</Link>
                         </div>
                     </form>
                 </div>
             </div>
         );
     }

};

export default EditUserWithoutImg;