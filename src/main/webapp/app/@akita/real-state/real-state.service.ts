import { RealState } from './real-state.model';
import { SearchRealStateStore } from './../../modules/landing/@akita/search/search.store';
import { ApiResponse } from './../external-models/apiResponse.model';
import { RealStateStore } from './real-state.store';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MOCK_SERVER_API_URL, SERVER_API_URL } from 'app/app.constants';
import { ID, Store } from '@datorama/akita';
import { SearchRealState } from 'app/modules/landing/@akita/search';
import { SearchFilter } from '../external-models/searchFilter';

@Injectable()
export class RealStateService {
    params: SearchFilter;
    currentUrl: string;

    constructor(private detailStore: RealStateStore, private searchRealStateStore: SearchRealStateStore, private http: HttpClient) {}

    get(id: ID) {
        const url = `${SERVER_API_URL}/api/realstate/detail?id=${id}`;
        return this.http.get(url).subscribe((response: any) => {
            console.log('Service GET response is: ', response);
            this.detailStore.upsert(response.result.id, response.result);
        });
    }

    searchHomes(params) {
        this.params = { ...params } as SearchFilter;
        this.params.size = 20;
        this.params.page = 1;
        this.currentUrl = `${SERVER_API_URL}/api/realstate/search/homes`;
        return this.http.post(this.currentUrl, params).subscribe((response: ApiResponse<SearchRealState>) => {
            const data = response.result.elements;
            response.result.loadMore = data.length > 0;
            this.searchRealStateStore.update(response.result);
            data.forEach((item: RealState) => {
                this.detailStore.upsert(item.id, item);
            });
        });
    }

    loadMore() {
        this.params.page += 1;
        return this.http.post(this.currentUrl, this.params).subscribe((response: ApiResponse<SearchRealState>) => {
            const data = response.result.elements;
            data.forEach((item: RealState) => {
                this.detailStore.upsert(item.id, item);
            });
            response.result.loadMore = data.length > 0;
            response.result.elements = [...this.searchRealStateStore._value().elements, ...data];
            this.searchRealStateStore.update(response.result);
        });
    }

    searchAppartments(params) {
        this.params = { ...params } as SearchFilter;
        this.params.size = 20;
        this.params.page = 1;
        this.currentUrl = `${SERVER_API_URL}/api/realstate/search/deps`;
        return this.http.post(this.currentUrl, params).subscribe((response: ApiResponse<SearchRealState>) => {
            const data = response.result.elements;
            response.result.loadMore = data.length > 0;
            this.searchRealStateStore.update(response.result);
            data.forEach((item: RealState) => {
                this.detailStore.upsert(item.id, item);
            });
        });
    }

    searchLots(params) {
        this.params = { ...params } as SearchFilter;
        this.params.size = 20;
        this.params.page = 1;
        this.currentUrl = `${SERVER_API_URL}/api/realstate/search/lots`;
        return this.http.post(this.currentUrl, params).subscribe((response: ApiResponse<SearchRealState>) => {
            const data = response.result.elements;
            response.result.loadMore = data.length > 0;
            this.searchRealStateStore.update(response.result);
            data.forEach((item: RealState) => {
                this.detailStore.upsert(item.id, item);
            });
        });
    }
}
