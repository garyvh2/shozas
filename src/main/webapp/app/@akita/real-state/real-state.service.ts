import { RealState } from './real-state.model';
import { SearchRealStateStore } from './../../modules/landing/@akita/search/search.store';
import { ApiResponse } from './../external-models/apiResponse.model';
import { RealStateStore } from './real-state.store';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MOCK_SERVER_API_URL, SERVER_API_URL } from 'app/app.constants';
import { ID } from '@datorama/akita';
import { SearchRealState } from 'app/modules/landing/@akita/search';

@Injectable()
export class RealStateService {
    constructor(private detailStore: RealStateStore, private searchRealStateStore: SearchRealStateStore, private http: HttpClient) {}

    get(id: ID) {
        const url = `${MOCK_SERVER_API_URL}/api/realstate/detail?id=${id}`;
        return this.http.get(url).subscribe((response: any) => {
            this.detailStore.upsert(response.Result.id, response.Result);
        });
    }

    searchHomes(params) {
        const url = `${SERVER_API_URL}/api/realstate/search/homes`;
        return this.http.post(url, params).subscribe((response: ApiResponse<SearchRealState>) => {
            const data = response.result.elements;
            this.searchRealStateStore.update(response.result);
            data.forEach((item: RealState) => {
                this.detailStore.upsert(item.id, item);
            });
        });
    }

    searchAppartments(params) {
        const url = `${SERVER_API_URL}/api/realstate/search/deps`;
        return this.http.post(url, params).subscribe((response: ApiResponse<SearchRealState>) => {
            const data = response.result.elements;
            this.searchRealStateStore.update(response.result);
            data.forEach((item: RealState) => {
                this.detailStore.upsert(item.id, item);
            });
        });
    }

    searchLots(params) {
        const url = `${SERVER_API_URL}/api/realstate/search/lots`;
        return this.http.post(url, params).subscribe((response: ApiResponse<SearchRealState>) => {
            const data = response.result.elements;
            this.searchRealStateStore.update(response.result);
            data.forEach((item: RealState) => {
                this.detailStore.upsert(item.id, item);
            });
        });
    }
}
