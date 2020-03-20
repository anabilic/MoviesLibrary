import axios from '../custom-axios/axios';
import qs from 'qs';

const MovieService = {

    loadMovies:()=>{
        return axios.get("/movie");

        },

    fetchMoviesPaged:(page,pageSize)=>{
        return axios.get("/movie",{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
    },
    searchMovieTerm: (searchTerm) => {
        return axios.get(`/movie?term=${searchTerm}`);
    },

    addMovie: (movie) => {

        return axios.post("/movie", movie,{
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    },
    editMovie: (movie) => {
        const movieId=movie.id;
        console.log(movieId);
        const formatParams=qs.stringify(movie);
        return axios.patch("/movie/"+movieId,formatParams,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    },
    deleteMovie: (movieId) => {
        return axios.post(`/movie/${movieId}`);
    }
};



export default MovieService;
