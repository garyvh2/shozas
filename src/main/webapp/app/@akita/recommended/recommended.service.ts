import { SERVER_API_URL } from 'app/app.constants';
import { ApiResponse } from './../external-models/apiResponse.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecommendedStateStore } from './recommended.store';
import { RealState, RealStateStore } from 'app/@akita/real-state';

@Injectable()
export class RecommendedService {
    constructor(private http: HttpClient, private detailStore: RealStateStore, private recommendedStore: RecommendedStateStore) {}

    getRecommendedByUser(userId) {
        const url = `${SERVER_API_URL}/api/recommendations/user/${userId}?count=10`;
        this.recommendedStore.setLoading(true);
        return this.http.get(url).subscribe(
            ({ result: recommended }: ApiResponse<RealState[]>) => {
                recommended.forEach((item: RealState) => {
                    this.detailStore.upsert(item.id, item);
                });
                this.recommendedStore.update({
                    recommended
                });
                this.recommendedStore.setLoading(false);
            },
            () => this.recommendedStore.setLoading(false)
        );
    }

    getRecommendedByItem(itemId) {
        const url = `${SERVER_API_URL}/api/recommendations/item/${itemId}?count=10`;
        this.recommendedStore.setLoading(true);
        return this.http.get(url).subscribe(
            ({ result: recommended }: ApiResponse<RealState[]>) => {
                recommended.forEach((item: RealState) => {
                    this.detailStore.upsert(item.id, item);
                });
                this.recommendedStore.update({
                    recommended
                });
                this.recommendedStore.setLoading(false);
            },
            () => this.recommendedStore.setLoading(false)
        );
    }

    addView(itemId, userId, inTime, duration) {
        const url = `${SERVER_API_URL}/api/recommendations/view`;
        this.recommendedStore.setLoading(true);
        return this.http.post(url, {
            userId,
            itemId,
            inTime,
            duration
        });
    }
}
