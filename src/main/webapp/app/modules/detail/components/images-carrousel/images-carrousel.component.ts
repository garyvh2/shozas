import { Component, Input, OnChanges } from '@angular/core';
import { Image } from '@ks89/angular-modal-gallery';

@Component({
    selector: 'jhi-images-carrousel',
    templateUrl: './images-carrousel.component.html',
    styles: ['./images-carrousel.component.scss']
})
export class ImagesCarrouselComponent implements OnChanges {
    @Input()
    images: any[];
    carrouserImages = [];
    constructor() {}

    ngOnChanges() {
        this.carrouserImages = this.images.map(image => new Image(image.id, { img: image.source }));
    }
}
