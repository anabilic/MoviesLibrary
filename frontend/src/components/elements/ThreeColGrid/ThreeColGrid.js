import React from 'react';
import ReactPaginate from "react-paginate";
import './ThreeColGrid.css';

const ThreeColGrid = (props) => {

    const renderElements = () => {

        const gridElements = props.children && props.children.map( (element, i) => (
            <div key={i} className="rmdb-grid-element-three">
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

        <div className="rmdb-grid-three">
            <br/>
            <div className="rmdb-grid-content-three">
                {renderElements()}
            </div>
            <br/>
            <div className="gridPaginate">
                {paginate()}
            </div>
        </div>
    )
};


export default ThreeColGrid;