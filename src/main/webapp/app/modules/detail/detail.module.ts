import { NgModule } from '@angular/core';

import { ImagesCarrouselComponent } from './components/images-carrousel/images-carrousel.component';
import { DetailRoutingModule } from 'app/modules/detail/detail.route';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { RealStateQuery, RealStateService, RealStateStore } from '../../@akita/real-state';
import { StateDetailComponent } from 'app/modules/detail/views/state-detail/state-detail.component';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [StateDetailComponent, ImagesCarrouselComponent],
    imports: [DetailRoutingModule, GalleryModule.forRoot(), CommonModule],
    providers: [RealStateStore, RealStateQuery, RealStateService]
})
export class DetailModule {}
