import { ReviewQuery } from './../../../../@akita/review/review.query';
import { Review } from './../../../../@akita/review/review.model';

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';

@Component({
    selector: 'jhi-comment-section',
    templateUrl: './comment-section.component.html',
    styleUrls: ['comment-section.component.scss']
})
export class CommentSectionComponent implements OnChanges {
    @Input()
    realStateId: ID;

    comments$: Observable<Review[]>;
    isLoading$: Observable<boolean>;
    comments: Review[] = [];
    showQuatity = 1;
    constructor(private reviewQuery: ReviewQuery) {}

    ngOnChanges() {
        this.comments$ = this.reviewQuery.getRealStateReviews(this.realStateId);
        this.comments$.subscribe(queryComments => (this.comments = queryComments));
        this.isLoading$ = this.reviewQuery.selectLoading();
        this.isLoading$.subscribe();
    }

    show() {
        this.showQuatity === 1 ? (this.showQuatity = this.comments.length) : (this.showQuatity = 1);
    }
}
