import { Router } from '@angular/router';
import { LoginService } from '../../core/login/login.service';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { ID } from '@datorama/akita';
import { UserStore, userStore } from './user.store';

@Injectable()
export class UserService {
    constructor(private userStr: UserStore, private http: HttpClient, private loginService: LoginService, private router: Router) {
        userStr.setDirty();
        userStr.setLoading(false);
    }

    getInterested(id: ID) {
        const url = `${SERVER_API_URL}/api/user/typeahead?realStateId=${id}`;
        this.userStr.setLoading(false);
        return this.http.get(url);
    }
    get(id: ID) {
        const url = `${SERVER_API_URL}/api/user?id=${id}`;
        this.userStr.setLoading(true);
        return this.http.get(url).subscribe(
            (response: any) => {
                this.userStr.setLoading(false);
                this.userStr.upsert(id, response.result);
            },
            () => this.userStr.setLoading(false)
        );
    }

    deactivateUser(login: string) {
        const user = { login };
        const url = `${SERVER_API_URL}/api/inactivate`;
        this.userStr.setLoading(true);
        return this.http.post(url, user).subscribe(
            () => {
                this.userStr.setLoading(false);
                this.loginService.logout();
                this.router.navigate(['']);
            },
            () => {
                this.userStr.setLoading(false);
            }
        );
    }
}
