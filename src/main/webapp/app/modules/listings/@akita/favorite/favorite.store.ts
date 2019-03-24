import { Store, StoreConfig } from '@datorama/akita';
import { initialFavoriteState, FavoriteState } from './favorite.model';

@StoreConfig({ name: 'favorites' })
export class FavoriteStateStore extends Store<FavoriteState> {
    constructor() {
        super(initialFavoriteState());
    }
}
