import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { RecommendedStateQuery } from 'app/@akita/recommended/recommended.query';
import { RecommendedService } from 'app/@akita/recommended/recommended.service';
import { AccountService } from 'app/core/auth/account.service';
import { RealState } from 'app/@akita/real-state';

@Component({
    selector: 'jhi-recommended',
    templateUrl: './recommended.component.html',
    styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit, OnChanges {
    /** Akita queries */
    recommended$: Observable<RealState[]>;
    isLoading$: Observable<boolean>;

    @Input()
    realStateId: number;

    constructor(
        private recommendedService: RecommendedService,
        private recommendedQuery: RecommendedStateQuery,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.recommended$ = this.recommendedQuery.recommended$;
        this.isLoading$ = this.recommendedQuery.selectLoading();
        this.accountService.identity().then(user => {
            if (user) {
                this.recommendedService.getRecommendedByUser(user.id);
            } else {
                this.recommendedService.getRecommendedByItem(this.realStateId);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        const { currentValue, previousValue } = changes.realStateId;
        if (currentValue !== previousValue) {
            this.accountService.identity().then(user => {
                if (user) {
                    this.recommendedService.getRecommendedByUser(user.id);
                } else {
                    this.recommendedService.getRecommendedByItem(this.realStateId);
                }
            });
        }
    }
}
