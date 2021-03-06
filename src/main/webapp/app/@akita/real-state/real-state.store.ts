import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RealState } from './real-state.model';

export interface DetailState extends EntityState<RealState> {}

@Injectable()
@StoreConfig({ name: 'realstate' })
export class RealStateStore extends EntityStore<DetailState, RealState> {
    constructor() {
        super();
    }
}

export const detailStore = new RealStateStore();
