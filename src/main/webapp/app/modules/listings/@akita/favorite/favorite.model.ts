import { RealState } from 'app/@akita/real-state';

export class FavoriteState {
    public favorites: RealState[];
}

export function initialFavoriteState(): FavoriteState {
    return {
        favorites: []
    };
}
