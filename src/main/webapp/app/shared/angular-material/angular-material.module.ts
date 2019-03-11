import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatCardModule
} from '@angular/material';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatTabsModule
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatTabsModule
    ]
})
export class AngularMaterialModule {}
