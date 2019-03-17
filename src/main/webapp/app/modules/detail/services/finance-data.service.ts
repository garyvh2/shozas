import { FinanceData } from './../../../@akita/external-models/finance-data';
import { FINANCE_INFO_URL } from './../../../app.constants';
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
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU1MjgwNTg5N30.RAzvPQgfkM2NZo4MreoitJdlSIWOTyWCvpjFW4kaD5_wu3yVI12yi1-yDifv1NqOKT_RYE9EvbOAo7baYtzHOQ'
        )
    };

    constructor(private http: HttpClient) {}

    getFinanceData(): Observable<FinanceData[]> {
        console.log(SERVER_API_URL);
        return this.http.get<any>(FINANCE_INFO_URL, this.options);
    }
}
