import { Home, ApiRequest } from './search-results.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchResultsService {
    constructor(private http: HttpClient) {}

    getHomes() {
        const homes = new Subject<Home[]>();
        const query = {
            province: 'Cartago',
            city: 'El Guarco',
            district: 'El Tejar',
            prLow: 1000000,
            prHigh: 2500000,
            beds: null,
            baths: null,
            garages: null,
            stories: null,
            zip: null,
            user: null,
            similarTo: null
        };
        this.http
            .post<ApiRequest<Home>>(`https://6cd8c254-74c1-4b7f-a6b5-26cdfa38b6ae.mock.pstmn.io/api/realstate/searchhomes`, query)
            .subscribe(({ Result }) => homes.next(Result));
        return homes.asObservable();
    }
}
