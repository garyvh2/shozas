import { FormControl } from '@angular/forms';
import { ID } from '@datorama/akita';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Optional, Inject, Injectable } from '@angular/core';
import { ReviewService } from '../../@akita/review';

@Component({
    selector: 'jhi-bought-modal',
    templateUrl: './bought-modal.component.html',
    styleUrls: ['bought-modal.component.scss']
})
@Injectable()
export class BoughtModalComponent implements OnInit {
    unknownEmail = new FormControl(false);
    users: string[] = [];
    loading = false;
    constructor(
        public dialogRef: MatDialogRef<BoughtModalComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ID,
        private reviewService: ReviewService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onMarksAsSold() {
        if (!this.unknownEmail.value && this.users.length === 1) {
            this.loading = true;
            const review = { userShopper: { login: this.users[0] }, realState: { id: this.data } };
            this.sendReview(review);
        } else if (this.unknownEmail.value) {
            const review = { userShopper: { login: '' }, realState: { id: this.data } };
            this.sendReview(review);
        }
    }

    sendReview(review: any) {
        this.reviewService.generateReview(review).subscribe(
            () => {
                this.loading = false;
                this.openSnackbar();
                this.onNoClick();
            },
            () => (this.loading = false)
        );
    }
    openSnackbar() {
        this.snackBar.open('Se ha registrado se le ha enviado un correo al comprador', 'cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'confirmation-snackbar'
        });
    }
}
