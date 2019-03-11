import { Home } from './../../modules/landing/views/search-results/search-results.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
    @Input()
    listing: Home = new Home();

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(`shozas_pin`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/pin.svg'));
    }

    ngOnInit() {}
}
