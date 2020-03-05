import React from 'react';
import ReactPaginate from 'react-paginate';
import './FourColGrid.css';

const FourColGrid = (props) => {

    const renderElements = () => {

        const gridElements = props.children && props.children.map( (element, i) => (
            <div key={i} className="rmdb-grid-element">
                {element}
            </div>
        ));
        return gridElements;
    };

    const handlePageClick = (e) => {
        props.onPageClick(e.selected)
    };

    const paginate = () => {
        if (props.totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={props.totalPages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={props.page}
                               onPageChange={handlePageClick}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}/>
            )
        }
    };

    return (

        <div className="rmdb-grid">
            {props.header && !props.loading ? <h1>{props.header}</h1> : null}
        <br/>
            <div className="rmdb-grid-content">
                {renderElements()}
            </div>
            <br/>
            <div>
                {paginate()}
            </div>
        </div>
    )
};


export default FourColGrid;