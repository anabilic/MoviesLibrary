import axios from '../custom-axios/axios';


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
    }

};



export default GenreService;

