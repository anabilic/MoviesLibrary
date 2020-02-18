import React, {Component} from 'react';
import { Redirect } from "react-router";
import './AddActor.css'

class AddActor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile:null,
            redirect:false
        };
    }

    onFileChangeHandler = (e) => {
        e.preventDefault();
        let file=e.target.files[0];
        this.setState({selectedFile:file});

    };


    onFormSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('name',e.target.name.value);
        formData.append('castName',e.target.castName.value);
        formData.append('file', this.state.selectedFile);

        this.props.onNewActorAddedWithImg(formData);

        this.setState({redirect:true});


    };

    render() {

    if (this.state.redirect) {
        return <Redirect to='/'/>;
    }

    return (
        <div className="container">
            <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="card">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <h4 className="ui dividing header" style={{color:'#800000', fontSize:'xx-large',fontStyle:'italic'}}>Add Actor</h4>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Name</label>
                        <div className="">
                            <input type="text" name={"name"} id="name" placeholder="Enter actors name..." style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="field">
                        <label  style={{color:'#800000',fontSize:'medium'}}>Cast name:</label>
                        <div className="field">
                            <input type="text" name={"castName"} id="castName"  placeholder="Enter actors cast name..." style={{fontStyle:'italic'}}/>
                        </div>
                    </div>
                    <br/>

                    <div className="ui form">
                        <div className="field">
                            <label  style={{color:'#800000',fontSize:'medium'}}>Image</label>
                            <div className="field">
                                <input type="file" name={"file"} id="file"  placeholder="Image"
                                       onChange={(event => this.onFileChangeHandler(event))}  style={{fontStyle:'italic'}}/>
                            </div>
                        </div>
                    </div>
                    <br/>
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

export default AddActor;