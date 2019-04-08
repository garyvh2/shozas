import { QueryEntity } from '@datorama/akita';
import { RealStateStore, DetailState, detailStore } from './real-state.store';
import { RealState } from './real-state.model';
import { Injectable } from '@angular/core';
@Injectable()
export class RealStateQuery extends QueryEntity<DetailState, RealState> {
    constructor(protected store: RealStateStore) {
        super(store);
    }
    getDetail(id: string) {
        return this.selectEntity(id);
    }

    getUserRealState(userId: string) {
        return this.selectAll({
            filterBy: entity => {
                return entity.owner.id === userId;
            }
        });
    }
}

export const detailQuery = new RealStateQuery(detailStore);
