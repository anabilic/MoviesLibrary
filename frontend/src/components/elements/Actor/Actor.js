import React from 'react';
import ModalView from '../Modal/Modal.js'
import './Actor.css';

const Actor = ({ actor }) => {

    return (

        <div className="rmdb-actor" id="actor">
            <img
                src={actor.imageActor ? `data:image/jpeg;base64,${actor.imageActor}` : '../../../../public/images/no_image.jpg'}
                alt="actorthumb"
            />
            <span className="rmdb-actor-name">{actor.name}</span>
            <span className="rmdb-actor-character">{actor.castName}</span>
            <span className="rmdb-actor-details">
                 <ModalView actorImage={actor.imageActor} actorName={actor.name} actorDateOfBirth={actor.dateOfBirth}
                            actorPlaceOfBirth={actor.placeOfBirth} actorBiography={actor.biography}/>
            </span>
        </div>
    )
};

export default Actor;