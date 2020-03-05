import React,{ Component } from 'react';
import axios from '../../../custom-axios/axios';
import { Redirect } from "react-router";
import UserService from '../../../repository/axiosUserRepository'
import './EditUser.css'


class EditUser extends Component{

    constructor(props){
        super(props);

        this.state={
            selectedFile:null,
            id:this.props.currentUserId,
            userDetails: [],
            redirect:false,
            submitted: false,
            loading: false,
            errorMessage: '',
        };
    }

    componentDidMount() {
        axios.get("/user?id="+this.state.id).then((data)=>{
            this.setState(
                {
                    userDetails:data.data
                }
            )
        });
    }

    onFormSubmit = (e) => {

        e.preventDefault();

        this.setState({submitted: true});

        const newUser = {
           "id":this.state.id,
           "name": e.target.name.value,
           "username": e.target.username.value,
           "email":e.target.email.value,
           "gender":e.target.gender.value,
         };

        const formData = new FormData();
        formData.append('id',this.state.id);
        formData.append('name',e.target.name.value);
        formData.append('username',e.target.username.value);
        formData.append('email',e.target.email.value);
        formData.append('gender',e.target.gender.value);
        formData.append('file', this.state.selectedFile);


        this.setState({loading: true});

        UserService.editUser(formData, this.state.id, newUser).then((response) => {
                const newUser = response.data;
            this.setState({redirect:true});
            }, error => {
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
             userDetails:e.target.value
         })
    };

    onFileChangeHandler = (e) => {
        e.preventDefault();

        let file=e.target.files[0];
        this.setState({selectedFile:file});

    };


    render() {

        if (this.state.redirect) {
            return <Redirect to='/profile'/>;
        }

        const {selectedFile, id, userDetails,redirect, flag, submitted, loading, errorMessage} = this.state;

        return (

             <div className="container">
                 <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                     <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Edit User Profile</h4>
                     <br/>
                     {errorMessage &&
                     <div className="alert alert-danger" role="alert">
                         <strong>Error! </strong> {errorMessage}
                     </div>
                     }
                     <form className="ui form" onSubmit={this.onFormSubmit}>
                         <div className="field">
                             <label  style={{color:'#800000',fontSize:'medium'}}>Name:</label>
                             <div className="">
                                 <input required type="text" name={"name"} id="name" value={userDetails.name} onChange={this.handleTermOnChange} style={{fontStyle:'italic'}}/>
                             </div>
                         </div>
                         <br/>

                         <div className={'field'}>
                             <label  style={{color:'#800000',fontSize:'medium'}}>Username:</label>
                             <div className="">
                                 <input required type="text" name={"username"} id="username" value={userDetails.username} onChange={this.handleTermOnChange} style={{fontStyle:'italic'}}/>
                             </div>
                         </div>
                         <br/>

                         <div className="field">
                             <label  style={{color:'#800000',fontSize:'medium'}}>Email:</label>
                             <div className="field">
                                 <input required type="text" name={"email"} id="email" value={userDetails.email} onChange={this.handleTermOnChange} style={{fontStyle:'italic'}}/>
                             </div>
                         </div>
                         <br/>

                         <div className="field">
                             <label style={{color: '#800000', fontSize: 'medium'}}>Gender:</label>
                             <input name={"gender"} id="gender" type="text" value={userDetails.gender} onChange={this.handleTermOnChange}
                                    style={{fontStyle: 'italic'}}/>
                         </div>
                         <br/>


                         <div className="ui form">
                             <div className="field">
                                 <label style={{color: '#800000', fontSize: 'medium'}}>Image</label>
                                 <div className="field">
                                     <input type="file" name={"file"} id="file"
                                            onChange={(event => this.onFileChangeHandler(event))}  style={{fontStyle: 'italic'}}/>
                                 </div>
                             </div>
                         </div>
                         <br/>
                         <br/>

                         <div className="ui large buttons" style={{width: '800px', marginLeft: '110px'}}>
                             <button className="ui button" type="submit" style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}
                                     disabled={loading}>Edit</button>
                             <div className="or"></div>
                             <button className="ui button"  style={{backgroundColor:' #800000',fontSize:'large',color:'black'}} >Cancel</button>
                         </div>
                     </form>
                 </div>
             </div>
         );

     }


};

export default EditUser;