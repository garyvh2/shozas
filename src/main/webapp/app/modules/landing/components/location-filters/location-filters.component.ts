import { LocationFiltersService } from './location-filters.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-location-filters',
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
    provincia: number;
    canton: number;
    distrito: number;

    constructor(private locationFiltersService: LocationFiltersService) {}

    ngOnInit() {
        this.locationFiltersService
            .getProvincias()
            .subscribe(
                provincias => (
                    (this.provincias = provincias),
                    this.locationFiltersService.getProvincia().subscribe(provincia => (this.provincia = provincia))
                )
            );
    }

    selectedProvincia({ value }) {
        this.canton = undefined;
        this.distrito = undefined;

        this.locationFiltersService.getGetCantones(value).subscribe(cantones => (this.cantones = cantones));
    }

    selectedCanton({ value }) {
        this.distrito = undefined;

        this.locationFiltersService.getGetDistritos(this.provincia, value).subscribe(distritos => (this.distritos = distritos));
    }
}
