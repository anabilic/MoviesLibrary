import axios from '../custom-axios/axios';


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
    }

};



export default MovieService;
