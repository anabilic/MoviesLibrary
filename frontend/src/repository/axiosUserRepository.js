import axios from '../custom-axios/axios';
import {BehaviorSubject} from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

class UserService {

    get currentUserValue(){
        return currentUserSubject.value;
    }

    get currentUser(){
        return currentUserSubject.asObservable();
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
}


export default new UserService();
