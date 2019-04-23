import { Component, OnInit, Input } from '@angular/core';
import { SearchFilter } from 'app/@akita/external-models/searchFilter';
import { Options, LabelType } from 'ng5-slider';

@Component({
    selector: 'jhi-pricing-filter',
    templateUrl: './pricing-filter.component.html',
    styleUrls: ['../../assets/pricing-styles.scss']
})
export class PricingFilterComponent implements OnInit {
    @Input()
    searchFilters: SearchFilter = new SearchFilter();
    @Input()
    priceConfig: Options = {
        floor: 0,
        ceil: 0
    };
    @Input()
    sizeConfig: Options = {
        floor: 0,
        ceil: 0
    };

    options: Options = {
        floor: 0,
        ceil: 1000,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return value + 'm<sup>2</sup>';
                case LabelType.High:
                    return value + 'm<sup>2</sup>';
                default:
                    return value + 'm<sup>2</sup>';
            }
        }
    };

    constructor() {}

    ngOnInit() {}
}
