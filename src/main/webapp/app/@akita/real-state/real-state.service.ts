import { RealState } from './real-state.model';
import { ApiResponse } from './../external-models/apiResponse.model';
import { RealStateStore } from './real-state.store';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { ID } from '@datorama/akita';
import { SearchRealState, SearchRealStateStore } from 'app/modules/landing/@akita/search';
import { SearchFilter } from '../external-models/searchFilter';
import { FavoriteStateStore } from 'app/modules/listings/@akita/favorite';

@Injectable()
export class RealStateService {
    params: SearchFilter;
    currentUrl: string;

    constructor(
        private detailStore: RealStateStore,
        private favoriteStateStore: FavoriteStateStore,
        private searchRealStateStore: SearchRealStateStore,
        private http: HttpClient
    ) {}

    get(id: ID) {
        const url = `${SERVER_API_URL}/api/realstate/detail?id=${id}`;
        this.detailStore.setLoading(true);
        return this.http.get(url).subscribe(
            (response: any) => {
                this.detailStore.setLoading(false);
                this.detailStore.upsert(response.result.id, response.result);
            },
            () => this.detailStore.setLoading(false)
        );
    }

    getUserRealState(login: string) {
        const param = { user: login };
        this.currentUrl = `${SERVER_API_URL}/api/realstate/search/all`;
        this.detailStore.setLoading(true);
        return this.http.post(this.currentUrl, param).subscribe(
            (response: ApiResponse<RealState[]>) => {
                const data = response.result;
                data.forEach((item: RealState) => {
                    this.detailStore.upsert(item.id, item);
                });
                this.detailStore.setLoading(false);
            },
            () => this.detailStore.setLoading(false)
        );
    }

    getFavorites(userId) {
        const url = `${SERVER_API_URL}/api/realstate/get-favorites/${userId}`;
        this.favoriteStateStore.setLoading(true);
        return this.http.get(url).subscribe(
            (response: ApiResponse<RealState[]>) => {
                const data = response.result;
                data.forEach((item: RealState) => {
                    this.detailStore.upsert(item.id, item);
                });
                this.favoriteStateStore.update({
                    favorites: data
                });
                this.favoriteStateStore.setLoading(false);
            },
            () => this.favoriteStateStore.setLoading(false)
        );
    }

    searchHomes(params) {
        this.params = { ...params } as SearchFilter;
        this.params.size = 20;
        this.params.page = 1;
        this.currentUrl = `${SERVER_API_URL}/api/realstate/search/homes`;
        this.searchRealStateStore.setLoading(true);
        return this.http.post(this.currentUrl, params).subscribe((response: ApiResponse<SearchRealState>) => {
            const data = response.result.elements;
            response.result.loadMore = data.length > 0;
            this.searchRealStateStore.update(response.result);
            data.forEach((item: RealState) => {
                this.detailStore.upsert(item.id, item);
            });
            this.searchRealStateStore.setLoading(false);
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
        this.searchRealStateStore.setLoading(true);
        return this.http.post(this.currentUrl, params).subscribe((response: ApiResponse<SearchRealState>) => {
            const data = response.result.elements;
            response.result.loadMore = data.length > 0;
            this.searchRealStateStore.update(response.result);
            data.forEach((item: RealState) => {
                this.detailStore.upsert(item.id, item);
            });
            this.searchRealStateStore.setLoading(false);
        });
    }

    searchLots(params) {
        this.params = { ...params } as SearchFilter;
        this.params.size = 20;
        this.params.page = 1;
        this.currentUrl = `${SERVER_API_URL}/api/realstate/search/lots`;
        this.searchRealStateStore.setLoading(true);
        return this.http.post(this.currentUrl, params).subscribe((response: ApiResponse<SearchRealState>) => {
            const data = response.result.elements;
            response.result.loadMore = data.length > 0;
            this.searchRealStateStore.update(response.result);
            data.forEach((item: RealState) => {
                this.detailStore.upsert(item.id, item);
            });
            this.searchRealStateStore.setLoading(false);
        });
    }

    createRealState(realState: RealState) {
        const url = `${SERVER_API_URL}/api/realstate/create`;
        this.detailStore.setError(undefined);
        this.detailStore.setLoading(true);
        return this.http.post(url, realState).subscribe(
            (response: ApiResponse<RealState>) => {
                this.detailStore.setLoading(false);
                this.detailStore.add(response.result);
                return response.result;
            },
            (error: any) => {
                this.detailStore.setLoading(false);
                this.detailStore.setError(error);
            }
        );
    }
    updateRealState(realState: RealState) {
        const url = `${SERVER_API_URL}/api/realstate/update`;
        this.detailStore.setError(undefined);
        this.detailStore.setLoading(true);
        return this.http.put(url, realState).subscribe(
            (response: ApiResponse<RealState>) => {
                this.detailStore.setLoading(false);
                this.detailStore.update(response.result.id, response.result);
                return response.result;
            },
            (error: any) => {
                this.detailStore.setLoading(false);
                this.detailStore.setError(error);
            }
        );
    }

    removeRealStateStore(id: ID) {
        this.detailStore.setLoading(true);
        this.detailStore.remove(id);
        this.detailStore.setLoading(false);
    }
}
