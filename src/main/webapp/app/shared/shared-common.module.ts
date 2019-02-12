import { NgModule } from '@angular/core';

import { ShozasSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ShozasSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ShozasSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ShozasSharedCommonModule {}
