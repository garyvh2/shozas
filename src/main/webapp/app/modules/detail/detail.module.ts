import { NgModule } from '@angular/core';

import { ImagesCarrouselComponent } from './components/images-carrousel/images-carrousel.component';
import { DetailRoutingModule } from 'app/modules/detail/detail.route';
import { HouseComponent } from './views/house/house.component';
import { LotComponent } from './views/lot/lot.component';
import { ApartmentComponent } from './views/apartment/apartment.component';
import { DetailQuery, DetailService, DetailStore } from '../../@akita/detail';
import { ShozasSharedModule } from 'app/shared';

@NgModule({
    declarations: [HouseComponent, ImagesCarrouselComponent, HouseComponent, LotComponent, ApartmentComponent],
    imports: [ShozasSharedModule, DetailRoutingModule],
    providers: [DetailStore, DetailQuery, DetailService]
})
export class DetailModule {}
