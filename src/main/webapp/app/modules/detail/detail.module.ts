import { NgModule } from '@angular/core';

import { ImagesCarrouselComponent } from './components/images-carrousel/images-carrousel.component';
import { DetailRoutingModule } from 'app/modules/detail/detail.route';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { DetailQuery, DetailService, DetailStore } from '../../@akita/detail';
import { StateDetail } from 'app/modules/detail/views/state-detail/state-detail';
import { ShozasSharedModule } from 'app/shared';
@NgModule({
    declarations: [ImagesCarrouselComponent, StateDetail, GalleryModule],
    imports: [DetailRoutingModule],
    providers: [DetailStore, DetailQuery, DetailService]
})
export class DetailModule {}
