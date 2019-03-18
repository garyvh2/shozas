import { RealStateStore } from './real-state.store';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MOCK_SERVER_API_URL, SERVER_API_URL } from 'app/app.constants';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

@Injectable()
export class RealStateService {
    constructor(private detailStore: RealStateStore, private http: HttpClient) {}

    get(id: ID) {
        const url = `${SERVER_API_URL}/api/realstate/detail?id=${id}`;
        return this.http.get(url).subscribe((response: any) => {
            console.log('Service GET response is: ', response);
            this.detailStore.upsert(response.result.id, response.result);
        });
    }
}
