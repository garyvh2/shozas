import { RealStateService } from 'app/@akita/real-state';
import { ID } from '@datorama/akita';
import { AccountService } from 'app/core';
import { SERVER_API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Favorite {
    public userId: string;
    public realStateId: ID;
}

@Injectable()
export class DetailLikeService {
    constructor(private http: HttpClient, private accountService: AccountService, private realStateService: RealStateService) {}

    addFavorite(favorite: Favorite) {
        const url = `${SERVER_API_URL}/api/realstate/add-favorite`;
        this.http.post(url, favorite).subscribe(() => {
            this.accountService.identity(true).then(user => {
                if (user) {
                    this.realStateService.getFavorites(user.id);
                }
            });
        });
    }

    removeFavorite(favorite: Favorite) {
        const url = `${SERVER_API_URL}/api/realstate/remove-favorite`;
        this.http.post(url, favorite).subscribe(() => {
            this.accountService.identity(true).then(user => {
                if (user) {
                    this.realStateService.getFavorites(user.id);
                }
            });
        });
    }
}
