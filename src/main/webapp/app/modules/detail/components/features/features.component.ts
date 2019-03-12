import { Component, OnInit, Input } from '@angular/core';
import { RealState } from '../../../../@akita/real-state';

@Component({
    selector: 'jhi-features',
    templateUrl: './features.component.html',
    styleUrls: ['features.component.scss']
})
export class FeaturesComponent implements OnInit {
    @Input()
    detail: RealState;

    constructor() {}

    ngOnInit() {}
}
