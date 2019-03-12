import { Component, OnInit } from '@angular/core';
import { RealState, RealStateQuery, RealStateService } from 'app/@akita/real-state';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReviewService } from 'app/@akita/review';

@Component({
    selector: 'jhi-state-detail',
    templateUrl: './state-detail.component.html',
    styleUrls: ['state-detail.component.scss']
})
export class StateDetailComponent implements OnInit {
    id: number;
    detail$: Observable<RealState>;

    constructor(
        private detailService: RealStateService,
        private detailQuery: RealStateQuery,
        private route: ActivatedRoute,
        private reviewService: ReviewService
    ) {}
    ngOnInit() {
        console.log('Reached: state-detail-component!!!');
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.detailService.get(this.id);
        this.detail$ = this.detailQuery.getDetail(this.id);
        this.detail$.subscribe(realState => {
            if (realState) {
                console.log(realState);
                this.reviewService.getReviews(realState.user.id!, realState.id!);
            }
        });
    }
}
