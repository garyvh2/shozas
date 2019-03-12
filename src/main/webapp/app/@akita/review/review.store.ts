import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Review } from './review.model';

export interface ReviewState extends EntityState<Review> {}

@StoreConfig({ name: 'review' })
@Injectable()
export class ReviewStore extends EntityStore<ReviewState, Review> {
    constructor() {
        super();
    }
}

export const reviewStore = new ReviewStore();
