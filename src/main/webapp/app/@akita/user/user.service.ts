import { Injectable } from '@angular/core';
import { SERVER_API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { ID } from '@datorama/akita';
import { UserStore, userStore } from './user.store';

@Injectable()
export class UserService {
    constructor(private userStore: UserStore, private http: HttpClient) {}

    get(id: ID) {
        const url = `${SERVER_API_URL}/api/user?id=${id}`;
        this.userStore.setLoading(true);
        return this.http.get(url).subscribe(
            (response: any) => {
                this.userStore.setLoading(false);
                this.userStore.upsert(id, response.result);
            },
            () => this.userStore.setLoading(false)
        );
    }
}
