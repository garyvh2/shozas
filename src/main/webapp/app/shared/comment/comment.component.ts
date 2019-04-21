import { Review } from './../../@akita/review/review.model';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
@Component({
    selector: 'jhi-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['comment.component.scss']
})
export class CommentComponent implements OnInit {
    @Input()
    comment: Review;
    @Input()
    showRealState = false;
    constructor() {}

    ngOnInit() {}

    getFormatDate() {
        if (this.comment) {
            return moment(this.comment.date)
                .locale('es')
                .format('LL');
        }
    }
}
