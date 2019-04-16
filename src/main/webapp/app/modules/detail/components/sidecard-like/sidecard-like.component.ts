import { Favorite } from './../../../../shared/detail-like/detail-like.service';
import { AccountService, LoginModalService } from 'app/core';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DetailLikeService } from 'app/shared/detail-like/detail-like.service';
import { RealState } from 'app/@akita/real-state';

@Component({
    selector: 'jhi-sidecard-like',
    templateUrl: './sidecard-like.component.html',
    styleUrls: ['./sidecard-like.component.scss'],
    providers: [DetailLikeService]
})
export class SidecardLikeComponent implements OnInit, OnChanges {
    @Input()
    liked: boolean;
    @Input()
    realState: RealState;

    constructor(
        private accountService: AccountService,
        private detailLikeService: DetailLikeService,
        private loginModalService: LoginModalService
    ) {}

    ngOnInit() {
        this.accountService.identity().then(user => {
            if (user) {
                this.liked = user.favorites.includes(this.realState.id);
            }
        });
        this.accountService.getAuthenticationState().subscribe(user => {
            if (user) {
                this.liked = user.favorites.includes(this.realState.id);
            }
        });
    }

    ngOnChanges() {
        this.accountService.identity().then(user => {
            if (user) {
                this.liked = user.favorites.includes(this.realState.id);
            }
        });
    }

    toggleLike(event) {
        event.stopPropagation();
        this.accountService.identity().then(user => {
            if (user) {
                const favorite = new Favorite();
                favorite.userId = user.id;
                favorite.realStateId = this.realState.id;

                if (this.liked) {
                    this.detailLikeService.removeFavorite(favorite);
                } else {
                    this.detailLikeService.addFavorite(favorite);
                }
            } else {
                this.loginModalService.open();
            }
        });
    }
}
