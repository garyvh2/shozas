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
    defaultImage = 'http://res.cloudinary.com/ucenfotec19/image/upload/v1553328159/dxtdpxwxyhav96tnklzc.png';

    constructor() {}

    ngOnChanges() {
        const arrangeImage = this.rearrangeImages();
        if (arrangeImage && arrangeImage.constructor === Array) {
            this.carrouselImages = arrangeImage.map((image, index) => new Image(index, { img: image.source }));
        }
    }

    rearrangeImages() {
        if (this.detailImages) {
            const imageArray = this.detailImages.map(image => ({
                ...image,
                isPrimary: image.primary
            }));
            let primaryImage;
            for (let index = 0; index < imageArray.length; index++) {
                if (imageArray[index].primary) {
                    primaryImage = imageArray.splice(index, 1);
                    break;
                }
            }
            imageArray.unshift(primaryImage[0]);
            return imageArray;
        }
    }

    openImageModal(image: Image) {
        const index: number = this.getCurrentIndexCustomLayout(image, this.carrouselImages);
        this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, {
            layout: new AdvancedLayout(index, true)
        });
    }

    getImage(image: any) {
        return image ? image.modal.img : this.defaultImage;
    }

    private getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
        return image ? images.indexOf(image) : -1;
    }
}
