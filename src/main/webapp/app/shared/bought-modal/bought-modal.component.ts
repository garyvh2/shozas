import { FormControl } from '@angular/forms';
import { ID } from '@datorama/akita';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Optional, Inject, Injectable } from '@angular/core';

@Component({
    selector: 'jhi-bought-modal',
    templateUrl: './bought-modal.component.html',
    styleUrls: ['bought-modal.component.scss']
})
@Injectable()
export class BoughtModalComponent implements OnInit {
    unknownEmail = new FormControl(false);
    users: string[] = [];
    constructor(public dialogRef: MatDialogRef<BoughtModalComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: ID) {}

    ngOnInit() {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onMarksAsSold() {
        if (!this.unknownEmail.value && this.users.length === 1) {
            console.log('send user');
        } else if (this.unknownEmail.value) {
            console.log('just mark as sold');
        }
    }
}
