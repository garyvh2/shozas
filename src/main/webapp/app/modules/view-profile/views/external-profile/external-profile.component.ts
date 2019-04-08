import { RealStateQuery } from './../../../../@akita/real-state/real-state.query';
import { Observable } from 'rxjs';
import { RealState } from './../../../../@akita/real-state/real-state.model';
import { AccountService, UserService } from '../../../../core';
import { Component, OnInit } from '@angular/core';
import { User } from './../../../../@akita/user';
import { RealStateService } from 'app/@akita/real-state';

@Component({
    selector: 'jhi-external-profile',
    templateUrl: './external-profile.component.html',
    styles: []
})
export class ExternalProfileComponent implements OnInit {
    user: User;
    realStates$: Observable<RealState[]>;
    isLoadingRealState$: Observable<boolean>;
    constructor(private userService: UserService, private realStateService: RealStateService, private realStateQuery: RealStateQuery) {}

    async ngOnInit() {
        this.user = await this.account.identity();
        this.getUserRealState(this.user);
    }
    getUserRealState(user: User) {
        this.realStates$ = this.realStateQuery.getUserRealState(user.login);
        this.isLoadingRealState$ = this.realStateQuery.selectLoading();
        this.realStateService.getUserRealState(user.login);
    }
}
