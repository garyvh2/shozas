import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { RealState } from 'app/@akita/real-state';

@Component({
    selector: 'jhi-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
    @Input()
    listing: RealState;

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(`shozas_pin`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/pin.svg'));
    }

    ngOnInit() {}
}
