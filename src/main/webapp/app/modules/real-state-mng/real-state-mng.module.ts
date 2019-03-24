import { NgxMaskModule } from 'ngx-mask';
import { RealStateMngRoutingModule } from './real-state-mng.route';
import { ShozasSharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { RealStateMngViewComponent } from './views/real-state-mng-view/real-state-mng-view.component';
import { RealStateFormComponent } from './components/real-state-form/real-state-form.component';
import { RealStateService, RealStateQuery } from '../../@akita/real-state/index';
import { CustomAmenititesInputComponent } from './components/custom-amenitites-input/custom-amenitites-input.component';
import { RealStateMapComponent } from './components/real-state-map/real-state-map.component';
import { MAPS_API_KEY } from 'app/app.constants';
import { GeolocationService } from './services/geolocation.service';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';

@NgModule({
    declarations: [
        RealStateMngViewComponent,
        RealStateFormComponent,
        CustomAmenititesInputComponent,
        RealStateMapComponent,
        ImageUploaderComponent
    ],
    imports: [
        CommonModule,
        ShozasSharedModule,
        RealStateMngRoutingModule,
        NgxMaskModule.forRoot(),
        AgmCoreModule.forRoot({ apiKey: MAPS_API_KEY })
    ],
    providers: [RealStateService, RealStateQuery, GeolocationService]
})
export class RealStateMngModule {}
