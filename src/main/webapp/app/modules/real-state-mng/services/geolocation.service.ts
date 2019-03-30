import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAPS_API_KEY } from 'app/app.constants';

@Injectable()
export class GeolocationService {
    url = 'https://maps.googleapis.com/maps/api/geocode/json';
    constructor(private http: HttpClient) {}

    findLocation(province: string, city: string, district: string) {
        return this.http.get(`${this.url}?address=${province}, ${city}, ${district}&key=${MAPS_API_KEY}`);
    }
}
