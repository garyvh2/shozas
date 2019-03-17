import { Component, OnInit, Input } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { SearchFilter } from 'app/@akita/external-models/searchFilter';

@Component({
    selector: 'jhi-filter-lot',
    templateUrl: './filter-lot.component.html',
    styleUrls: ['../../assets/filter-styles.scss']
})
export class FilterLotComponent implements OnInit {
    @Input()
    searchFilters: SearchFilter = new SearchFilter();

    priceConfig: Options = {
        floor: 0,
        ceil: 15000000,
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
    };
    sizeConfig: Options = {
        floor: 0,
        ceil: 2500,
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
    };

    constructor() {}

    ngOnInit() {}
}
