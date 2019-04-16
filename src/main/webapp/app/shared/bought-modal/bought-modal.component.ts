import { RealStateService } from 'app/@akita/real-state';
import { RealState } from './../../@akita/real-state/real-state.model';
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
        @Optional() @Inject(MAT_DIALOG_DATA) public data: RealState,
        private reviewService: ReviewService,
        private snackBar: MatSnackBar,
        private realStateService: RealStateService
    ) {}

    ngOnInit() {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onMarksAsSold() {
        if (!this.unknownEmail.value && this.users.length === 1) {
            this.loading = true;
            const review = {
                userShopper: { login: this.users[0] },
                realState: { ...this.data },
                isSold: this.data.isSold || false,
                isRented: this.data.isRented || false
            };
            this.sendReview(review);
        } else if (this.unknownEmail.value) {
            const review = { userShopper: { login: '' }, realState: { ...this.data } };
            this.sendReview(review);
        }
    }

    sendReview(review: any) {
        this.reviewService.generateReview(review).subscribe(
            () => {
                this.loading = false;
                this.openSnackbar();
                this.realStateService.getUserRealState(this.data.owner.login);
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
