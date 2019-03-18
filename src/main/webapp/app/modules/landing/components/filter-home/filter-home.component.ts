import { SearchFilter } from 'app/@akita/external-models/searchFilter';
import { Component, Input } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
    selector: 'jhi-filter-home',
    templateUrl: './filter-home.component.html',
    styleUrls: ['../../assets/filter-styles.scss']
})
export class FilterHomeComponent {
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
