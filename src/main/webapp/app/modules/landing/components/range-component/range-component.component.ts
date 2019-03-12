import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
    selector: 'app-range-component',
    templateUrl: './range-component.component.html',
    styleUrls: ['./range-component.component.scss']
})
export class RangeComponentComponent implements OnInit {
    @Input()
    min = 0;
    @Input()
    max = 100;
    @Input()
    options: Options = {
        floor: 0,
        ceil: 100
    };

    constructor() {}

    ngOnInit() {}
}
