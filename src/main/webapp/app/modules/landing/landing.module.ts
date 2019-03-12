import { SearchResultsService } from './views/search-results/search-results.service';
import { LocationFiltersComponent } from './components/location-filters/location-filters.component';
import { LandingService } from './landing.service';
import { StarRatingModule } from 'angular-star-rating';
import { FilterAmountComponent } from './components/filter-amount/filter-amount.component';
import { LandingRoutingModule } from './landing.route';
import { NgModule } from '@angular/core';

import { ShozasSharedModule } from 'app/shared';
import { SearchResultsComponent } from './views/search-results/search-results.component';
import { RangeComponentComponent } from './components/range-component/range-component.component';

@NgModule({
    declarations: [SearchResultsComponent, FilterAmountComponent, RangeComponentComponent, LocationFiltersComponent],
    imports: [ShozasSharedModule, LandingRoutingModule, StarRatingModule.forRoot()],
    providers: [LandingService, SearchResultsService]
})
export class LandingModule {}
