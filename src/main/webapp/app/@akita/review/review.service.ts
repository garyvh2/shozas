import { Review } from './review.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MOCK_SERVER_API_URL, SERVER_API_URL } from 'app/app.constants';
import { ID } from '@datorama/akita';
import { ReviewStore } from './review.store';

@Injectable()
export class ReviewService {
    constructor(private reviewStore: ReviewStore, private http: HttpClient) {}
    getReviews(idRealState: ID) {
        const url = `${SERVER_API_URL}/api/ratingsAndReviews/get-reviews?realStateId=${idRealState}`;
        this.http.get(url).subscribe((response: any) => {
            this.reviewStore.set(response.result);
        });
    }
    generateReview(review: any) {
        const url = `${SERVER_API_URL}/api/ratingsAndReviews/generate`;
        return this.http.post(url, review);
    }

    createReview(review: any) {
        const url = `${SERVER_API_URL}/api/ratingsAndReviews/create`;
        return this.http.post(url, review);
    }
}
