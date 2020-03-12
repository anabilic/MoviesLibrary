import React, {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from "../../../custom-axios/axios";
import OneGrid from "../OneGrid/OneGrid";
import Navigation from "../Navigation/Navigation";
import ReactPaginate from "react-paginate";
import './ListActors.css';

const ListActors = (props) => {

    const [actors,setActors] =useState({});
    const [page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [pageSize,setPageSize]=useState(3);


    useEffect(()=>{
        axios.get("/actor/paginate",{
            headers: {
                'page':page,'page-size':pageSize
            }
        }).then((data)=>{

            setActors(data.data.content),
                setPage(data.data.page),
                setPageSize(data.data.pageSize),
                setTotalPages(data.data.totalPages)
        })

    },[]);

    const actorsList = Object.values(actors);

    const loadActors=(page)=>{
        return axios.get("/actor/paginate",{
            headers: {
                'page':page,'page-size':pageSize
            }
        }).then((data)=>{
            setActors(data.data.content),
                setPage(data.data.page),
                setPageSize(data.data.pageSize),
                setTotalPages(data.data.totalPages)
        })
    };

    const handlePageClick = (e) => {
        loadActors(e.selected);
    };

    const paginate = () => {
        if (totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={totalPages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={page}
                               onPageChange={handlePageClick}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}/>
            )
        }
    };



    return(
        <div>
        <Navigation movie='List of All Actors' />
        <div className="col-md-12">
            <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="cardActor card-container">
                <OneGrid>
                    {actorsList && actorsList.map( (element, i) => (
                        <div className="imdb-actor">
                            <img
                                src={element.imageActor ? `data:image/jpeg;base64,${element.imageActor}` : './images/no_image.jpg'}
                                alt="ictorthumb"
                            />
                            <b><span className="imdb-actor-name">{element.name}</span></b>
                            <p className="imdb-actor-c">Cast Name:</p>
                            <span className="imdb-actor-character">{element.castName}</span>
                            <p className="imdb-actor-c">Birth Date:</p>
                            <p className="imdb-actor-character">{element.dateOfBirth}</p>
                            <p className="imdb-actor-c">Birth Place:</p>
                            <p className="imdb-actor-character">{element.placeOfBirth}</p>
                            <p className="imdb-actor-c">Biography:</p>
                            <p className="imdb-actor-character">{element.biography}</p>
                            <Link to={"/editActor/" + element.id}  style={{color: 'white', fontSize: '20px', fontFamily: 'Helvetica'}} >
                                <i className="fa fa-edit">
                                    <span className="font-italic">Edit this actor</span>
                                </i>
                            </Link>
                            <a  href="" className="ml-3" onClick={() => props.onDelete(element.id)}  style={{color: 'white', fontSize: '20px', fontFamily: 'Helvetica'}}>
                                    <i className="fa fa-trash-o">
                                        <span className="font-italic">Delete this actor</span>
                                    </i>
                            </a>
                        </div>
                    ))}
                </OneGrid>
                {paginate()}
            </div>
        </div>
        </div>
    );
};

export default ListActors;