import { QueryEntity } from '@datorama/akita';
import { RealStateStore, DetailState, detailStore } from './real-state.store';
import { RealState } from './real-state.model';
import { Injectable } from '@angular/core';
@Injectable()
export class RealStateQuery extends QueryEntity<DetailState, RealState> {
    constructor(protected store: RealStateStore) {
        super(store);
    }
    getDetail(id: number) {
        return this.selectEntity(id);
    }
}

export const detailQuery = new RealStateQuery(detailStore);
