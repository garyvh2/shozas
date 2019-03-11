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

    constructor(private landingService: LandingService, private searchService: SearchResultsService) {}

    ngOnInit() {
        this.landingService.getLocation().subscribe(data => {
            console.log(data);
        });
        this.searchService.getHomes().subscribe(homes => (this.homes = homes));
    }
}
