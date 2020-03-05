import axios from '../custom-axios/axios';
import qs from "qs";

const GenreService = {

    getGenres: () => {
        return axios.get("/genre");
    },
    addGenre: (genre) => {

        return axios.post("/genre", genre,{
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    },
    editGenre: (genre) => {
        const genreId=genre.id;
        const formatParams=qs.stringify(genre);
        return axios.patch("/genre/"+genreId,formatParams,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    },
    deleteGenre: (genreId) => {
        return axios.delete(`/genre/${genreId}`);
    }

};



export default GenreService;

