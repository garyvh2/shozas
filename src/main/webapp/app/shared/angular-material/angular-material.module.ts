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
    MatTooltipModule,
    MatExpansionModule
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
        MatTooltipModule,
        MatExpansionModule
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
        MatTooltipModule,
        MatExpansionModule
    ]
})
export class AngularMaterialModule {}
