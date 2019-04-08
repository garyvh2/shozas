import { RealStateQuery } from './../../../../@akita/real-state/real-state.query';
import { FavoriteStateQuery } from './../../../listings/@akita/favorite/favorite.query';
import { Observable } from 'rxjs';
import { RealState } from './../../../../@akita/real-state/real-state.model';
import { AccountService } from '../../../../core';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/@akita/user';
import { RealStateService } from 'app/@akita/real-state';

@Component({
    selector: 'jhi-own-profile',
    templateUrl: './own-profile.component.html',
    styleUrls: ['own-profile.component.scss']
})
export class OwnProfileComponent implements OnInit {
    user: User;
    favorites$: Observable<RealState[]>;
    realStates$: Observable<RealState[]>;
    isLoading$: Observable<boolean>;
    isLoadingRealState$: Observable<boolean>;
    constructor(
        private account: AccountService,
        private realStateService: RealStateService,
        private favoriteQuery: FavoriteStateQuery,
        private realStateQuery: RealStateQuery
    ) {}

    async ngOnInit() {
        this.user = await this.account.identity();
        this.getUserRealState(this.user);
        this.getFavorites(this.user);
    }
    getUserRealState(user: User) {
        this.realStates$ = this.realStateQuery.getUserRealState(user.id.toString());
        this.isLoadingRealState$ = this.realStateQuery.selectLoading();
        this.realStateService.get(user.login);
    }
    getFavorites(user: User) {
        this.favorites$ = this.favoriteQuery.favorites$;
        this.isLoading$ = this.favoriteQuery.selectLoading();
        if (user) {
            this.realStateService.getFavorites(user.id);
        }
    }
}
