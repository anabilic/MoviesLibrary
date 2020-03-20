import axios from '../custom-axios/axios';
import qs from "qs";

const ActorService = {

    getActors: () => {
        return axios.get("/actor");
    },
    addActor: (actor) => {

        return axios.post("/actor", actor,{
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    },
    editActor: (actor) => {
        const actorId=actor.id;
        const formatParams=qs.stringify(actor);
        return axios.patch("/actor/"+actorId,formatParams,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    },
    deleteActor: (actorId) => {
        return axios.post(`/actor/${actorId}`);
    },
    searchActorTerm: (searchTerm) => {
        return axios.get(`/actor?term=${searchTerm}`);
    },
    searchActorTermPaged:(searchTerm,page,size)=>{
        return axios.get(`/actor?term=${searchTerm}`,{
            headers: {
                'page':page, 'page-size':size
            }
        })
    },
};

export default ActorService;

