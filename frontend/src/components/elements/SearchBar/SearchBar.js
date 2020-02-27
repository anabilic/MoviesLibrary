import React from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css';

const SearchBar = (props) => {

    const onSearch = (e)=>{
        e.preventDefault();
        props.onSearch(e.target["searchTerm"].value);
    };


    return (
        <div className="rmdb-searchbar">
            <div className="rmdb-searchbar-content">
                <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
                <form onSubmit={onSearch} className="form-inline mt-2 mt-md-0">
                    <input  type="text"
                            className="rmdb-searchbar-input"
                            placeholder="Search"
                            name={"searchTerm"}
                    />
                </form>
            </div>
        </div>
    )
};


export default SearchBar;