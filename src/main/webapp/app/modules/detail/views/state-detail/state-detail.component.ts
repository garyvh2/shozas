import { LoginModalService } from './../../../../core/login/login-modal.service';
import { AccountService } from 'app/core';
import { ReviewModalComponent } from './../../components/review-modal/review-modal.component';
import { IpsDataService } from './../../services/ips-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RealState, RealStateService, RealStateQuery } from '../../../../@akita/real-state';
import { ReviewService } from '../../../../@akita/review/review.service';

@Component({
    selector: 'jhi-state-detail',
    templateUrl: './state-detail.component.html',
    styleUrls: ['state-detail.component.scss']
})
export class StateDetailComponent implements OnInit {
    id: string;
    detail$: Observable<RealState>;

    constructor(
        private detailService: RealStateService,
        private detailQuery: RealStateQuery,
        private route: ActivatedRoute,
        private reviewService: ReviewService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        public dialog: MatDialog,
        private accountService: AccountService,
        private loginModalService: LoginModalService
    ) {}
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.detailService.get(this.id);
        this.detail$ = this.detailQuery.getDetail(this.id);
        this.detail$.subscribe(realState => {
            if (realState) {
                this.reviewService.getReviews(realState.owner.id!, realState.id!);
            }
        });

        this.matIconRegistry.addSvgIcon(
            `rsd_arrow_down`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/arrow_down.svg')
        );
        this.matIconRegistry.addSvgIcon(`rsd_pin`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/pin.svg'));
        this.matIconRegistry.addSvgIcon(`rsd_bed`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/bed.svg'));
        this.matIconRegistry.addSvgIcon(
            `rsd_garage`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/garage.svg')
        );
        this.matIconRegistry.addSvgIcon(`rsd_ruler`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/ruler.svg'));
        this.matIconRegistry.addSvgIcon(
            `rsd_favorite`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/favorite.svg')
        );
        this.matIconRegistry.addSvgIcon(`rsd_bath`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/bath.svg'));

        this.matIconRegistry.addSvgIcon(`rsd_up`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/up.svg'));
        this.showReviewsModal();
    }

    showReviewsModal() {
        let review: string;
        let email: string;
        this.route.queryParamMap.subscribe(params => {
            review = params.get('review');
            email = params.get('email');
            if (review && email) {
                this.accountService.identity().then(user => {
                    if (user) {
                        this.dialog.open(ReviewModalComponent, { autoFocus: false, disableClose: true, data: user });
                    } else {
                        this.loginModalService.open();
                    }
                });
                this.accountService.getAuthenticationState().subscribe(user => {
                    if (user) {
                        this.dialog.open(ReviewModalComponent, { autoFocus: false, disableClose: true, data: user });
                    }
                });
            }
        });
    }
}
