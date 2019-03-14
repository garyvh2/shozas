import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-filter-amount',
    templateUrl: './filter-amount.component.html',
    styleUrls: ['./filter-amount.component.scss']
})
export class FilterAmountComponent implements OnInit {
    @Input()
    size: number;
    amount = 1;

    values(): number[] {
        return Array(this.size)
            .fill(0)
            .map((value, index) => ++index);
    }

    constructor() {}

    ngOnInit() {}
}
