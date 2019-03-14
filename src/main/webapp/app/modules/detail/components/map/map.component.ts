import { Component, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'jhi-map',
    templateUrl: './map.component.html',
    styleUrls: ['map.component.scss']
})
export class MapComponent implements OnChanges {
    @Input()
    latitude: number;
    @Input()
    longitude: number;
    constructor() {}

    ngOnChanges() {
        this.latitude = Number(this.latitude);
        this.longitude = Number(this.longitude);
    }
}
