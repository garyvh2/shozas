import { Component, OnInit, Input, OnChanges } from '@angular/core';
import RealStateType from 'app/@akita/external-models/real-state-type';
import { FormGroup } from '@angular/forms';
import { RSAmenity } from 'app/@akita/external-models/rs-amenity';

@Component({
    selector: 'jhi-real-state-form',
    templateUrl: './real-state-form.component.html',
    styleUrls: ['real-state-form.component.scss']
})
export class RealStateFormComponent implements OnInit, OnChanges {
    realStateType = RealStateType;
    @Input()
    realStateForm: FormGroup;
    @Input()
    isEditable: boolean;
    customAmenities: RSAmenity[] = [];

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        if (this.realStateForm) {
            this.customAmenities = Array.from(this.realStateForm.get('customAmenities').value);
        }
    }

    isDirectionValid() {
        const valid =
            this.realStateForm.get('province').valid && this.realStateForm.get('city').valid && this.realStateForm.get('district').valid;
        const isTouched =
            this.realStateForm.get('province').touched &&
            this.realStateForm.get('city').touched &&
            this.realStateForm.get('district').touched;
        return isTouched ? valid : true;
    }
    onAddCustomAmenitie(amenitie: RSAmenity) {
        this.customAmenities.push(amenitie);
        this.realStateForm.get('customAmenities').setValue(this.customAmenities);
    }

    onDeleteAmenities(index: number) {
        this.customAmenities.splice(index, 1);
        this.realStateForm.get('customAmenities').setValue(this.customAmenities);
    }

    getRealStateName() {
        const type = this.realStateForm.get('realStateType').value;
        if (type === RealStateType.HOUSE) {
            return 'Casa';
        }
        if (type === RealStateType.DEPARTMENT) {
            return 'Apartamento';
        }
        if (type === RealStateType.LOT) {
            return 'Lote';
        }
    }

    isApartment() {
        return this.realStateForm.get('realStateType').value === this.realStateType.DEPARTMENT;
    }
    isLot() {
        return this.realStateForm.get('realStateType').value === this.realStateType.LOT;
    }
}
