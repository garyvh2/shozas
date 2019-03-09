import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { ShozasSharedLibsModule, ShozasSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { AngularMaterialModule } from 'app/shared/angular-material/angular-material.module';

@NgModule({
    imports: [ShozasSharedLibsModule, ShozasSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [ShozasSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, AngularMaterialModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShozasSharedModule {
    static forRoot() {
        return {
            ngModule: ShozasSharedModule
        };
    }
}
