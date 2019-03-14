import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RealState } from './real-state.model';
import { Injectable } from '@angular/core';

export interface DetailState extends EntityState<RealState> {}

@Injectable()
@StoreConfig({ name: 'detail' })
export class RealStateStore extends EntityStore<DetailState, RealState> {
    constructor() {
        super();
    }
}

export const detailStore = new RealStateStore();
