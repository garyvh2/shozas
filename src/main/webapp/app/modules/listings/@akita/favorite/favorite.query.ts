import { FavoriteState } from './favorite.model';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { FavoriteStateStore } from './favorite.store';

@Injectable()
export class FavoriteStateQuery extends Query<FavoriteState> {
    favorites$ = this.select(state => state.favorites);
    constructor(protected store: FavoriteStateStore) {
        super(store);
    }
}
