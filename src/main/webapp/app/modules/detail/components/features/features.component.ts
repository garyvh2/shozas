import { Detail } from 'app/@akita/real-state';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-features',
    templateUrl: './features.component.html',
    styleUrls: ['features.component.scss']
})
export class FeaturesComponent implements OnInit {
    @Input()
    detail: Detail;

    constructor() {}

    ngOnInit() {}
}
