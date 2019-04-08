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
    isLoading$: Observable<boolean>;
    constructor(private account: AccountService, private realStateService: RealStateService, private realStateQuery: FavoriteStateQuery) {}

    async ngOnInit() {
        this.user = await this.account.identity();
        this.getFavorites(this.user);
    }

    getFavorites(user: User) {
        this.favorites$ = this.realStateQuery.favorites$;
        this.isLoading$ = this.realStateQuery.selectLoading();
        if (user) {
            this.realStateService.getFavorites(user.id);
        }
    }
}
