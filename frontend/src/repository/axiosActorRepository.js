import axios from '../custom-axios/axios';


const ActorService = {

    getActors: () => {
        return axios.get("/actor");
    },
    deleteActor: (actorId) => {
        return axios.delete(`/actor/${actorId}`);
    },
    addActor: (actor) => {

        return axios.post("/actor/image", actor,{
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    }
};



export default ActorService;

