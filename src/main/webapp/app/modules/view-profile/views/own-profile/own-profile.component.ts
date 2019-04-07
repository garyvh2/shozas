import { AccountService } from '../../../../core';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/@akita/user';

@Component({
    selector: 'jhi-own-profile',
    templateUrl: './own-profile.component.html',
    styleUrls: ['own-profile.component.scss']
})
export class OwnProfileComponent implements OnInit {
    user: User;
    constructor(private account: AccountService) {}

    async ngOnInit() {
        this.user = await this.account.identity();
    }
}
