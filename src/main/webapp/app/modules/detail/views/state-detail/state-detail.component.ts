import { LoginModalService } from './../../../../core/login/login-modal.service';
import { AccountService } from '../../../../core';
import { ReviewModalComponent } from './../../components/review-modal/review-modal.component';
import { IpsDataService } from './../../services/ips-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RealState, RealStateService, RealStateQuery } from '../../../../@akita/real-state';
import { ReviewService } from '../../../../@akita/review/review.service';
import { RecommendedService } from '../../../../@akita/recommended/recommended.service';
import { Title, Meta } from '@angular/platform-browser';
import { MetaService } from 'app/shared/meta.service';

@Component({
    selector: 'jhi-state-detail',
    templateUrl: './state-detail.component.html',
    styleUrls: ['state-detail.component.scss']
})
export class StateDetailComponent implements OnInit, OnChanges {
    id: string;
    detail$: Observable<RealState>;
    inTime: Date;
    title: String;

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
        private accountService: AccountService,
        private titleService: Title,
        private meta: MetaService
    ) {}

    ngOnInit() {
        this.meta.createCanonicalURL();
        this.meta.addTag('robots', 'index, follow');

        this.id = this.route.snapshot.paramMap.get('id');
        this.detailService.get(this.id);
        this.detail$ = this.detailQuery.getDetail(this.id);
        this.detail$.subscribe(realState => {
            if (realState) {
                this.meta.addTag(
                    'keywords',
                    `Casas, Apartamentos, Lotes, Costa Rica, ${realState.province}, ${realState.district}, ${realState.city}, ${
                        realState.schools
                    },${realState.services.map(service => service.name)}, bienes raíces, comprar`
                );
                this.meta.addTag(
                    'description',
                    `Costa Rica, ${realState.province}, ${realState.district}, ${realState.city}, ${realState.description}`
                );
                this.titleService.setTitle(realState.title);
                this.reviewService.getReviews(realState.id!);
            }
        });
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.id = this.route.snapshot.paramMap.get('id');
                this.loadDetail();
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
