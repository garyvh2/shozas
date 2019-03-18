import { Store, StoreConfig } from '@datorama/akita';
import { SearchRealState, initialSearchRealState } from './search.model';

@StoreConfig({ name: 'searchrealstate' })
export class SearchRealStateStore extends Store<SearchRealState> {
    constructor() {
        super(initialSearchRealState());
    }
}
