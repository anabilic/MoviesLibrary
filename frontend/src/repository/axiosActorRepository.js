import axios from '../custom-axios/axios';
import qs from "qs";


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
    },
    editActor: (actor) => {
        const aName=actor.name;
        const formatParams=qs.stringify(actor);
        return axios.patch("/actor/"+aName,formatParams,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    }
};



export default ActorService;

