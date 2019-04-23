import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LocationFiltersService } from './location-filters.service';
import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output, OnChanges } from '@angular/core';
import { SearchFilter } from 'app/@akita/external-models/searchFilter';
import { KeyValue } from '@angular/common';
import { MatSelect } from '@angular/material';

@Component({
    selector: 'jhi-location-filters',
    templateUrl: './location-filters.component.html',
    styleUrls: ['./location-filters.component.scss'],
    providers: [LocationFiltersService]
})
export class LocationFiltersComponent implements OnInit {
    @Output()
    provinciaContext: EventEmitter<KeyValue<string, string>> = new EventEmitter<KeyValue<string, string>>();

    /** Values */
    provincias: { [key: string]: string };
    cantones: { [key: string]: string };
    distritos: { [key: string]: string };

    @Input()
    label: boolean;

    @Input()
    provinciaControl: FormControl;
    @Input()
    cantonControl: FormControl;
    @Input()
    distritoControl: FormControl;

    /** Selected */
    @Input()
    provincia: KeyValue<string, string>;
    canton: KeyValue<string, string>;
    distrito: KeyValue<string, string>;

    @Input()
    searchFilters: SearchFilter = new SearchFilter();

    @ViewChild('provinciaSelect') provinciaSelect: MatSelect;

    provinciaSubscription: Subscription;

    constructor(private locationFiltersService: LocationFiltersService) {}

    ngOnInit() {
        this.provinciaSubscription = this.locationFiltersService.getProvincias().subscribe(
            provincias => (
                (this.provincias = provincias),
                this.locationFiltersService.getProvincia().subscribe(provincia => {
                    this.provinciaSubscription.unsubscribe();
                    this.provincia = this.provinciaSelect.options.map(item => item.value).find(item => item.key === String(provincia));
                    this.searchFilters.province = provincias[provincia];
                    this.locationFiltersService.getGetCantones(provincia).subscribe(cantones => (this.cantones = cantones));
                    this.provinciaContext.emit(this.provincia);
                })
            )
        );
    }

    selectedProvincia({ value: { key, value } }) {
        this.canton = this.searchFilters.city = undefined;
        this.distrito = this.searchFilters.district = undefined;
        this.searchFilters.province = value;
        if (this.provinciaControl) {
            this.provinciaControl.setValue(value);
        }
        this.locationFiltersService.getGetCantones(key).subscribe(cantones => (this.cantones = cantones));
    }

    selectedCanton({ value: { key, value } }) {
        this.distrito = this.searchFilters.district = undefined;
        this.searchFilters.city = value;
        if (this.cantonControl) {
            this.cantonControl.setValue(value);
        }
        this.locationFiltersService.getGetDistritos(this.provincia.key, key).subscribe(distritos => (this.distritos = distritos));
    }

    selectedDistrito({ value: { value } }) {
        this.searchFilters.district = value;
        if (this.distritoControl) {
            this.distritoControl.setValue(value);
        }
    }
}
