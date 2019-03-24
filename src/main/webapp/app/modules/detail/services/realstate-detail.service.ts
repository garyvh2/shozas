import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TempUser } from './../../../@akita/external-models/tempUser';
import { Injectable } from '@angular/core';
import { RealState } from 'app/@akita/real-state';

@Injectable({
    providedIn: 'root'
})
export class RealstateDetailService {
    constructor(private http: HttpClient) {}

    contactOwner(rs: RealState): Observable<TempUser> {
        const jwt = this.recoverJWT();

        if (jwt !== null) {
            const options = {
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + jwt)
            };

            return this.http.post<TempUser>(SERVER_API_URL + '/api/realstate/contact-owner/', rs, options);
        } else {
            throw 'Usuario no autenticado';
        }
    }

    recoverJWT() {
        let jwt = sessionStorage.getItem('jhi-authenticationtoken');

        if (jwt === null) {
            jwt = localStorage.getItem('jhi-authenticationtoken');
        }

        return jwt;
    }
}
