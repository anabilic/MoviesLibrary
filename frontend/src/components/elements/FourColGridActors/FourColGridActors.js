import React from 'react';
import './FourColGridActors.css';


const FourColGridActors = (props) => {

    const renderElements = () => {

        const gridElements = props.children && props.children.map( (element, i) => (
            <div key={i} className="rmdb-grid-element">
                {element}
            </div>
        ));
        return gridElements;
    };

    return (

        <div className="rmdb-grid">
            {props.header && !props.loading ? <h1>{props.header}</h1> : null}
            <br/>
            <div className="rmdb-grid-content">
                {renderElements()}
            </div>
            <br/>
        </div>
    )
};


export default FourColGridActors;