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
        return this.selectAll({
            filterBy: entity => {
                return entity.realState ? entity.realState.id.toString() === idRealState : false;
            }
        });
    }
}

export const reviewQuery = new ReviewQuery(reviewStore);
