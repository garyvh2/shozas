import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RSAmenity } from 'app/@akita/external-models/rs-amenity';

@Component({
    selector: 'jhi-custom-amenitites-input',
    templateUrl: './custom-amenitites-input.component.html',
    styleUrls: ['custom-amenitites-input.component.scss']
})
export class CustomAmenititesInputComponent implements OnInit {
    name = new FormControl();
    description = new FormControl();

    @Output()
    onNewCustomAmenities: EventEmitter<RSAmenity> = new EventEmitter<RSAmenity>();
    constructor() {}

    ngOnInit() {}
    validation(formControl: FormControl) {
        if (!formControl.value) {
            formControl.setErrors(Validators.required);
            formControl.markAsTouched();
            return false;
        } else {
            formControl.clearValidators();
        }
        return true;
    }

    reset() {
        this.name.reset();
        this.description.reset();
    }

    onAddButton() {
        const nameValid = this.validation(this.name);
        const descriptionValid = this.validation(this.description);
        const isValid = nameValid && descriptionValid;
        if (isValid) {
            const amenitie: RSAmenity = {
                name: this.name.value,
                description: this.description.value
            };
            this.reset();
            this.onNewCustomAmenities.emit(amenitie);
        }
    }
}
