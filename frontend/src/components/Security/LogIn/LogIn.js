import React, { Component } from 'react';
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserService from '../../../repository/axiosUserRepository';
import {User} from '../../../model/User';
import './LogIn.css';


class LogIn extends Component{

constructor(props) {

    super(props);

    this.state = {
        user: new User('',''),
        submitted: false,
        loading: false,
        errorMessage: '',
    };
}

handleChange(e) {
    let {name, value} = e.target;
    let user = this.state.user;
    user[name] = value;
    this.setState({user: user});
}

handleLogin(e) {
    e.preventDefault();

    this.setState({submitted: true});
    const {user} = this.state;

    if(!(user.username && user.password)){
        return;
    }

    this.setState({loading: true});

    UserService.login(user).then( (response) => {
        this.props.history.push("/");
    }, error => {
        this.setState({
            errorMessage: "Username or password is not valid",
            loading: false
        });
    });
}


render() {

    const {user, submitted, loading, errorMessage} = this.state;

    return (
        <div className="col-md-12">
            <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card card-container">
                <img  alt="" id="profile-img" className="profile-img-card"  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                {errorMessage &&
                <div className="alert alert-danger" role="alert">
                    <strong>Error! </strong> {errorMessage}
                </div>
                }
                <br/>
                <form name="form" onSubmit={(e) => this.handleLogin(e)}>
                    <div className={'form-group' + (submitted && !user.username ? 'has-error':'')}>
                        <FontAwesomeIcon icon={faUser} />
                        <label style={{color:'#800000',padding: '5px'}} htmlFor="username"> Username</label>
                        <input style={{boxShadow:'#800000'}} type="text" className="form-control" name="username" placeholder="Type username" value={user.username} onChange={(e)=>this.handleChange(e)}/>
                        {submitted && !user.username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? 'has-error':'')}>
                        <FontAwesomeIcon icon={faLock}/>
                        <label style={{color:'#800000',padding: '5px'}}  htmlFor="password">Password</label>
                        <input type="password" className="form-control" placeholder="Type password" name="password" value={user.password} onChange={(e)=>this.handleChange(e)}/>
                        {submitted && !user.password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <br/>
                    <div className="form-group">
                        <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button" disabled={loading}>Sign In</button>
                    </div>
                    <p>Not a member?
                        <Link style={{color:'#800000'}} to="/register" > Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
}

export default LogIn;