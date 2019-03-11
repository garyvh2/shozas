import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule
} from '@angular/material';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatGridListModule, MatDividerModule, MatCardModule],
    exports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatGridListModule, MatDividerModule, MatCardModule]
})
export class AngularMaterialModule {}
