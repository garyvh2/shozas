import { LoginModalService } from './../../../../core/login/login-modal.service';
import { AccountService } from '../../../../core';
import { ReviewModalComponent } from './../../components/review-modal/review-modal.component';
import { IpsDataService } from './../../services/ips-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RealState, RealStateService, RealStateQuery } from '../../../../@akita/real-state';
import { ReviewService } from '../../../../@akita/review/review.service';
import { RecommendedService } from '../../../../@akita/recommended/recommended.service';

@Component({
    selector: 'jhi-state-detail',
    templateUrl: './state-detail.component.html',
    styleUrls: ['state-detail.component.scss']
})
export class StateDetailComponent implements OnInit, OnChanges {
    id: string;
    detail$: Observable<RealState>;
    inTime: Date;

    get viewDuration() {
        return Math.floor(new Date().getTime() / 1000) - Math.floor(this.inTime.getTime() / 1000);
    }

    constructor(
        private detailService: RealStateService,
        private detailQuery: RealStateQuery,
        private route: ActivatedRoute,
        private router: Router,
        private reviewService: ReviewService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        public dialog: MatDialog,
        private loginModalService: LoginModalService,
        private recommendedService: RecommendedService,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.detailService.get(this.id);
        this.detail$ = this.detailQuery.getDetail(this.id);
        this.detail$.subscribe(realState => {
            if (realState) {
                this.reviewService.getReviews(realState.id!);
            }
        });
        this.loadDetail();

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
        let isRegistred: boolean;
        let email: string;
        this.route.queryParamMap.subscribe(params => {
            isRegistred = params.get('isRegistred') === 'true';
            email = params.get('email');
            if (isRegistred && email) {
                this.accountService.identity().then(user => {
                    if (user) {
                        this.dialog.open(ReviewModalComponent, {
                            autoFocus: false,
                            disableClose: true,
                            data: { user, realStateId: this.id }
                        });
                    } else {
                        this.loginModalService.open();
                    }
                });
                this.accountService.getAuthenticationState().subscribe(user => {
                    const isOnDetail = this.router.url.includes('detail/');
                    if (user && isOnDetail) {
                        this.dialog.open(ReviewModalComponent, {
                            autoFocus: false,
                            disableClose: true,
                            data: { user, realStateId: this.id }
                        });
                    }
                });
            } else if (!isRegistred && email) {
                this.router.navigate(['/register']);
            }
        });
    }

    loadDetail() {
        this.inTime = new Date();
        this.detailService.get(this.id);
        this.detail$ = this.detailQuery.getDetail(this.id);
        this.detail$.subscribe(realState => {
            if (realState && realState.owner) {
                this.reviewService.getReviews(realState.id!);
            }
        });
    }

    ngOnChanges() {
        this.loadDetail();
    }

    canDeactivate() {
        const view$ = new Subject<boolean>();
        this.detail$.subscribe(detail => {
            this.accountService.identity().then(user => {
                if (user) {
                    this.recommendedService
                        .addView(detail.id, user.id, new Date(), this.viewDuration)
                        .subscribe(() => view$.next(true), () => view$.next(false));
                } else {
                    view$.next(true);
                }
            });
        });
        return view$.asObservable();
    }
}
