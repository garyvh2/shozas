import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/@akita/external-models/apiResponse.model';
import { RealState } from 'app/@akita/real-state';
import { SERVER_API_URL } from 'app/app.constants';
import { SearchFilter } from 'app/@akita/external-models/searchFilter';
import { SearchRealState } from '../landing/@akita/search';

@Injectable()
export class ReactivateUserService {
    constructor(private http: HttpClient) {}

    reactivate(user: any): Observable<ApiResponse<SearchRealState>> {
        return this.http.post<any>(SERVER_API_URL + '/api/restore', user);
    }
}
