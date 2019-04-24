import { UserRouteAccessService } from './../../core/auth/user-route-access-service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricingViewComponent } from './views/pricing-view/pricing-view.component';

const routes: Routes = [
    {
        path: '',
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cotizar Inmueble'
        },
        canActivate: [UserRouteAccessService],
        component: PricingViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PricingRoutingModule {}
