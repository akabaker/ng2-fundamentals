import {Injectable} from '@angular/core'
import {IUser} from './user.model'
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
    currentUser:IUser

    constructor(private http: Http) {

    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    checkAuthenticationStatus() {
        return this.http.get('/api/currentIdentity').map((response: any) => {
            if (response._body) {
                return response.json();
            } else {
                return {}
            }
        }).do(currentUser => {
            if (!!currentUser.userName) {
                this.currentUser = currentUser;
            }
        }).subscribe();
    }

    loginUser(userName: string, password: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let loginInfo = {username: userName, password: password};

        return this.http.post('/api/login', loginInfo, options).do(response => {
            if (response) {
                this.currentUser = <IUser>response.json().user
            }
        }).catch(error => {
            return Observable.of(false);
        })
    }

    logout() {
        this.currentUser = undefined;

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post('/api/logout', {}, options);
    }

    updateCurrentUser(firstName:string, lastName:string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    }
}