import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'jhi-filter-rating',
    templateUrl: './filter-rating.component.html',
    styleUrls: ['./filter-rating.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FilterRatingComponent),
            multi: true
        }
    ]
})
export class FilterRatingComponent implements OnInit {
    rating = 1;

    /** NG MODEL */
    selected = 1;
    private onChangeCallback: (_: any) => void = () => {};

    constructor() {}

    ngOnInit() {}

    /**
     * NG Model Configuration
     */
    valueChange({ value }) {
        this.selected = value;
        this.onChangeCallback(value);
    }

    writeValue(value: any) {
        if (value) {
            this.selected = Number(value);
        }
    }
    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {}
}
