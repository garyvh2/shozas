import { RealStateStore } from './real-state.store';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MOCK_SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class RealStateService {
    constructor(private detailStore: RealStateStore, private http: HttpClient) {}

    get(id: number) {
        const url = `${MOCK_SERVER_API_URL}/api/realstate/detail?id=1`;
        this.http.get(url).subscribe((response: any) => {
            this.detailStore.upsert(response.Result.id, response.Result);
        });
    }
}
