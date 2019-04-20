import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Optional, Inject, Injectable } from '@angular/core';
import { IReviewModal } from './Iremove-modal';
import { RemoveType } from '../util/remove-type';
import { RealStateService, RealStateQuery } from '../../@akita/real-state';
import { UserService, UserQuery, userQuery } from '../../@akita/user';

@Component({
    selector: 'jhi-remove-modal',
    templateUrl: './remove-modal.component.html',
    styleUrls: ['remove-modal.component.scss']
})
@Injectable()
export class RemoveModalComponent implements OnInit {
    userLoading: Observable<boolean>;
    realStateLoading: Observable<boolean>;
    constructor(
        public dialogRef: MatDialogRef<RemoveModalComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: IReviewModal,
        private realStateService: RealStateService,
        private userService: UserService,
        private userQuery$: UserQuery,
        private realStateQuery: RealStateQuery
    ) {}

    ngOnInit() {
        this.userLoading = this.userQuery$.selectLoading();
        this.realStateLoading = this.realStateQuery.selectLoading();
    }

    isUserType() {
        return this.data.serviceType === RemoveType.User;
    }

    isRealState() {
        return this.data.serviceType === RemoveType.RealState;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    async onAccept() {
        switch (this.data.serviceType) {
            case RemoveType.RealState:
                await this.realStateService.deactivateRealState(this.data.id);
                this.onNoClick();
                break;
            case RemoveType.User:
                await this.userService.deactivateUser(this.data.id);
                this.onNoClick();
                break;
        }
    }
}
