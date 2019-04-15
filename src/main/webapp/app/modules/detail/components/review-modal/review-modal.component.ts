import { IReviewModal } from './review-modal';
import { Router } from '@angular/router';
import { Review } from './../../../../@akita/review/review.model';
import { ReviewService } from 'app/@akita/review';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RatingChangeEvent } from 'angular-star-rating';

@Component({
    selector: 'jhi-review-modal',
    templateUrl: './review-modal.component.html',
    styleUrls: ['review-modal.component.scss']
})
export class ReviewModalComponent implements OnInit {
    comment = new FormControl('', Validators.required);
    rating = 0;
    loading = false;
    constructor(
        public dialogRef: MatDialogRef<ReviewModalComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: IReviewModal,
        private reviewService: ReviewService,
        private router: Router,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit() {}

    updateRating(event: RatingChangeEvent) {
        console.log(this.data);
        this.rating = event.rating;
    }

    sendReview() {
        if (this.rating !== 0 && this.comment.valid) {
            this.loading = true;
            const review: Review = {
                comment: this.comment.value,
                rating: this.rating,
                userShopper: { ...this.data.user, favorites: undefined },
                // @ts-ignore
                realState: { id: this.data.realStateId }
            };

            this.reviewService.createReview(review).subscribe(
                () => {
                    this.loading = false;
                    this.dialogRef.close();
                    this.snackbar.open('Gracias por su calificación', 'cerrar', {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                    this.router.navigate(['/']);
                },
                () => (this.loading = false)
            );
        }
    }
}
