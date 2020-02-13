import axios from '../custom-axios/axios';


const ActorService = {

    getActors: () => {
        return axios.get("/actor");
    },

};



export default ActorService;

