import { Subscription } from 'rxjs';
import { LocationFiltersService } from './location-filters.service';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
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
    /** Values */
    provincias: { [key: string]: string };
    cantones: { [key: string]: string };
    distritos: { [key: string]: string };

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
                })
            )
        );
    }

    selectedProvincia({ value: { key, value } }) {
        this.canton = this.searchFilters.city = undefined;
        this.distrito = this.searchFilters.district = undefined;
        this.searchFilters.province = value;
        this.locationFiltersService.getGetCantones(key).subscribe(cantones => (this.cantones = cantones));
    }

    selectedCanton({ value: { key, value } }) {
        this.distrito = this.searchFilters.district = undefined;
        this.searchFilters.city = value;
        this.locationFiltersService.getGetDistritos(this.provincia.key, key).subscribe(distritos => (this.distritos = distritos));
    }

    selectedDistrito({ value: { value } }) {
        this.searchFilters.district = value;
    }
}
