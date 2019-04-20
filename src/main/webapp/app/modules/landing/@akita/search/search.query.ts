import { LabelType } from 'ng5-slider';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SearchRealStateStore } from './search.store';
import { SearchRealState } from './search.model';
import { CurrencyPipe } from '@angular/common';

@Injectable()
export class SearchRealStateQuery extends Query<SearchRealState> {
    priceRange$ = this.select(search => ({
        floor: search.minPrice,
        ceil: search.maxPrice,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return '' + this.cp.transform(value, 'CRC', '¢');
                case LabelType.High:
                    return '' + this.cp.transform(value, 'CRC', '¢');
                default:
                    return '' + this.cp.transform(value, 'CRC', '¢');
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
    constructor(protected store: SearchRealStateStore, private cp: CurrencyPipe) {
        super(store);
    }
}
