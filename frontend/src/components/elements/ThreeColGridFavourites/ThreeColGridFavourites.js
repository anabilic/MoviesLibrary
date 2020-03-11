import React from 'react';
import './ThreeColGridFavourites.css';

const ThreeColGridFavourites = (props) => {

    const renderElements = () => {

        const gridElements = props.children && props.children.map( (element, i) => (
            <div key={i} className="rmdb-grid-element-threeFav">
                {element}
            </div>
        ));
        return gridElements;
    };


    return (

        <div className="rmdb-grid-threeFav">
            <br/>
            <div className="rmdb-grid-content-threeFav">
                {renderElements()}
            </div>
            <br/>
        </div>
    )
};


export default ThreeColGridFavourites;