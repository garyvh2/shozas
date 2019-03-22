import { Options } from 'ng5-slider';
import { SearchRealStateQuery } from './../../@akita/search/search.query';
import { Observable, Subject } from 'rxjs';
import { SearchFilter } from 'app/@akita/external-models/searchFilter';
import { Component, OnInit } from '@angular/core';
import { RealState, RealStateService } from 'app/@akita/real-state';

@Component({
    selector: 'jhi-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
    selectedIndex = 0;

    /** Queries */
    loadMore$: Observable<boolean>;
    elements$: Observable<RealState[]>;
    priceRange$: Observable<Options>;
    sizeRange$: Observable<Options>;

    /** Filters */
    locationFilters: SearchFilter = new SearchFilter();
    appartmentFilters: SearchFilter = new SearchFilter();
    lotFilters: SearchFilter = new SearchFilter();
    homeFilters: SearchFilter = new SearchFilter();

    /** Range */
    priceRange: Options = {
        ceil: 0,
        floor: 0
    };
    sizeRange: Options = {
        ceil: 0,
        floor: 0
    };

    constructor(private realStateService: RealStateService, private searchRealStateQuery: SearchRealStateQuery) {}

    ngOnInit() {
        /** Price Range */
        const priceRange$ = new Subject<Options>();
        this.searchRealStateQuery.priceRange$.subscribe(data => {
            if (data.ceil >= this.priceRange.ceil) {
                this.priceRange.ceil = data.ceil;
                this.setRange('rangePrice', data.ceil);
            }
            priceRange$.next({ ...data, ...this.priceRange } as Options);
        });
        this.priceRange$ = priceRange$.asObservable();
        /** Size range */
        const sizeRange$ = new Subject<Options>();
        this.searchRealStateQuery.sizeRange$.subscribe(data => {
            if (data.ceil >= this.sizeRange.ceil) {
                this.sizeRange.ceil = data.ceil;
                this.setRange('rangeSize', data.ceil);
            }
            sizeRange$.next({ ...data, ...this.sizeRange } as Options);
        });
        this.loadMore$ = this.searchRealStateQuery.loadMore$;
        this.sizeRange$ = sizeRange$.asObservable();
        this.elements$ = this.searchRealStateQuery.elements$;
        this.applyFilters();
    }

    setRange(name, ceil) {
        if (ceil || ceil === 0) {
            switch (this.selectedIndex) {
                case 0:
                    if (ceil && this.homeFilters[name].high === 0) {
                        this.homeFilters[name].high = ceil;
                        this.homeFilters[name].low = 0;
                    }
                    this.homeFilters[name] = { ...this.homeFilters[name] };
                    break;
                case 1:
                    if (ceil && this.appartmentFilters[name].high === 0) {
                        this.appartmentFilters[name].high = ceil;
                        this.appartmentFilters[name].low = 0;
                    }
                    this.appartmentFilters[name] = { ...this.appartmentFilters[name] };
                    break;
                case 2:
                    if (ceil && this.lotFilters[name].high === 0) {
                        this.lotFilters[name].high = ceil;
                        this.lotFilters[name].low = 0;
                    }
                    this.lotFilters[name] = { ...this.lotFilters[name] };
                    break;
            }
        }
    }

    applyFilters() {
        switch (this.selectedIndex) {
            case 0:
                this.realStateService.searchHomes(this.getFilters());
                break;
            case 1:
                this.realStateService.searchAppartments(this.getFilters());
                break;
            case 2:
                this.realStateService.searchLots(this.getFilters());
                break;
        }
    }

    getFilters() {
        let filter: SearchFilter = this.locationFilters;
        switch (this.selectedIndex) {
            case 0:
                filter = {
                    ...filter,
                    ...this.homeFilters
                } as SearchFilter;
                break;
            case 1:
                filter = {
                    ...filter,
                    ...this.appartmentFilters
                } as SearchFilter;
                break;
            case 2:
                filter = {
                    ...filter,
                    ...this.lotFilters
                } as SearchFilter;
                break;
        }
        return filter;
    }

    selectedIndexChange() {
        this.priceRange = {
            ceil: 0,
            floor: 0
        };
        this.sizeRange = {
            ceil: 0,
            floor: 0
        };
        this.setRange('rangeSize', this.getFilters().sizeHigh);
        this.setRange('rangePrice', this.getFilters().prHigh);
        this.applyFilters();
    }

    provinciaContext() {
        this.applyFilters();
    }

    loadMore() {
        this.realStateService.loadMore();
    }
}
