import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatStepperModule
} from '@angular/material';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatDividerModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatTabsModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatStepperModule
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatDividerModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatTabsModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatStepperModule,
        MatStepperModule
    ]
})
export class AngularMaterialModule {}
