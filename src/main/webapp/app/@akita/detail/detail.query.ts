import { QueryEntity } from '@datorama/akita';
import { DetailStore, DetailState, detailStore } from './detail.store';
import { Detail } from './detail.model';
import { Injectable } from '@angular/core';
@Injectable()
export class DetailQuery extends QueryEntity<DetailState, Detail> {
    constructor(protected store: DetailStore) {
        super(store);
    }
    getDetail(id: number) {
        return this.selectEntity(id);
    }
}

export const detailQuery = new DetailQuery(detailStore);
