import { SearchFilter } from 'app/@akita/external-models/searchFilter';
import { Home } from './search-results.model';
import { LandingService } from './../../landing.service';
import { Component, OnInit } from '@angular/core';
import { SearchResultsService } from './search-results.service';

@Component({
    selector: 'jhi-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
    precio = 0;
    precioOpciones: any = {
        floor: 0,
        ceil: 15000000
    };
    tamano = 0;
    tamanoOpciones: any = {
        floor: 0,
        ceil: 2500
    };

    selectedIndex = 0;

    homes: Home[];

    /** Filters */
    locationFilters: SearchFilter = new SearchFilter();
    appartmentFilters: SearchFilter = new SearchFilter();
    lotFilters: SearchFilter = new SearchFilter();
    homeFilters: SearchFilter = new SearchFilter();

    constructor(private searchService: SearchResultsService) {}

    ngOnInit() {
        this.searchService.getHomes().subscribe(homes => (this.homes = homes));
    }

    applyFilters() {
        let filter: SearchFilter;
        switch (this.selectedIndex) {
            case 0:
                filter = this.homeFilters;
                break;
            case 1:
                filter = this.appartmentFilters;
                break;
            case 2:
                filter = this.lotFilters;
                break;
        }

        filter = {
            ...this.locationFilters,
            ...filter
        } as SearchFilter;
        console.dir(filter);
    }
}
