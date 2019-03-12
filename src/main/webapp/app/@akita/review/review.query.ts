import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { ReviewStore, ReviewState, reviewStore } from './review.store';
import { Review } from './review.model';
@Injectable()
export class ReviewQuery extends QueryEntity<ReviewState, Review> {
    constructor(protected store: ReviewStore) {
        super(store);
    }
    getRealStateReviews(idRealState: ID) {
        console.log(idRealState);
        return this.selectAll({
            filterBy: entity => {
                return entity.realStateId.toString() === idRealState;
            }
        });
    }
}

export const reviewQuery = new ReviewQuery(reviewStore);
