import { ReviewStore } from './../../@akita/review/review.store';
import { ReviewQuery } from './../../@akita/review/review.query';
import { MAPS_API_KEY } from './../../app.constants';
import { AngularMaterialModule } from './../../shared/angular-material/angular-material.module';
import { NgModule } from '@angular/core';

import { ImagesCarrouselComponent } from './components/images-carrousel/images-carrousel.component';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from 'app/modules/detail/detail.route';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { RealStateQuery, RealStateService, RealStateStore } from '../../@akita/real-state';
import { StateDetailComponent } from 'app/modules/detail/views/state-detail/state-detail.component';
import { MapComponent } from './components/map/map.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { ReviewService } from 'app/@akita/review';

@NgModule({
    declarations: [StateDetailComponent, ImagesCarrouselComponent, MapComponent, CommentComponent, CommentSectionComponent],
    imports: [
        DetailRoutingModule,
        GalleryModule.forRoot(),
        CommonModule,
        AngularMaterialModule,
        AgmCoreModule.forRoot({
            apiKey: MAPS_API_KEY
        })
    ],
    providers: [RealStateStore, RealStateQuery, RealStateService, ReviewQuery, ReviewService, ReviewStore]
})
export class DetailModule {}
