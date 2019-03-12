import { RealState } from './../../../../@akita/real-state/real-state.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-amenities',
    templateUrl: './amenities.component.html',
    styleUrls: ['amenities.component.scss']
})
export class AmenitiesComponent implements OnInit {
    @Input()
    detail: RealState;

    constructor() {}

    ngOnInit() {}
}
