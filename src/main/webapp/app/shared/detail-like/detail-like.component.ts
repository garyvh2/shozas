import { DetailLikeService, Favorite } from './detail-like.service';
import { AccountService } from 'app/core/auth/account.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { RealState } from 'app/@akita/real-state';
import { LoginModalService } from 'app/core';

@Component({
    selector: 'jhi-detail-like',
    templateUrl: './detail-like.component.html',
    styleUrls: ['./detail-like.component.scss'],
    providers: [DetailLikeService]
})
export class DetailLikeComponent implements OnInit {
    @Input()
    liked: boolean;
    @Input()
    realState: RealState;

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private accountService: AccountService,
        private detailLikeService: DetailLikeService,
        private loginModalService: LoginModalService
    ) {
        this.matIconRegistry.addSvgIcon(
            `shozas_like`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/like.svg')
        );
    }

    ngOnInit() {
        this.accountService.identity().then(user => {
            if (user) {
                this.liked = user.favorites.includes(this.realState.id);
            } else {
                this.liked = false;
            }
        });
        this.accountService.getAuthenticationState().subscribe(user => {
            if (user) {
                this.liked = user.favorites.includes(this.realState.id);
            } else {
                this.liked = false;
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
