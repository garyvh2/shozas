import { NgxMaskModule } from 'ngx-mask';
import { RealStateMngRoutingModule } from './real-state-mng.route';
import { ShozasSharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealStateMngViewComponent } from './views/real-state-mng-view/real-state-mng-view.component';
import { RealStateFormComponent } from './components/real-state-form/real-state-form.component';
import { RealStateService, RealStateQuery } from '../../@akita/real-state/index';

@NgModule({
    declarations: [RealStateMngViewComponent, RealStateFormComponent],
    imports: [CommonModule, ShozasSharedModule, RealStateMngRoutingModule, NgxMaskModule.forRoot()],
    providers: [RealStateService, RealStateQuery]
})
export class RealStateMngModule {}
