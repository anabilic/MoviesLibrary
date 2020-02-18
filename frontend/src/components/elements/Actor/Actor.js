import React from 'react';
import './Actor.css';

const Actor = ({ actor }) => {

    return (

        <div className="rmdb-actor">
            <img
                src={actor.imageActor ? `data:image/jpeg;base64,${actor.imageActor}` : '../../../../public/images/no_image.jpg'}
                alt="actorthumb"
            />
            <span className="rmdb-actor-name">{actor.name}</span>
            <span className="rmdb-actor-character">{actor.castName}</span>
        </div>
    )
};

export default Actor;