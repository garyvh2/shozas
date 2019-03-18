import { RealState } from 'app/@akita/real-state';

export class SearchRealState {
    public maxPrice: number;
    public minPrice: number;
    public maxSize: number;
    public minSize: number;
    public elements: RealState[];
}

export function initialSearchRealState(): SearchRealState {
    return {
        maxPrice: 0,
        minPrice: 0,
        maxSize: 0,
        minSize: 0,
        elements: []
    };
}
