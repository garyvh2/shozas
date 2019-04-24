import { RecommendedState } from './recommended.model';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { RecommendedStateStore } from './recommended.store';

@Injectable()
export class RecommendedStateQuery extends Query<RecommendedState> {
    recommended$ = this.select(state => state.recommended);
    constructor(protected store: RecommendedStateStore) {
        super(store);
    }
}
