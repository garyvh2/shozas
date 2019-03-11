import { Component, Input, OnChanges } from '@angular/core';
import {
    Image,
    PlainGalleryConfig,
    PlainGalleryStrategy,
    AdvancedLayout,
    DescriptionStrategy,
    Description
} from '@ks89/angular-modal-gallery';

@Component({
    selector: 'jhi-images-carrousel',
    templateUrl: './images-carrousel.component.html',
    styleUrls: ['images-carrousel.component.scss']
})
export class ImagesCarrouselComponent implements OnChanges {
    @Input()
    detailImages: any[];
    carrouselImages = [];
    customPlainGalleryRowDescConfig: PlainGalleryConfig = {
        strategy: PlainGalleryStrategy.CUSTOM,
        layout: new AdvancedLayout(-1, true)
    };
    customDescription: Description = {
        strategy: DescriptionStrategy.ALWAYS_HIDDEN
    };
    constructor() {}

    ngOnChanges() {
        this.carrouselImages = this.detailImages.map((image, index) => new Image(index, { img: image.source }));
    }

    openImageModal(image: Image) {
        const index: number = this.getCurrentIndexCustomLayout(image, this.carrouselImages);
        this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, {
            layout: new AdvancedLayout(index, true)
        });
    }

    private getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
        return image ? images.indexOf(image) : -1;
    }
}
