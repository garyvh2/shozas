import { LandingService } from './../../modules/landing/landing.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationFiltersService {
    provincias: Subject<any> = new Subject<any>();
    cantones: Subject<any> = new Subject<any>();
    distritos: Subject<any> = new Subject<any>();

    constructor(private http: HttpClient, private landingService: LandingService) {}

    getProvincia() {
        const provincia = new Subject<number>();
        const loading = new Subject<boolean>();

        loading.next(true);
        this.landingService.getLocation().subscribe(
            data => {
                this.getProvincias().subscribe(provincias => {
                    Object.keys(provincias).forEach(key => {
                        if (data.city === provincias[key]) {
                            provincia.next(Number(key));
                            loading.next(false);
                        }
                    });
                });
            },
            error => {
                loading.next(false);
                provincia.next(null);
                console.warn(error);
            }
        );
        return {
            provincia: provincia.asObservable(),
            loading: loading.asObservable()
        };
    }

    getProvincias() {
        this.http.get(`https://ubicaciones.paginasweb.cr/provincias.json`).subscribe(data => this.provincias.next(data));
        return this.provincias.asObservable();
    }

    getGetCantones(provincia) {
        this.http.get(`https://ubicaciones.paginasweb.cr/provincia/${provincia}/cantones.json`).subscribe(data => this.cantones.next(data));
        return this.cantones.asObservable();
    }

    getGetDistritos(provincia, canton) {
        this.http
            .get(`https://ubicaciones.paginasweb.cr/provincia/${provincia}/canton/${canton}/distritos.json`)
            .subscribe(data => this.distritos.next(data));
        return this.distritos.asObservable();
    }
}
