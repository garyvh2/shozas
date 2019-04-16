import { FormsModule } from '@angular/forms';
import { ReviewService } from './../../@akita/review/review.service';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { NgModule } from '@angular/core';
import { StarRatingModule } from 'angular-star-rating';

import { ReviewStore } from './../../@akita/review/review.store';
import { ReviewQuery } from './../../@akita/review/review.query';
import { MAPS_API_KEY } from './../../app.constants';
import { AngularMaterialModule } from './../../shared/angular-material/angular-material.module';
import { ImagesCarrouselComponent } from './components/images-carrousel/images-carrousel.component';

import { DetailRoutingModule } from './detail.route';

import { RealStateQuery, RealStateService, RealStateStore } from '../../@akita/real-state';
import { StateDetailComponent } from './views/state-detail/state-detail.component';
import { TitleComponent } from './components/title/title.component';
import { FeaturesComponent } from './components/features/features.component';
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { MapComponent } from './components/map/map.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';

import { SidecardComponent } from './components/sidecard/sidecard.component';
import { IpsDataComponent } from './components/ips-data/ips-data.component';

import { FinanceModalComponent } from './components/finance-modal/finance-modal.component';
import { MatDialogModule } from '@angular/material';
import { FinanceCardComponent } from './components/finance-card/finance-card.component';
import { SidecardLikeComponent } from './components/sidecard-like/sidecard-like.component';
import { NgxMaskModule } from 'ngx-mask';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { ShozasSharedModule } from 'app/shared';
import { RecommendedService } from 'app/@akita/recommended/recommended.service';

@NgModule({
    declarations: [
        StateDetailComponent,
        ImagesCarrouselComponent,
        MapComponent,
        CommentComponent,
        CommentSectionComponent,
        TitleComponent,
        SidecardComponent,
        AmenitiesComponent,
        FeaturesComponent,
        IpsDataComponent,
        FinanceModalComponent,
        FinanceCardComponent,
        SidecardLikeComponent,
        RecommendedComponent
    ],
    imports: [
        DetailRoutingModule,
        GalleryModule.forRoot(),
        CommonModule,
        AngularMaterialModule,
        StarRatingModule,
        MatDialogModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: MAPS_API_KEY
        }),
        NgxMaskModule.forRoot(),
        ShozasSharedModule
    ],
    providers: [RealStateStore, RealStateQuery, RealStateService, ReviewQuery, ReviewService, ReviewStore, RecommendedService],
    entryComponents: [FinanceModalComponent],
    exports: [RecommendedComponent]
})
export class DetailModule {}
