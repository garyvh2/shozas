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

    homes: Home[];

    constructor(private searchService: SearchResultsService) {}

    ngOnInit() {
        this.searchService.getHomes().subscribe(homes => (this.homes = homes));
    }
}
