import axios from '../custom-axios/axios';
import qs from 'qs';


const MovieService = {

    getMovies: () => {
        return axios.get("/movie");
    },

    fetchMoviesPaged:(page,pageSize)=>{
        return axios.get("/movie",{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
    },

    addMovie: (movie) => {

        return axios.post("/movie/image", movie,{
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    },

    searchMovieTerm: (searchTerm) => {
        return axios.get(`/movie?term=${searchTerm}`);
    },

    deleteMovie: (movieId) => {
        return axios.delete(`/movie/${movieId}`);
    },

    editMovie: (movie) => {
        const mName=movie.name;
        const formatParams=qs.stringify(movie);
        return axios.patch("/movie/"+mName,formatParams,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    }
};



export default MovieService;
