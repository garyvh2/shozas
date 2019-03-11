import { AngularMaterialModule } from './../../shared/angular-material/angular-material.module';
import { NgModule } from '@angular/core';

import { ImagesCarrouselComponent } from './components/images-carrousel/images-carrousel.component';
import { DetailRoutingModule } from 'app/modules/detail/detail.route';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { RealStateQuery, RealStateService, RealStateStore } from '../../@akita/real-state';
import { StateDetailComponent } from 'app/modules/detail/views/state-detail/state-detail.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { FeaturesComponent } from './components/features/features.component';
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { SidecardComponent } from './components/sidecard/sidecard.component';

@NgModule({
    declarations: [
        StateDetailComponent,
        ImagesCarrouselComponent,
        TitleComponent,
        FeaturesComponent,
        AmenitiesComponent,
        SidecardComponent
    ],
    imports: [DetailRoutingModule, GalleryModule.forRoot(), CommonModule, AngularMaterialModule],
    providers: [RealStateStore, RealStateQuery, RealStateService]
})
export class DetailModule {}
