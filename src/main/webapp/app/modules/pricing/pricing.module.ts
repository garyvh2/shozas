import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShozasSharedModule } from 'app/shared';
import { PricingViewComponent } from './views/pricing-view/pricing-view.component';
import { PricingRoutingModule } from './pricing.route';
import { PricingService } from './pricing.service';
import { PricingFilterComponent } from './components/pricing-filter/pricing-filter.component';
import { PricingAmountComponent } from './components/pricing-amount/pricing-amount.component';
import { PricingRangeComponent } from './components/pricing-range/pricing-range.component';
import { PricingIllustrationComponent } from './components/pricing-illustration/pricing-illustration.component';

@NgModule({
    declarations: [
        PricingViewComponent,
        PricingFilterComponent,
        PricingAmountComponent,
        PricingRangeComponent,
        PricingIllustrationComponent
    ],
    imports: [ShozasSharedModule, PricingRoutingModule],
    exports: [],
    providers: [PricingService]
})
export class PricingModule {}
