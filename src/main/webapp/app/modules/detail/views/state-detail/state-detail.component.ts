import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
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
    id: number;
    detail$: Observable<RealState>;

    constructor(
        private detailService: RealStateService,
        private detailQuery: RealStateQuery,
        private route: ActivatedRoute,
        private reviewService: ReviewService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
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
    }
}
