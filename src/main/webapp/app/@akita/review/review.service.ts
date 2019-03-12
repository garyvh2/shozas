import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MOCK_SERVER_API_URL } from 'app/app.constants';
import { ID } from '@datorama/akita';
import { ReviewStore } from './review.store';
@Injectable()
export class ReviewService {
    constructor(private reviewStore: ReviewStore, private http: HttpClient) {}
    getReviews(idUser: ID, idRealState: ID) {
        const url = `${MOCK_SERVER_API_URL}/api/reviews/get?userId=${idUser}&realStateId=${idRealState}`;
        this.http.get(url).subscribe((response: any) => {
            this.reviewStore.set(response.result);
        });
    }
}
