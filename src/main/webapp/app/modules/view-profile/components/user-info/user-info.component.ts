import { ReviewsModalComponent } from './../reviews-modal/reviews-modal.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../../../../@akita/user';

@Component({
    selector: 'jhi-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['user-info.component.scss']
})
export class UserInfoComponent implements OnChanges {
    @Input()
    user: User;

    constructor(public dialog: MatDialog) {}

    ngOnChanges() {}

    onClickClose() {
        this.dialog.closeAll();
    }

    onClickReviews() {
        this.dialog.open(ReviewsModalComponent, { data: this.user.reviews, autoFocus: false });
    }
    getImage(): string {
        if (this.user && this.user.image) {
            return this.user.image.source;
        }

        return 'assets/images/profile.png';
    }

    getFormattedPhone() {
        const phoneStr = this.user.phone.toString();

        return `${phoneStr.substring(0, 4)}-${phoneStr.substring(4)}`;
    }
}
