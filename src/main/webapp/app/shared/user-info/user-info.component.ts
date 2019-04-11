import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../../@akita/user';

@Component({
    selector: 'jhi-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['user-info.component.scss']
})
export class UserInfoComponent implements OnChanges {
    @Input()
    user: User;
    constructor() {}

    ngOnChanges() {
        console.log('user', this.user);
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
