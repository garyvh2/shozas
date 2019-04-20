import UserType from 'app/@akita/external-models/user-type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, Injectable, Optional, Input } from '@angular/core';
import { Review } from '../../../../@akita/review';

@Component({
    selector: 'jhi-reviews-modal',
    templateUrl: './reviews-modal.component.html',
    styleUrls: ['reviews-modal.component.scss']
})
@Injectable()
export class ReviewsModalComponent implements OnInit {
    minReviews = 3;
    showQty = this.minReviews;

    constructor(public dialogRef: MatDialogRef<ReviewsModalComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: Review[]) {}

    ngOnInit() {}

    show() {
        this.showQty === this.minReviews ? (this.showQty = this.data.length) : (this.showQty = this.minReviews);
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    isShowMore() {
        return this.data && this.data.length > this.minReviews;
    }
}
