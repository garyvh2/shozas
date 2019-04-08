import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/@akita/external-models/apiResponse.model';
import { RealState } from 'app/@akita/real-state';
import { SERVER_API_URL } from 'app/app.constants';
import { SearchFilter } from 'app/@akita/external-models/searchFilter';
import { SearchRealState } from '../landing/@akita/search';

@Injectable()
export class PricingService {
    constructor(private http: HttpClient) {}

    getPricing(searchFilter: SearchFilter): Observable<ApiResponse<SearchRealState>> {
        return this.http.post<any>(SERVER_API_URL + '/api/realstate/search/homes', searchFilter);
        // return this.http.get<any>(SERVER_API_URL + '/api/financing', this.options);
    }
}
