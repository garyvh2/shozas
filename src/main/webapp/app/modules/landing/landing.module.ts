import { LandingService } from './landing.service';
import { StarRatingModule } from 'angular-star-rating';
import { FilterAmountComponent } from './components/filter-amount/filter-amount.component';
import { LandingRoutingModule } from './landing.route';
import { NgModule } from '@angular/core';

import { ShozasSharedModule } from 'app/shared';
import { SearchResultsComponent } from './views/search-results/search-results.component';
import { RangeComponentComponent } from './components/range-component/range-component.component';
import { FilterAppartmentComponent } from './components/filter-appartment/filter-appartment.component';
import { FilterLotComponent } from './components/filter-lot/filter-lot.component';
import { FilterHomeComponent } from './components/filter-home/filter-home.component';
import { RealStateStore, RealStateService } from 'app/@akita/real-state';
import { FilterRatingComponent } from './components/filter-rating/filter-rating.component';
import { LocationFiltersService } from 'app/shared/location-filters/location-filters.service';

@NgModule({
    declarations: [
        SearchResultsComponent,
        FilterAmountComponent,
        RangeComponentComponent,
        FilterAppartmentComponent,
        FilterLotComponent,
        FilterHomeComponent,
        FilterRatingComponent
    ],
    imports: [ShozasSharedModule, LandingRoutingModule, StarRatingModule.forRoot()],
    providers: [LandingService, RealStateStore, RealStateService, LocationFiltersService],
    exports: [FilterAppartmentComponent, FilterLotComponent, FilterHomeComponent, FilterRatingComponent]
})
export class LandingModule {}
