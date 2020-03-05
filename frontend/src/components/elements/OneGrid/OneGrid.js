import React from 'react';
import './OneGrid.css';

const OneGrid = (props) => {

    const renderElements = () => {

        const gridElements = props.children && props.children.map( (element, i) => (
            <div key={i} className="imdb-grid-element">
                {element}
            </div>
        ));
        return gridElements;
    };

    return (

        <div className="imdb-grid" style={{marginLeft:'-70px'}}>
            <br/>
            <div className="imdb-grid-content">
                {renderElements()}
            </div>
            <br/>
        </div>
    )
};


export default OneGrid;