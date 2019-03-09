import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Detail } from './real-state.model';
import { Injectable } from '@angular/core';

export interface DetailState extends EntityState<Detail> {}

@Injectable()
@StoreConfig({ name: 'detail' })
export class RealStateStore extends EntityStore<DetailState, Detail> {
    constructor() {
        super();
    }
}

export const detailStore = new RealStateStore();
