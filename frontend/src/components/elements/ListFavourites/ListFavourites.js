import React, {useState,useEffect} from 'react';
import axios from "../../../custom-axios/axios";
import UserService from "../../../repository/axiosUserRepository";
import Navigation from "../Navigation/Navigation";
import ThreeColGridFavourites from "../ThreeColGridFavourites/ThreeColGridFavourites";
import MovieThumbFavourite from "../MovieThumbFavourite/MovieThumbFavourite";
import './ListFavourites.css';

const ListFavourites = (props) => {

    const [favouriteMovies,setFavouriteMovies] =useState({});
    const [page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [pageSize,setPageSize]=useState(6);


    useEffect(()=>{

            axios.get("/user/favouritesPerUserPaginate/" + props.user.id, {
                headers: {
                    'page': page, 'page-size': pageSize
                }
            }).then( ((data) => {
                setFavouriteMovies(data.data.content),
                    setPage(data.data.page),
                    setPageSize(data.data.pageSize),
                    setTotalPages(data.data.totalPages)
            }));

        },[]);

    const movieList = Object.values(favouriteMovies);

    const loadFavouriteMoviesPaginate = async (page=0) => {
        UserService.fetchFavouriteMoviesPaged(await props.user.id,page,pageSize).then(((data) => {
                setFavouriteMovies(data.data.content),
                setPage(data.data.page),
                setPageSize(data.data.pageSize),
                setTotalPages(data.data.totalPages)
        }))
    };

    const deleteFavouriteMovie = (userId,movieId) => {
        UserService.deleteFavouriteMovie(userId,movieId).then((response) => {
            this.setState((state) => {
                const favMovie = state.favouriteMovies.filter((fm) => {
                    return fm.id !== movieId;
                });
                return {favMovie};
            })
            loadFavouriteMoviesPaginate(0);
        })
    };

    return(
        <div>
            <Navigation movie='List of favourite movies' />
            <div className="col-md-12">
                <div style={{borderColor:'black', boxShadow: '5px 10px 18px 5px black'}} className="cardActor card-container">
                    <div style={{marginLeft:'130px'}}>
                        <ThreeColGridFavourites
                            onPageClick={loadFavouriteMoviesPaginate}
                            totalPages={totalPages}
                        >
                            {movieList && movieList.map( (element, i) => (
                                <MovieThumbFavourite
                                    key={i}
                                    clickable={true}
                                    image={element.file ? `data:image/jpeg;base64,${element.file}` : './images/no_image.jpg'}
                                    userId={props.user.id}
                                    movieId={element.id}
                                    movieName={element.name}
                                    onDeleteFavourite = {deleteFavouriteMovie}
                                />
                            ))}
                        </ThreeColGridFavourites>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListFavourites;