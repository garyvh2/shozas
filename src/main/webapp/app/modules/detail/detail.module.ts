import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesCarrouselComponent } from './components/images-carrousel/images-carrousel.component';
import { DetailRoutingModule } from 'app/modules/detail/detail.route';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { DetailQuery, DetailService, DetailStore } from '../../akita/detail';
import { StateDetail } from 'app/modules/detail/views/state-detail/state-detail';

@NgModule({
    declarations: [ImagesCarrouselComponent, StateDetail, GalleryModule],
    imports: [CommonModule, DetailRoutingModule],
    providers: [DetailStore, DetailQuery, DetailService]
})
export class DetailModule {}
