import { RealState } from 'app/@akita/real-state';

export class SearchRealState {
    public loadMore: boolean;
    public maxPrice: number;
    public minPrice: number;
    public maxSize: number;
    public minSize: number;
    public elements: RealState[];
    public averagePrice: number;
}

export function initialSearchRealState(): SearchRealState {
    return {
        loadMore: true,
        maxPrice: 0,
        minPrice: 0,
        maxSize: 0,
        minSize: 0,
        elements: [],
        averagePrice: 0
    };
}
