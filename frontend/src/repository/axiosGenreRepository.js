import axios from '../custom-axios/axios';


const GenreService = {

    getGenres: () => {
        return axios.get("/genre");
    },

};



export default GenreService;

