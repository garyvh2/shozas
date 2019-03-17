import { DataCRP } from './../../../@akita/external-models/data-crp';
import { IPS_URL, SERVER_API_URL } from './../../../app.constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RealState } from '../../../@akita/real-state';

@Injectable({
    providedIn: 'root'
})
export class IpsDataService {
    options = {
        headers: new HttpHeaders().set(
            'Authorization',
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU1MjgwNTg5N30.RAzvPQgfkM2NZo4MreoitJdlSIWOTyWCvpjFW4kaD5_wu3yVI12yi1-yDifv1NqOKT_RYE9EvbOAo7baYtzHOQ'
        )
    };

    constructor(private http: HttpClient) {}

    getCRPDataCanton(rs: RealState): Observable<DataCRP> {
        console.log('SERVER_API_URL', SERVER_API_URL);
        return this.http.get<DataCRP>(IPS_URL + this.formatText(rs.city), this.options);
    }

    formatText(txt: String): String {
        const txtFormatted = txt.replace(/\s+/g, '-');
        return txtFormatted.toLowerCase();
    }
}
