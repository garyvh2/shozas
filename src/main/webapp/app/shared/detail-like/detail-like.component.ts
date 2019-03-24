import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'jhi-detail-like',
    templateUrl: './detail-like.component.html',
    styleUrls: ['./detail-like.component.scss']
})
export class DetailLikeComponent implements OnInit {
    @Input()
    liked: boolean;

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(
            `shozas_like`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/like.svg')
        );
    }

    ngOnInit() {}
}
