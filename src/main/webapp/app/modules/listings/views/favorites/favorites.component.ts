import { FavoriteStateQuery } from './../../@akita/favorite/favorite.query';
import { Observable } from 'rxjs';
import { RealStateService, RealState } from 'app/@akita/real-state';
import { AccountService } from 'app/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
    favorites$: Observable<RealState[]>;
    isLoading$: Observable<boolean>;

    constructor(
        private accountService: AccountService,
        private realStateService: RealStateService,
        private favoriteStateQuery: FavoriteStateQuery
    ) {}

    ngOnInit() {
        this.favorites$ = this.favoriteStateQuery.favorites$;
        this.isLoading$ = this.favoriteStateQuery.selectLoading();
        this.accountService.identity().then(user => {
            if (user) {
                this.realStateService.getFavorites(user.id);
            }
        });
    }
}
