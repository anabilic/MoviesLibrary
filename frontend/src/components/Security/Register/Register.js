import React from 'react';
import UserService from '../../../repository/axiosUserRepository';
import {User} from '../../../model/User';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignature, faUser, faMale, faFemale} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import './Register.css';

class Register extends React.Component {

    constructor(props) {
        super(props);

        if (UserService.currentUserValue) {
            this.props.history.push('/');
        }

        this.state = {
            user: new User('', '', ''),
            submitted: false,
            loading: false,
            errorMessage: '',
        };
    }


    handleChange(e) {
        var {name, value} = e.target;
        var user = this.state.user;
        user[name] = value;
        this.setState({user: user});
    }

    handleRegister(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const {user} = this.state;

        if (!(user.username && user.password && user.name)) {
            return;
        }

        this.setState({loading: true});
        UserService.register(user).then(data => {
            this.props.history.push("/login");
        }, error => {
            if (error.response.status === 409) {
                this.setState({
                    errorMessage: "Username is not available",
                    loading: false
                });
            } else {
                this.setState({
                    errorMessage: "Unexpected error occurred.",
                    loading: false
                });
            }
        });
    }

    render() {
        const {user, submitted, loading, errorMessage} = this.state;
        return (
            <div className="col-md-12">
                <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}}  className="card card-container">
                    <img  alt="" id="profile-img" className="profile-img-card"  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                            {errorMessage &&
                    <div className="alert alert-danger" role="alert">
                        <strong>Error! </strong> {errorMessage}
                    </div>
                    }

                    <br/>
                    <form name="form" onSubmit={(e) => this.handleRegister(e)}>
                        <div className={'form-group' + (submitted && !user.name ? 'has-error' : '')}>
                            <FontAwesomeIcon icon={faSignature}/>
                            <label style={{color:'#800000',padding: '5px'}} htmlFor="name">Full Name</label>
                            <input type="text" className="form-control" name="name" placeholder="Type full name" value={user.name}
                                   onChange={(e) => this.handleChange(e)}/>
                            {submitted && !user.name &&
                            <div className="help-block">Full name is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !user.email ? 'has-error' : '')}>
                            <FontAwesomeIcon icon={faEnvelope}/>
                            <label style={{color:'#800000', padding: '5px'}} htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" placeholder="Type email" value={user.email}
                                   onChange={(e) => this.handleChange(e)}/>
                            {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !user.username ? 'has-error' : '')}>
                            <FontAwesomeIcon icon={faUser} />
                            <label style={{color:'#800000', padding: '5px'}} htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" placeholder="Type username" value={user.username}
                                   onChange={(e) => this.handleChange(e)}/>
                            {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !user.password ? 'has-error' : '')}>
                            <FontAwesomeIcon icon={faLock}/>
                            <label style={{color:'#800000',padding: '5px'}} htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Type password" value={user.password}
                                   onChange={(e) => this.handleChange(e)}/>
                            {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !user.gender ? 'has-error' : '')}>
                            <FontAwesomeIcon icon={faMale} /> <FontAwesomeIcon icon={faFemale} />
                            <label style={{color:'#800000', padding: '5px'}} htmlFor="gender">Gender</label>
                            <input type="text" className="form-control" name="gender" placeholder="Type gender" value={user.gender}
                                   onChange={(e) => this.handleChange(e)}/>
                            {submitted && !user.gender &&
                            <div className="help-block">Gender is required</div>
                            }
                        </div>

                        <br/>
                        <div className="form-group">
                            <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button"
                                    disabled={loading}>Sign Up
                            </button>
                        </div>
                        <p>Already have an account?
                            <Link style={{color:'#800000'}} to="/login" > Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;