import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesCarrouselComponent } from './components/images-carrousel/images-carrousel.component';
import { DetailRoutingModule } from 'app/modules/detail/detail.route';
import { HouseComponent } from './views/house/house.component';
import { LotComponent } from './views/lot/lot.component';
import { ApartmentComponent } from './views/apartment/apartment.component';
import { DetailQuery, DetailService, DetailStore } from './state';

@NgModule({
    declarations: [HouseComponent, ImagesCarrouselComponent, HouseComponent, LotComponent, ApartmentComponent],
    imports: [CommonModule, DetailRoutingModule],
    providers: [DetailStore, DetailQuery, DetailService]
})
export class DetailModule {}
