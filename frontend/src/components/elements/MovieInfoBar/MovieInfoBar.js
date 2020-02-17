import React from 'react';
import FontAwesome from 'react-fontawesome';
import './MovieInfoBar.css';

const MovieInfoBar = ({ runningTime, releaseInformation, originalLanguage }) => (
    <div className="rmdb-movieinfobar">
        <div className="rmdb-movieinfobar-content">
            <div className="rmdb-movieinfobar-content-col">
                <FontAwesome className="fa-time" name="clock-o" size="2x" />
                <span className="rmdb-movieinfobar-info">Running time: {runningTime}</span>
            </div>
            <div className="rmdb-movieinfobar-content-col">
                <FontAwesome className="far fa-calendar-alt" name="calendar" size="2x" />
                <span className="rmdb-movieinfobar-info">Released: {releaseInformation}</span>
            </div>
            <div className="rmdb-movieinfobar-content-col">
                <FontAwesome className="fas fa-language" name="ticket" size="2x" />
                <span className="rmdb-movieinfobar-info">Language/s:{originalLanguage} </span>
            </div>
        </div>
    </div>
);

export default MovieInfoBar;