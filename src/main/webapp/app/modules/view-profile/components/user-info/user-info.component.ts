import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../@akita/user';

@Component({
    selector: 'jhi-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
    @Input()
    user: User;
    constructor() {}

    ngOnInit() {}

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
