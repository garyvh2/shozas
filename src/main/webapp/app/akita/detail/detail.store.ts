import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Detail } from './detail.model';
import { Injectable } from '@angular/core';

export interface DetailState extends EntityState<Detail> {}

@Injectable()
@StoreConfig({ name: 'detail' })
export class DetailStore extends EntityStore<DetailState, Detail> {
    constructor() {
        super();
    }
}

export const detailStore = new DetailStore();
