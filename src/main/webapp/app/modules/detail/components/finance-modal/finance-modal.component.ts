import { FinanceData } from './../../../../@akita/external-models/finance-data';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'jhi-finance-modal',
    templateUrl: './finance-modal.component.html',
    styleUrls: ['./finance-modal.component.scss']
})
export class FinanceModalComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<FinanceModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
