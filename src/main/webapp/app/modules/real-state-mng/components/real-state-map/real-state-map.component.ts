import { Component, OnChanges, Input } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'jhi-real-state-map',
    templateUrl: './real-state-map.component.html',
    styleUrls: ['real-state-map.component.scss']
})
export class RealStateMapComponent implements OnChanges {
    @Input()
    province: string;
    @Input()
    city: string;
    @Input()
    district: string;
    @Input()
    latitude: FormControl;
    @Input()
    longitude: FormControl;

    constructor(private service: GeolocationService) {}

    ngOnChanges() {
        const { province, city, district } = this;
        if (province && city && district) {
            this.service.findLocation(province, city, district).subscribe((data: any) => {
                const { lat, lng } = data.results[0].geometry.location;
                this.latitude.setValue(lat);
                this.longitude.setValue(lng);
            });
        }
    }

    onMapClick({ coords: { lat, lng } }) {
        this.latitude.setValue(lat);
        this.longitude.setValue(lng);
    }
}
