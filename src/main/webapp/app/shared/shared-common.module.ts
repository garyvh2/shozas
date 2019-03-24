import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShozasSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [CommonModule, ShozasSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ShozasSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ShozasSharedCommonModule {}
