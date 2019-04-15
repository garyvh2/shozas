import { Store, StoreConfig } from '@datorama/akita';
import { initialRecommendedState, RecommendedState } from './recommended.model';

@StoreConfig({ name: 'recommended' })
export class RecommendedStateStore extends Store<RecommendedState> {
    constructor() {
        super(initialRecommendedState());
    }
}
