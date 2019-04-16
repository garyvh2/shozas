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

    getImage() {
        console.log(this.listing, 'listing');
        if (this.listing && this.listing.image) {
            return this.listing.image.source;
        } else {
            const image = this.getPrimaryImage();
            return image.source;
        }
    }

    getPrimaryImage() {
        if (this.listing && this.listing.images) {
            return this.listing.images.find(image => image.primary);
        }
        return { source: '' };
    }
}
