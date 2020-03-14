import axios from '../custom-axios/axios';
import {BehaviorSubject} from 'rxjs';
import qs from "qs";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
const currentUserSubjectSession = new BehaviorSubject(JSON.parse((sessionStorage.getItem('currentUser'))));

class UserService {

    get currentUserValue(){
        return currentUserSubject.value;
    }

    get CurrentUserValueSession(){
        return currentUserSubjectSession.value;
    }
    get currentUser(){
        return currentUserSubject.asObservable();
    }

    get currentUserSession(){
        return currentUserSubjectSession.asObservable();
    }

    login(user){
        const headers = {
            authorization:'Basic ' + btoa(user.username + ':' + user.password)
        };
        return axios.get( '/user/login', {headers: headers}).then(response => {
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            currentUserSubject.next(response.data);
        });
    }

    logOut(){
        return axios.post('/user/logout', {}).then(response => {
            localStorage.removeItem('currentUser');
            currentUserSubject.next(null);
        })
    }

    register(user){
        return axios.post( '/user/registration', JSON.stringify(user),
            {headers: {'Content-Type':'application/json; charset=UTF-8'}});
    }

    deleteUser(userId) {
    return axios.delete(`/user/${userId}`);
    }

    editUser(user,id,newUser)  {

        localStorage.setItem('currentUser', JSON.stringify(newUser));
        currentUserSubject.next(newUser);
        return axios.patch("/user/"+id,user, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    }

    editUserWithoutImg(user)  {

        const userId=user.id;
        const formParams = qs.stringify(user);
        return axios.patch("/user/edit/"+userId,formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    addFavouriteMovie(idUser,idBook,user){
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);
        return axios.patch("/user/addFavourite/"+idUser+"/"+idBook, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }


    fetchFavouriteMoviesPaged(id,page,pageSize){
        return axios.get("/user/favouritesPerUserPaginate/"+id,{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
    }

    deleteFavouriteMovie(idUser,idMovie){
        return axios.post("/user/deleteFavouriteBookByUser/"+idUser+"/"+idMovie, {
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            }
        )
    }


}


export default new UserService();
