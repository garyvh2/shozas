import { StarRatingModule } from 'angular-star-rating';
import { ListingComponent } from './listing/listing.component';
import { DetailSpecComponent } from './detail-spec/detail-spec.component';
import { DetailLikeComponent } from './detail-like/detail-like.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { ShozasSharedLibsModule, ShozasSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { AngularMaterialModule } from 'app/shared/angular-material/angular-material.module';
import { UserRatingComponent } from './user-rating/user-rating.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationFiltersComponent } from './location-filters/location-filters.component';

@NgModule({
    imports: [ShozasSharedLibsModule, ShozasSharedCommonModule, StarRatingModule.forRoot()],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DetailLikeComponent,
        DetailSpecComponent,
        ListingComponent,
        UserRatingComponent,
        LocationFiltersComponent
    ],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        ShozasSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        AngularMaterialModule,
        DetailLikeComponent,
        DetailSpecComponent,
        ListingComponent,
        UserRatingComponent,
        ReactiveFormsModule,
        FormsModule,
        LocationFiltersComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShozasSharedModule {
    static forRoot() {
        return {
            ngModule: ShozasSharedModule
        };
    }
}
