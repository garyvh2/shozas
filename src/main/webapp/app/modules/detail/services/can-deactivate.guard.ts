import { StateDetailComponent } from 'app/modules/detail/views/state-detail/state-detail.component';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<StateDetailComponent> {
    constructor() {}

    canDeactivate(
        component: StateDetailComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}
