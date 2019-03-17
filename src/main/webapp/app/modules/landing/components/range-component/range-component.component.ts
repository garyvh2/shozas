import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Options } from 'ng5-slider';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'jhi-range-component',
    templateUrl: './range-component.component.html',
    styleUrls: ['./range-component.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RangeComponentComponent),
            multi: true
        }
    ]
})
export class RangeComponentComponent implements ControlValueAccessor {
    @Output()
    highValueChange: EventEmitter<number> = new EventEmitter<number>();

    @Input()
    options: Options = {
        floor: 0,
        ceil: 100
    };

    /** NG MODEL */
    range: any = {};
    private onChangeCallback: (_: any) => void = () => {};

    /**
     * NG Model Configuration
     */
    get lowValue(): number {
        return this.range && this.range.low;
    }

    set lowValue(value: number) {
        if (value) {
            this.range.low = value;
            this.onChangeCallback(this.range);
        }
    }
    get highValue(): number {
        return this.range && this.range.high;
    }

    set highValue(value: number) {
        if (value) {
            this.range.high = value;
            this.onChangeCallback(this.range);
        }
    }

    writeValue(value: any) {
        if (value) {
            this.range = value;
        }
    }
    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {}
}
