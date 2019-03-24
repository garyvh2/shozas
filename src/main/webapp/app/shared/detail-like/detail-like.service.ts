import { ID } from '@datorama/akita';
import { AccountService } from 'app/core';
import { SERVER_API_URL } from './../../app.constants';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Favorite {
    public userId: string;
    public realStateId: ID;
}

@Injectable()
export class DetailLikeService {
    constructor(private http: HttpClient, private accountService: AccountService) {}

    addFavorite(favorite: Favorite) {
        const url = `${SERVER_API_URL}/api/realstate/add-favorite`;
        this.http.post(url, favorite).subscribe(() => {
            this.accountService.identity(true);
        });
    }

    removeFavorite(favorite: Favorite) {
        const url = `${SERVER_API_URL}/api/realstate/remove-favorite`;
        this.http.post(url, favorite).subscribe(() => {
            this.accountService.identity(true);
        });
    }
}
