import React, {Component} from 'react';
import { Redirect } from "react-router";
import './AddGenre.css'

class AddGenre extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect:false
        };
    }

    onFormSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('name',e.target.name.value);

        this.props.onNewGenreAdded(formData);

        if(this.props.errorMessageGenreAdd){
            this.setState({redirect:true});
        }
    };

    render() {

        if (this.state.redirect) {
            return <Redirect to='/profile'/>;
        }

        return (
            <div className="container">
                <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                    <form className="ui form" onSubmit={this.onFormSubmit}>
                        <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Add Genre</h4>
                        <br/>
                        {this.props.errorMessageGenreAdd &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Error! Name is not valid. It already exists!</strong>
                        </div>
                        }
                        <div className="field">
                            <label  style={{color:'#800000',fontSize:'medium'}}>Genre Name:</label>
                            <div className="">
                                <input type="text" name={"name"} id="name" placeholder="Enter genre ..." style={{fontStyle:'italic'}}/>
                            </div>
                        </div>
                        <br/>
                        <div className="ui large buttons" style={{width: '800px', marginLeft: '110px'}}>
                            <button className="ui button" type="submit" style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}>Add</button>
                            <div className="or"></div>
                            <button className="ui button"  style={{backgroundColor:' #800000',fontSize:'large',color:'black'}}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddGenre;