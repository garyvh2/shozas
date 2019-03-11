import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatGridListModule, MatProgressSpinnerModule],
    exports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatGridListModule, MatProgressSpinnerModule]
})
export class AngularMaterialModule {}
