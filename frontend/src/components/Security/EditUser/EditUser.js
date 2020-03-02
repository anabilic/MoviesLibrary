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
            redirect:false
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
        formData.append('file', this.state.selectedFile);
        formData.append('gender',e.target.gender.value);


        this.updateUser(formData,newUser);

        this.setState({redirect:true});

    };

    updateUser= ((editedUser,newUser) => {
        UserService.editUser(editedUser,this.state.id,newUser).then((response)=>{
            const newUser = response.data;
          //  this.props.history.push("/profile");
        }, error => {
            if (error.response.status === 409) {
                console.log("error");

            }
        });
    });


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
            return <Redirect to='/'/>;
        }

         return (

             <div className="container">
                 <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                     <form className="ui form" onSubmit={this.onFormSubmit}>
                         <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Edit User Profile</h4>
                         <br/>

                         <div className="field">
                             <label  style={{color:'#800000',fontSize:'medium'}}>Name:</label>
                             <div className="">
                                 <input type="text" name={"name"} id="name" value={this.state.userDetails.name} onChange={this.handleTermOnChange} style={{fontStyle:'italic'}}/>
                             </div>
                         </div>
                         <br/>

                         <div className="field">
                             <label  style={{color:'#800000',fontSize:'medium'}}>Username:</label>
                             <div className="">
                                 <input type="text" name={"username"} id="username" value={this.state.userDetails.username} onChange={this.handleTermOnChange} style={{fontStyle:'italic'}}/>
                             </div>
                         </div>
                         <br/>

                         <div className="field">
                             <label  style={{color:'#800000',fontSize:'medium'}}>Email:</label>
                             <div className="field">
                                 <input type="text" name={"email"} id="email" value={this.state.userDetails.email} onChange={this.handleTermOnChange} style={{fontStyle:'italic'}}/>
                             </div>
                         </div>
                         <br/>

                         <div className="field">
                             <label style={{color: '#800000', fontSize: 'medium'}}>Gender:</label>
                             <input name={"gender"} id="gender" type="text" value={this.state.userDetails.gender} onChange={this.handleTermOnChange}
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
                             <button className="ui button" type="submit" style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}>Edit</button>
                             <div className="or"></div>
                             <button className="ui button"  style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}>Cancel</button>
                         </div>
                     </form>
                 </div>
             </div>
         );

     }


};

export default EditUser;