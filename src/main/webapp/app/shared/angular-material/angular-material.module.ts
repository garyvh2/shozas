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
    MatSnackBarModule
} from '@angular/material';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
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
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatDividerModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatTabsModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ]
})
export class AngularMaterialModule {}
