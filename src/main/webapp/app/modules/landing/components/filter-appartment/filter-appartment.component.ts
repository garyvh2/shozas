import { Component, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import { SearchFilter } from 'app/@akita/external-models/searchFilter';

@Component({
    selector: 'jhi-filter-appartment',
    templateUrl: './filter-appartment.component.html',
    styleUrls: ['../../assets/filter-styles.scss']
})
export class FilterAppartmentComponent {
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
