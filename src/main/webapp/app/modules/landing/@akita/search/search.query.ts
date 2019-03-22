import { LabelType } from 'ng5-slider';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SearchRealStateStore } from './search.store';
import { SearchRealState } from './search.model';

@Injectable()
export class SearchRealStateQuery extends Query<SearchRealState> {
    priceRange$ = this.select(search => ({
        floor: search.minPrice,
        ceil: search.maxPrice,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return '¢' + value;
                case LabelType.High:
                    return '¢' + value;
                default:
                    return '¢' + value;
            }
        }
    }));
    sizeRange$ = this.select(search => ({
        floor: search.minSize,
        ceil: search.maxSize,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return value + 'mt<sup>2</sub>';
                case LabelType.High:
                    return value + 'mt<sup>2</sub>';
                default:
                    return value + 'mt<sup>2</sub>';
            }
        }
    }));
    elements$ = this.select(search => search.elements);
    loadMore$ = this.select(search => search.loadMore);
    constructor(protected store: SearchRealStateStore) {
        super(store);
    }
}
