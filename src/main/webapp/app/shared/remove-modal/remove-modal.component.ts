import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Optional, Inject, Injectable } from '@angular/core';
import { IReviewModal } from './Iremove-modal';
import { RemoveType } from '../util/remove-type';

@Component({
    selector: 'jhi-remove-modal',
    templateUrl: './remove-modal.component.html',
    styleUrls: ['remove-modal.component.scss']
})
@Injectable()
export class RemoveModalComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<RemoveModalComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: IReviewModal) {}

    ngOnInit() {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onAccept() {
        switch (this.data.serviceType) {
            case RemoveType.RealState:
                console.log('calls real state service');
                break;
            case RemoveType.User:
                console.log('calls user service');
                break;
        }
    }
}
