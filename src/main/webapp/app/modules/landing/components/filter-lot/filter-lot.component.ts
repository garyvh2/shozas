import { Component, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import { SearchFilter } from 'app/@akita/external-models/searchFilter';

@Component({
    selector: 'jhi-filter-lot',
    templateUrl: './filter-lot.component.html',
    styleUrls: ['../../assets/filter-styles.scss']
})
export class FilterLotComponent {
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
}
