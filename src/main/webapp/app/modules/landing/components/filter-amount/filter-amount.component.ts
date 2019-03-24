import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, Input, forwardRef } from '@angular/core';

@Component({
    selector: 'jhi-filter-amount',
    templateUrl: './filter-amount.component.html',
    styleUrls: ['./filter-amount.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FilterAmountComponent),
            multi: true
        }
    ]
})
export class FilterAmountComponent implements ControlValueAccessor {
    @Input()
    size: number;
    amount = 1;

    /** NG MODEL */
    selected = 1;
    private onChangeCallback: (_: any) => void = () => {};

    values(): number[] {
        return Array(this.size)
            .fill(0)
            .map((value, index) => ++index);
    }

    /**
     * NG Model Configuration
     */
    valueChange({ value }) {
        this.onChangeCallback(value);
    }

    writeValue(value: any) {
        if (value) {
            this.selected = value;
        }
    }
    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {}
}
