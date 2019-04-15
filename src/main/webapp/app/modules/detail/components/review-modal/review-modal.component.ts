import { User } from './../../../../@akita/user/user.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'jhi-review-modal',
    templateUrl: './review-modal.component.html',
    styleUrls: ['review-modal.component.scss']
})
export class ReviewModalComponent implements OnInit {
    comment = new FormControl('', Validators.required);
    rating = 0;
    constructor(public dialogRef: MatDialogRef<ReviewModalComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: User) {}

    ngOnInit() {}
}
