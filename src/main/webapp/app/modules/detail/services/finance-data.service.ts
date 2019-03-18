import { FinanceData } from './../../../@akita/external-models/finance-data';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../../app.constants';

@Injectable({
    providedIn: 'root'
})
export class FinanceDataService {
    options = {
        headers: new HttpHeaders().set(
            'Authorization',
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU1MjkzNTg3NH0.TpgTRXFgngKymA5oUw0zdlH8EeVn4hu28iAdQgumNk4iF567I0z-UugnsvKi10wjAAwQBB8VQqecrLFwdVuQgA'
        )
    };

    constructor(private http: HttpClient) {}

    getFinanceData(): Observable<FinanceData[]> {
        return this.http.get<any>(SERVER_API_URL + '/api/financing');
        // return this.http.get<any>(SERVER_API_URL + '/api/financing', this.options);
    }
}
