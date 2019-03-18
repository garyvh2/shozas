import { DataCRP } from './../../../@akita/external-models/data-crp';
import { SERVER_API_URL } from './../../../app.constants';
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
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU1MjkzNTg3NH0.TpgTRXFgngKymA5oUw0zdlH8EeVn4hu28iAdQgumNk4iF567I0z-UugnsvKi10wjAAwQBB8VQqecrLFwdVuQgA'
        )
    };

    constructor(private http: HttpClient) {}

    getCRPDataCanton(rs: RealState): Observable<DataCRP> {
        return this.http.get<DataCRP>(SERVER_API_URL + '/api/ips/' + this.formatText(rs.city));
        // return this.http.get<DataCRP>(SERVER_API_URL + '/api/ips/' + this.formatText(rs.city), this.options);
    }

    formatText(txt: String): String {
        const txtFormatted = txt
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-');
        return txtFormatted.toLowerCase();
    }
}
